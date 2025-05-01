// Tests how the server handles client disconnections
// Run this with node test/manual/test-disconnections.js

import { GitHubCliServer, TransportType } from '../../bin/server.js';
import { allTools } from '../../bin/tools.js';
import WebSocket from 'ws';

// Create the server
const server = new GitHubCliServer({
  transport: {
    type: TransportType.WEBSOCKET,
    options: {
      port: 3000,
      host: 'localhost'
    }
  },
  sessionTimeout: 5000 // 5 seconds timeout for testing
});

// Register all GitHub tools
server.tools(allTools);

// Start the server
server.start().then(() => {
  console.log('Server started on ws://localhost:3000');
  console.log('Testing client disconnections...');
  
  // Create client
  const client = new WebSocket('ws://localhost:3000');
  
  client.on('open', () => {
    console.log('Client connected');
    
    // Send a request
    const message = JSON.stringify({
      jsonrpc: '2.0',
      id: '1',
      method: 'call',
      params: {
        tool: 'gh_repo_list',
        args: { limit: 5 }
      }
    });
    
    client.send(message);
    
    // Wait for response
    client.once('message', (data) => {
      console.log('Client received response:', data.toString());
      
      // Abruptly disconnect
      console.log('Simulating abrupt client disconnection...');
      client.close();
      
      // Wait for session timeout and then reconnect
      setTimeout(() => {
        console.log('Reconnecting client after session expiration...');
        
        const newClient = new WebSocket('ws://localhost:3000');
        
        newClient.on('open', () => {
          console.log('Client reconnected');
          
          // Send another request
          const message = JSON.stringify({
            jsonrpc: '2.0',
            id: '2',
            method: 'call',
            params: {
              tool: 'gh_repo_list',
              args: { limit: 5 }
            }
          });
          
          newClient.send(message);
        });
        
        newClient.on('message', (data) => {
          console.log('Reconnected client received response:', data.toString());
          
          // Test completed successfully
          setTimeout(() => {
            console.log('Test completed successfully');
            newClient.close();
            process.exit(0);
          }, 1000);
        });
        
        newClient.on('error', (error) => {
          console.error('Reconnected client error:', error);
          process.exit(1);
        });
      }, 6000); // Wait for session timeout + 1s
    });
  });
  
  client.on('error', (error) => {
    console.error('Client error:', error);
    process.exit(1);
  });
});
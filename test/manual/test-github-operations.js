// Manual test script for testing GitHub operations with multiple clients
// Run this with node test/manual/test-github-operations.js

import { GitHubCliServer, TransportType } from '../../bin/server.js';
import WebSocket from 'ws';
import { allTools } from '../../bin/tools.js';

// Create the server
const server = new GitHubCliServer({
  transport: {
    type: TransportType.WEBSOCKET,
    options: {
      port: 3000,
      host: 'localhost'
    }
  },
  sessionTimeout: 60000 // 60 seconds for testing
});

// Register all GitHub tools
server.tools(allTools);

// Start the server
server.start().then(() => {
  console.log('Server started on ws://localhost:3000');
  console.log('Testing GitHub operations with multiple clients...');
  
  // Create client 1 - will list repositories
  const client1 = new WebSocket('ws://localhost:3000');
  client1.on('open', () => {
    console.log('Client 1 connected - Will list repositories');
    
    // Send a request to list repositories
    const message = JSON.stringify({
      jsonrpc: '2.0',
      id: '1',
      method: 'call',
      params: {
        tool: 'gh_repo_list',
        args: { limit: 5 }
      }
    });
    
    client1.send(message);
  });
  
  client1.on('message', (data) => {
    console.log('Client 1 received (Repositories):', data.toString());
  });
  
  // Create client 2 - will list issues
  setTimeout(() => {
    const client2 = new WebSocket('ws://localhost:3000');
    client2.on('open', () => {
      console.log('Client 2 connected - Will list issues');
      
      // Send a request to list issues
      const message = JSON.stringify({
        jsonrpc: '2.0',
        id: '1',
        method: 'call',
        params: {
          tool: 'gh_issue_list',
          args: { limit: 5 }
        }
      });
      
      client2.send(message);
    });
    
    client2.on('message', (data) => {
      console.log('Client 2 received (Issues):', data.toString());
    });
    
    // Create client 3 - will list pull requests
    setTimeout(() => {
      const client3 = new WebSocket('ws://localhost:3000');
      client3.on('open', () => {
        console.log('Client 3 connected - Will list pull requests');
        
        // Send a request to list pull requests
        const message = JSON.stringify({
          jsonrpc: '2.0',
          id: '1',
          method: 'call',
          params: {
            tool: 'gh_pr_list',
            args: { limit: 5 }
          }
        });
        
        client3.send(message);
      });
      
      client3.on('message', (data) => {
        console.log('Client 3 received (Pull Requests):', data.toString());
      });
      
      // Clean up after 20 seconds
      setTimeout(() => {
        console.log('Closing clients...');
        client1.close();
        client2.close();
        client3.close();
        
        // Exit after a brief delay to allow for cleanup
        setTimeout(() => {
          console.log('Test completed successfully');
          process.exit(0);
        }, 1000);
      }, 20000);
    }, 2000);
  }, 2000);
});
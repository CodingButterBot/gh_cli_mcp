// Manual test script for WebSocket transport
// Run this with node test/manual/test-websocket-server.js

import { GitHubCliServer, TransportType } from '../../bin/server.js';
import { Tool } from '../../bin/stdio.js';
import { z } from 'zod';
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
  sessionTimeout: 30000 // 30 seconds for testing
});

// Register a simple test tool
server.addTool(
  'test_echo',
  z.object({ message: z.string() }),
  async (params, sessionId) => {
    console.log(`Received message from session ${sessionId}: ${params.message}`);
    return {
      content: [
        { type: 'text', text: `Echo from session ${sessionId}: ${params.message}` }
      ]
    };
  },
  { description: 'Echo test tool' }
);

// Start the server
server.start().then(() => {
  console.log('Server started on ws://localhost:3000');
  console.log('Creating test clients...');
  
  // Create client 1
  const client1 = new WebSocket('ws://localhost:3000');
  client1.on('open', () => {
    console.log('Client 1 connected');
    
    // Send a test message
    const message = JSON.stringify({
      jsonrpc: '2.0',
      id: '1',
      method: 'call',
      params: {
        tool: 'test_echo',
        args: { message: 'Hello from client 1' }
      }
    });
    
    client1.send(message);
  });
  
  client1.on('message', (data) => {
    console.log('Client 1 received:', data.toString());
  });
  
  // Create client 2
  setTimeout(() => {
    const client2 = new WebSocket('ws://localhost:3000');
    client2.on('open', () => {
      console.log('Client 2 connected');
      
      // Send a test message
      const message = JSON.stringify({
        jsonrpc: '2.0',
        id: '1',
        method: 'call',
        params: {
          tool: 'test_echo',
          args: { message: 'Hello from client 2' }
        }
      });
      
      client2.send(message);
    });
    
    client2.on('message', (data) => {
      console.log('Client 2 received:', data.toString());
    });
    
    // Clean up after 10 seconds
    setTimeout(() => {
      console.log('Closing clients...');
      client1.close();
      client2.close();
      
      // Exit after a brief delay to allow for cleanup
      setTimeout(() => {
        console.log('Test completed successfully');
        process.exit(0);
      }, 1000);
    }, 10000);
  }, 2000);
});
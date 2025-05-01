// Manual test script for TCP transport
// Run this with node test/manual/test-tcp-server.js

import { GitHubCliServer, TransportType } from '../../bin/server.js';
import { Tool } from '../../bin/stdio.js';
import { z } from 'zod';
import net from 'net';

// Create the server
const server = new GitHubCliServer({
  transport: {
    type: TransportType.TCP,
    options: {
      port: 3001,
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
  console.log('Server started on tcp://localhost:3001');
  console.log('Creating test clients...');
  
  // Create client 1
  const client1 = new net.Socket();
  client1.connect(3001, 'localhost', () => {
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
    
    client1.write(message + '\n');
  });
  
  client1.on('data', (data) => {
    console.log('Client 1 received:', data.toString());
  });
  
  // Create client 2
  setTimeout(() => {
    const client2 = new net.Socket();
    client2.connect(3001, 'localhost', () => {
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
      
      client2.write(message + '\n');
    });
    
    client2.on('data', (data) => {
      console.log('Client 2 received:', data.toString());
    });
    
    // Clean up after 10 seconds
    setTimeout(() => {
      console.log('Closing clients...');
      client1.destroy();
      client2.destroy();
      
      // Exit after a brief delay to allow for cleanup
      setTimeout(() => {
        console.log('Test completed successfully');
        process.exit(0);
      }, 1000);
    }, 10000);
  }, 2000);
});
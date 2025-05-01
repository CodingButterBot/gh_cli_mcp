// Simulates multiple Claude instances connecting to the server
// Run this with node test/manual/claude-simulation.js

import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';

// Configuration
const NUM_CLIENTS = 3;
const SERVER_URL = 'ws://localhost:3000';
const OPERATIONS_PER_CLIENT = 5;
const OPERATION_DELAY_MS = 2000;
const MAX_TEST_DURATION_MS = 60000;

// GitHub operations to test
const operations = [
  {
    name: 'List repositories',
    tool: 'gh_repo_list',
    args: { limit: 5 }
  },
  {
    name: 'List issues',
    tool: 'gh_issue_list',
    args: { state: 'open', limit: 5 }
  },
  {
    name: 'List pull requests',
    tool: 'gh_pr_list',
    args: { state: 'open', limit: 5 }
  },
  {
    name: 'View repository',
    tool: 'gh_repo_view',
    args: {}
  },
  {
    name: 'List projects',
    tool: 'gh_project_list',
    args: {}
  }
];

// Track clients
const clients = [];
const completedOperations = {};

// Create clients
console.log(`Creating ${NUM_CLIENTS} simulated Claude clients...`);

for (let i = 0; i < NUM_CLIENTS; i++) {
  const clientId = `claude-${i+1}`;
  console.log(`Creating client ${clientId}...`);
  
  const client = new WebSocket(SERVER_URL);
  clients.push(client);
  completedOperations[clientId] = 0;
  
  client.on('open', () => {
    console.log(`Client ${clientId} connected to ${SERVER_URL}`);
    
    // Start sending operations
    let opCount = 0;
    
    const sendNextOperation = () => {
      if (opCount >= OPERATIONS_PER_CLIENT) {
        console.log(`Client ${clientId} completed all operations`);
        return;
      }
      
      // Pick a random operation
      const operation = operations[Math.floor(Math.random() * operations.length)];
      
      console.log(`Client ${clientId} sending operation: ${operation.name}`);
      
      // Send the operation
      const message = JSON.stringify({
        jsonrpc: '2.0',
        id: uuidv4(),
        method: 'call',
        params: {
          tool: operation.tool,
          args: operation.args
        }
      });
      
      client.send(message);
      opCount++;
      
      // Schedule next operation
      setTimeout(sendNextOperation, OPERATION_DELAY_MS);
    };
    
    // Start sending operations
    sendNextOperation();
  });
  
  client.on('message', (data) => {
    const response = JSON.parse(data.toString());
    console.log(`Client ${clientId} received response for operation ${response.id}`);
    
    // Increment completed operations
    completedOperations[clientId]++;
    
    // Check if all clients have completed all operations
    const totalCompleted = Object.values(completedOperations).reduce((sum, count) => sum + count, 0);
    const totalOperations = NUM_CLIENTS * OPERATIONS_PER_CLIENT;
    
    console.log(`Progress: ${totalCompleted}/${totalOperations} operations completed`);
    
    if (totalCompleted >= totalOperations) {
      console.log(`All ${totalOperations} operations completed successfully!`);
      cleanup();
    }
  });
  
  client.on('error', (error) => {
    console.error(`Client ${clientId} error:`, error);
  });
}

// Cleanup function
function cleanup() {
  console.log('Cleaning up...');
  
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.close();
    }
  }
  
  console.log('All clients closed');
  console.log('Test completed successfully!');
  
  setTimeout(() => {
    process.exit(0);
  }, 1000);
}

// Set a maximum test duration
setTimeout(() => {
  console.log(`Test duration exceeded ${MAX_TEST_DURATION_MS}ms, cleaning up...`);
  cleanup();
}, MAX_TEST_DURATION_MS);
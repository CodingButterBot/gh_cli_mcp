# GitHub CLI MCP Server Tests

This directory contains tests for the GitHub CLI MCP server, with a focus on testing the multi-client support functionality.

## Test Structure

- `unit/`: Unit tests for individual components
- `integration/`: Integration tests that test multiple components working together
- `manual/`: Manual test scripts that require human intervention to verify

## Running Tests

### Unit and Integration Tests

```bash
# Run all tests
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration
```

### Manual Tests

The manual tests are designed to be run individually and to provide visual feedback:

#### WebSocket Transport Test

Tests basic WebSocket transport functionality with multiple clients:

```bash
node test/manual/test-websocket-server.js
```

#### TCP Transport Test

Tests basic TCP transport functionality with multiple clients:

```bash
node test/manual/test-tcp-server.js
```

#### GitHub Operations Test

Tests performing GitHub operations with multiple clients:

```bash
node test/manual/test-github-operations.js
```

#### Claude Simulation

Simulates multiple Claude instances connecting to the server and performing operations:

```bash
# First, start the server in a separate terminal
npm start -- --transport websocket --port 3000

# Then run the simulation
node test/manual/claude-simulation.js
```

#### Disconnection Handling Test

Tests how the server handles client disconnections and reconnections:

```bash
node test/manual/test-disconnections.js
```

## Test Coverage

The tests cover the following areas:

- **Session Management**: Testing the SessionManager class for tracking client sessions
- **WebSocket Transport**: Testing the WebSocketServerTransport for handling multiple client connections
- **TCP Transport**: Testing the TCPServerTransport for handling multiple client connections
- **Server Configuration**: Testing server configuration options
- **Tool Registration**: Testing tool registration and execution
- **Multi-client Support**: Testing multiple clients connecting to the same server
- **Disconnection Handling**: Testing how the server handles client disconnections
- **GitHub Operations**: Testing GitHub CLI operations with multiple clients

## Adding New Tests

When adding new tests:

1. For unit tests, place them in the `unit/` directory and name them `*.test.ts`
2. For integration tests, place them in the `integration/` directory and name them `*.test.ts`
3. For manual tests, place them in the `manual/` directory and name them descriptively

Make sure to run the tests after making changes to ensure everything still works.

## Test Dependencies

The tests use the following dependencies:

- **Jest**: Test runner and assertion library
- **ts-jest**: TypeScript support for Jest
- **jest-websocket-mock**: WebSocket mocking library
- **mock-socket**: Socket mocking library
- **supertest**: HTTP testing library
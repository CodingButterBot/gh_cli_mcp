import { WebSocketServerTransport } from '../../src/transport/websocket.js';
import WS from 'jest-websocket-mock';
import WebSocket from 'ws';

// Mock the WebSocket class
jest.mock('ws', () => {
  return {
    WebSocketServer: jest.fn().mockImplementation(() => ({
      on: jest.fn((event, callback) => {
        if (event === 'connection') {
          // Store the connection callback to use in tests
          (global as any).connectionCallback = callback;
        }
      }),
      close: jest.fn()
    })),
    OPEN: 1
  };
});

describe('WebSocketServerTransport', () => {
  let transport: WebSocketServerTransport;
  let mockSocket: any;
  let mockServer: any;
  
  beforeEach(() => {
    // Create mock socket
    mockSocket = {
      send: jest.fn(),
      on: jest.fn((event, callback) => {
        // Store callbacks for testing
        if (event === 'message') {
          (mockSocket as any).messageCallback = callback;
        } else if (event === 'close') {
          (mockSocket as any).closeCallback = callback;
        } else if (event === 'error') {
          (mockSocket as any).errorCallback = callback;
        }
      }),
      readyState: WebSocket.OPEN,
      close: jest.fn()
    };
    
    // Create transport
    transport = new WebSocketServerTransport(3000, 'localhost', 1000);
    
    // Override setTimeout to execute immediately for testing
    jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
      return 1 as any;
    });
    
    // Override setInterval to prevent cleanup from running
    jest.spyOn(global, 'setInterval').mockImplementation(() => {
      return 1 as any;
    });
    
    // Override clearInterval to prevent cleanup
    jest.spyOn(global, 'clearInterval').mockImplementation(() => {});
  });
  
  afterEach(() => {
    jest.clearAllMocks();
    if (transport) {
      transport.close();
    }
  });
  
  test('should start the WebSocket server', async () => {
    await transport.start();
    expect(WebSocket.WebSocketServer).toHaveBeenCalledWith({
      port: 3000,
      host: 'localhost'
    });
  });
  
  test('should handle client connections', async () => {
    await transport.start();
    
    // Simulate a connection
    const connectionCallback = (global as any).connectionCallback;
    expect(connectionCallback).toBeDefined();
    
    connectionCallback(mockSocket);
    
    // Verify event handlers were set up
    expect(mockSocket.on).toHaveBeenCalledWith('message', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('close', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('error', expect.any(Function));
  });
  
  test('should handle incoming messages', async () => {
    // Set up message listener
    const messageListener = jest.fn();
    await transport.start();
    transport.getMessageEmitter().on('message', messageListener);
    
    // Simulate a connection
    const connectionCallback = (global as any).connectionCallback;
    connectionCallback(mockSocket);
    
    // Simulate receiving a message
    const message = Buffer.from('test message');
    mockSocket.messageCallback(message);
    
    // Verify message was processed
    expect(messageListener).toHaveBeenCalled();
    expect(messageListener.mock.calls[0][0].text).toBe('test message');
    expect(messageListener.mock.calls[0][0].sessionId).toBeDefined();
  });
  
  test('should handle client disconnection', async () => {
    await transport.start();
    
    // Simulate a connection
    const connectionCallback = (global as any).connectionCallback;
    connectionCallback(mockSocket);
    
    // Get the session ID
    const sessionId = mockSocket.messageCallback.mock.calls[0]?.[0]?.sessionId;
    
    // Simulate disconnection
    mockSocket.closeCallback();
    
    // Try to send to the disconnected client
    transport.send('test', sessionId);
    
    // Verify no send was attempted
    expect(mockSocket.send).not.toHaveBeenCalled();
  });
  
  test('should send messages to specific clients', async () => {
    await transport.start();
    
    // Simulate a connection
    const connectionCallback = (global as any).connectionCallback;
    connectionCallback(mockSocket);
    
    // Simulate receiving a message to get a session ID
    const message = Buffer.from('test message');
    mockSocket.messageCallback(message);
    
    // Get the session ID from the first call to the message callback
    const sessionId = mockSocket.messageCallback.mock.calls[0]?.[0]?.sessionId;
    expect(sessionId).toBeDefined();
    
    // Send a message to the client
    transport.send('response message', sessionId);
    
    // Verify message was sent
    expect(mockSocket.send).toHaveBeenCalledWith('response message');
  });
  
  test('should close the server and all connections', async () => {
    await transport.start();
    
    // Simulate a connection
    const connectionCallback = (global as any).connectionCallback;
    connectionCallback(mockSocket);
    
    // Close the transport
    transport.close();
    
    // Verify socket was closed
    expect(mockSocket.close).toHaveBeenCalled();
  });
});
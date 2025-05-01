// @ts-ignore - Ignoring module resolution error
import { ServerTransport } from '@modelcontextprotocol/sdk/server/transport';
// @ts-ignore - Ignoring module resolution error
import WebSocket, { WebSocketServer } from 'ws';
// @ts-ignore - Ignoring module resolution error
import { v4 as uuidv4 } from 'uuid';
import { EventEmitter } from 'events';

/**
 * Session type to track client connections
 */
interface ClientSession {
  id: string;
  socket: WebSocket;
  lastActive: number;
}

/**
 * WebSocketServerTransport - Implements a WebSocket transport for MCP
 * that supports multiple concurrent client connections
 */
export class WebSocketServerTransport implements ServerTransport {
  private server: WebSocketServer | null = null;
  private clients: Map<string, ClientSession> = new Map();
  private eventEmitter = new EventEmitter();
  private port: number;
  private host: string;
  private cleanupInterval: NodeJS.Timeout | null = null;
  private sessionTimeout: number; // Milliseconds

  /**
   * Create a new WebSocket transport for serving multiple clients
   * @param port The port to listen on (default: 3000)
   * @param host The host to bind to (default: localhost)
   * @param sessionTimeout Milliseconds before inactive sessions are cleaned up (default: 30 minutes)
   */
  constructor(port = 3000, host = 'localhost', sessionTimeout = 30 * 60 * 1000) {
    this.port = port;
    this.host = host;
    this.sessionTimeout = sessionTimeout;
  }

  /**
   * Start the WebSocket server and listen for connections
   */
  async start(): Promise<void> {
    this.server = new WebSocketServer({ port: this.port, host: this.host });
    
    this.server.on('connection', (socket: WebSocket) => {
      const sessionId = uuidv4();
      
      // Create a new client session
      this.clients.set(sessionId, {
        id: sessionId,
        socket,
        lastActive: Date.now()
      });
      
      console.error(`[WebSocket] Client connected: ${sessionId}`);
      
      // Handle incoming messages from this client
      socket.on('message', (message: Buffer) => {
        const session = this.clients.get(sessionId);
        if (session) {
          session.lastActive = Date.now();
          this.clients.set(sessionId, session);
          
          try {
            const messageStr = message.toString();
            this.eventEmitter.emit('message', { text: messageStr, sessionId });
          } catch (error) {
            console.error(`[WebSocket] Error processing message: ${error}`);
          }
        }
      });
      
      // Handle client disconnection
      socket.on('close', () => {
        this.clients.delete(sessionId);
        console.error(`[WebSocket] Client disconnected: ${sessionId}`);
      });
      
      // Handle errors
      socket.on('error', (error: any) => {
        console.error(`[WebSocket] Error with client ${sessionId}:`, error);
      });
    });
    
    // Start session cleanup interval
    this.cleanupInterval = setInterval(() => this.cleanupSessions(), this.sessionTimeout / 2);
    
    console.error(`[WebSocket] Server started on ${this.host}:${this.port}`);
  }

  /**
   * Clean up inactive sessions
   */
  private cleanupSessions(): void {
    const now = Date.now();
    const expiredSessions: string[] = [];
    
    // Find expired sessions
    this.clients.forEach((session, sessionId) => {
      if (now - session.lastActive > this.sessionTimeout) {
        expiredSessions.push(sessionId);
      }
    });
    
    // Remove expired sessions
    expiredSessions.forEach(sessionId => {
      const session = this.clients.get(sessionId);
      if (session) {
        try {
          session.socket.close();
        } catch (e) {
          // Ignore errors when closing already disconnected sockets
        }
        this.clients.delete(sessionId);
        console.error(`[WebSocket] Session expired: ${sessionId}`);
      }
    });
  }

  /**
   * Get a message emitter for the transport
   */
  getMessageEmitter(): EventEmitter {
    return this.eventEmitter;
  }

  /**
   * Send a message to a specific client
   * @param message The message to send
   * @param sessionId The session ID to send to
   */
  send(message: string, sessionId?: string): void {
    if (sessionId) {
      // Send to a specific client
      const session = this.clients.get(sessionId);
      if (session && session.socket.readyState === WebSocket.OPEN) {
        session.socket.send(message);
      } else {
        console.error(`[WebSocket] Cannot send to client ${sessionId}: not connected`);
      }
    } else {
      // Broadcast to all clients (generally not used in MCP)
      this.clients.forEach(session => {
        if (session.socket.readyState === WebSocket.OPEN) {
          session.socket.send(message);
        }
      });
    }
  }

  /**
   * Close the WebSocket server and all connections
   */
  close(): void {
    // Clear cleanup interval
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    
    // Close all client connections
    this.clients.forEach(session => {
      try {
        session.socket.close();
      } catch (e) {
        // Ignore errors when closing
      }
    });
    
    // Clear clients map
    this.clients.clear();
    
    // Close the server
    if (this.server) {
      this.server.close();
      this.server = null;
    }
    
    console.error('[WebSocket] Server closed');
  }
}
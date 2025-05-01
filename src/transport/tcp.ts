// @ts-ignore - Ignoring module resolution error
import { ServerTransport } from '@modelcontextprotocol/sdk/server/transport';
import { createServer, Server, Socket } from 'net';
// @ts-ignore - Ignoring module resolution error
import { v4 as uuidv4 } from 'uuid';
import { EventEmitter } from 'events';

/**
 * Session type to track client connections
 */
interface ClientSession {
  id: string;
  socket: Socket;
  buffer: string;
  lastActive: number;
}

/**
 * TCPServerTransport - Implements a TCP transport for MCP
 * that supports multiple concurrent client connections
 */
export class TCPServerTransport implements ServerTransport {
  private server: Server | null = null;
  private clients: Map<string, ClientSession> = new Map();
  private eventEmitter = new EventEmitter();
  private port: number;
  private host: string;
  private cleanupInterval: NodeJS.Timeout | null = null;
  private sessionTimeout: number; // Milliseconds

  /**
   * Create a new TCP transport for serving multiple clients
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
   * Start the TCP server and listen for connections
   */
  async start(): Promise<void> {
    this.server = createServer((socket: Socket) => {
      const sessionId = uuidv4();
      
      // Create a new client session
      this.clients.set(sessionId, {
        id: sessionId,
        socket,
        buffer: '',
        lastActive: Date.now()
      });
      
      console.error(`[TCP] Client connected: ${sessionId}`);
      
      // Handle incoming data from this client
      socket.on('data', (data: Buffer) => {
        const session = this.clients.get(sessionId);
        if (session) {
          session.lastActive = Date.now();
          session.buffer += data.toString();
          
          // Process complete messages (newline-delimited)
          const lines = session.buffer.split('\\n');
          
          // If we have complete messages (ending with newline)
          if (lines.length > 1) {
            // Process all complete messages
            for (let i = 0; i < lines.length - 1; i++) {
              const line = lines[i];
              if (line.trim()) {
                this.eventEmitter.emit('message', { text: line, sessionId });
              }
            }
            
            // Keep any partial message for next time
            session.buffer = lines[lines.length - 1];
          }
          
          // Update the session
          this.clients.set(sessionId, session);
        }
      });
      
      // Handle client disconnection
      socket.on('close', () => {
        this.clients.delete(sessionId);
        console.error(`[TCP] Client disconnected: ${sessionId}`);
      });
      
      // Handle errors
      socket.on('error', (error) => {
        console.error(`[TCP] Error with client ${sessionId}:`, error);
      });
    });
    
    // Start listening
    await new Promise<void>((resolve, reject) => {
      if (!this.server) {
        reject(new Error('Server not initialized'));
        return;
      }
      
      this.server.on('error', (error) => {
        reject(error);
      });
      
      this.server.listen(this.port, this.host, () => {
        resolve();
      });
    });
    
    // Start session cleanup interval
    this.cleanupInterval = setInterval(() => this.cleanupSessions(), this.sessionTimeout / 2);
    
    console.error(`[TCP] Server started on ${this.host}:${this.port}`);
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
          session.socket.end();
          session.socket.destroy();
        } catch (e) {
          // Ignore errors when closing already disconnected sockets
        }
        this.clients.delete(sessionId);
        console.error(`[TCP] Session expired: ${sessionId}`);
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
      if (session && !session.socket.destroyed) {
        session.socket.write(message + '\\n');
      } else {
        console.error(`[TCP] Cannot send to client ${sessionId}: not connected`);
      }
    } else {
      // Broadcast to all clients (generally not used in MCP)
      this.clients.forEach(session => {
        if (!session.socket.destroyed) {
          session.socket.write(message + '\\n');
        }
      });
    }
  }

  /**
   * Close the TCP server and all connections
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
        session.socket.end();
        session.socket.destroy();
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
    
    console.error('[TCP] Server closed');
  }
}
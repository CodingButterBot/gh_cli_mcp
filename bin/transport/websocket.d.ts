import { ServerTransport } from '@modelcontextprotocol/sdk/server/transport';
import { EventEmitter } from 'events';
/**
 * WebSocketServerTransport - Implements a WebSocket transport for MCP
 * that supports multiple concurrent client connections
 */
export declare class WebSocketServerTransport implements ServerTransport {
    private server;
    private clients;
    private eventEmitter;
    private port;
    private host;
    private cleanupInterval;
    private sessionTimeout;
    /**
     * Create a new WebSocket transport for serving multiple clients
     * @param port The port to listen on (default: 3000)
     * @param host The host to bind to (default: localhost)
     * @param sessionTimeout Milliseconds before inactive sessions are cleaned up (default: 30 minutes)
     */
    constructor(port?: number, host?: string, sessionTimeout?: number);
    /**
     * Start the WebSocket server and listen for connections
     */
    start(): Promise<void>;
    /**
     * Clean up inactive sessions
     */
    private cleanupSessions;
    /**
     * Get a message emitter for the transport
     */
    getMessageEmitter(): EventEmitter;
    /**
     * Send a message to a specific client
     * @param message The message to send
     * @param sessionId The session ID to send to
     */
    send(message: string, sessionId?: string): void;
    /**
     * Close the WebSocket server and all connections
     */
    close(): void;
}
//# sourceMappingURL=websocket.d.ts.map
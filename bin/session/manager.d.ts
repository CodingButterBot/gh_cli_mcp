/**
 * Simplified session manager for the stdio-only transport
 * Keeps compatibility with the original API but with simpler implementation
 */
/**
 * Session interface
 */
export interface Session {
    id: string;
    createdAt: Date;
    lastActive: Date;
    data: Record<string, unknown>;
}
/**
 * SessionManager - Basic session management for the MCP server
 */
export declare class SessionManager {
    private session;
    /**
     * Create a new session manager
     * @param sessionTimeout Not used in stdio-only mode
     */
    constructor(sessionTimeout?: number);
    /**
     * Create a new session
     * @param sessionId The session ID
     * @param initialData Initial session data
     * @returns The created session
     */
    createSession(sessionId?: string, initialData?: Record<string, unknown>): Session;
    /**
     * Get a session by ID
     * @param sessionId The session ID
     * @returns The session or undefined if not found
     */
    getSession(sessionId: string): Session | undefined;
    /**
     * Update a session's data
     * @param sessionId The session ID
     * @param data The data to update
     * @returns The updated session or undefined if not found
     */
    updateSession(sessionId: string, data: Record<string, unknown>): Session | undefined;
    /**
     * Get a value from a session
     * @param sessionId The session ID
     * @param key The data key
     * @returns The value or undefined if not found
     */
    getSessionValue<T>(sessionId: string, key: string): T | undefined;
    /**
     * Set a value in a session
     * @param sessionId The session ID
     * @param key The data key
     * @param value The value to set
     * @returns True if successful, false if session not found
     */
    setSessionValue<T>(sessionId: string, key: string, value: T): boolean;
    /**
     * Delete a session
     * @param sessionId The session ID
     * @returns True if the session was found and deleted
     */
    deleteSession(sessionId: string): boolean;
    /**
     * Touch a session to update its last active time
     * @param sessionId The session ID
     * @returns True if the session exists and was updated
     */
    touchSession(sessionId: string): boolean;
    /**
     * Get all sessions (in stdio mode, this is just one or none)
     * @returns All sessions
     */
    getAllSessions(): Session[];
    /**
     * Get the number of active sessions
     * @returns The number of active sessions
     */
    getSessionCount(): number;
    /**
     * Stop the session manager
     */
    stop(): void;
}
//# sourceMappingURL=manager.d.ts.map
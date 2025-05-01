/**
 * Session manager for tracking client sessions and their state
 */
export interface Session {
    id: string;
    createdAt: Date;
    lastActive: Date;
    data: Record<string, unknown>;
}
/**
 * SessionManager - Manages client sessions for the MCP server
 */
export declare class SessionManager {
    private sessions;
    private cleanupInterval;
    private sessionTimeout;
    /**
     * Create a new session manager
     * @param sessionTimeout Milliseconds before inactive sessions are cleaned up (default: 30 minutes)
     */
    constructor(sessionTimeout?: number);
    /**
     * Start the cleanup interval to remove expired sessions
     */
    private startCleanupInterval;
    /**
     * Clean up expired sessions
     */
    private cleanupSessions;
    /**
     * Create a new session
     * @param sessionId The session ID (optional, will be generated if not provided)
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
     * Generate a unique session ID
     * @returns A unique session ID
     */
    private generateSessionId;
    /**
     * Get all sessions
     * @returns All sessions
     */
    getAllSessions(): Session[];
    /**
     * Get the number of active sessions
     * @returns The number of active sessions
     */
    getSessionCount(): number;
    /**
     * Stop the session manager and clean up resources
     */
    stop(): void;
}
//# sourceMappingURL=manager.d.ts.map
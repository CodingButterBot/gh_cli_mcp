/**
 * Simplified session manager for the stdio-only transport
 * Keeps compatibility with the original API but with simpler implementation
 */
/**
 * SessionManager - Basic session management for the MCP server
 */
export class SessionManager {
    session = null;
    /**
     * Create a new session manager
     * @param sessionTimeout Not used in stdio-only mode
     */
    constructor(sessionTimeout = 30 * 60 * 1000) {
        // Create a default session for stdio
        this.createSession('default');
    }
    /**
     * Create a new session
     * @param sessionId The session ID
     * @param initialData Initial session data
     * @returns The created session
     */
    createSession(sessionId = 'default', initialData = {}) {
        const now = new Date();
        this.session = {
            id: sessionId,
            createdAt: now,
            lastActive: now,
            data: { ...initialData }
        };
        return this.session;
    }
    /**
     * Get a session by ID
     * @param sessionId The session ID
     * @returns The session or undefined if not found
     */
    getSession(sessionId) {
        // In stdio mode, we only have one session
        return this.session && (sessionId === 'default' || sessionId === this.session.id)
            ? this.session
            : undefined;
    }
    /**
     * Update a session's data
     * @param sessionId The session ID
     * @param data The data to update
     * @returns The updated session or undefined if not found
     */
    updateSession(sessionId, data) {
        if (!this.session || (sessionId !== 'default' && sessionId !== this.session.id)) {
            return undefined;
        }
        this.session.lastActive = new Date();
        this.session.data = { ...this.session.data, ...data };
        return this.session;
    }
    /**
     * Get a value from a session
     * @param sessionId The session ID
     * @param key The data key
     * @returns The value or undefined if not found
     */
    getSessionValue(sessionId, key) {
        if (!this.session || (sessionId !== 'default' && sessionId !== this.session.id)) {
            return undefined;
        }
        return this.session.data[key];
    }
    /**
     * Set a value in a session
     * @param sessionId The session ID
     * @param key The data key
     * @param value The value to set
     * @returns True if successful, false if session not found
     */
    setSessionValue(sessionId, key, value) {
        if (!this.session || (sessionId !== 'default' && sessionId !== this.session.id)) {
            return false;
        }
        this.session.lastActive = new Date();
        this.session.data[key] = value;
        return true;
    }
    /**
     * Delete a session
     * @param sessionId The session ID
     * @returns True if the session was found and deleted
     */
    deleteSession(sessionId) {
        if (!this.session || (sessionId !== 'default' && sessionId !== this.session.id)) {
            return false;
        }
        this.session = null;
        return true;
    }
    /**
     * Touch a session to update its last active time
     * @param sessionId The session ID
     * @returns True if the session exists and was updated
     */
    touchSession(sessionId) {
        if (!this.session || (sessionId !== 'default' && sessionId !== this.session.id)) {
            return false;
        }
        this.session.lastActive = new Date();
        return true;
    }
    /**
     * Get all sessions (in stdio mode, this is just one or none)
     * @returns All sessions
     */
    getAllSessions() {
        return this.session ? [this.session] : [];
    }
    /**
     * Get the number of active sessions
     * @returns The number of active sessions
     */
    getSessionCount() {
        return this.session ? 1 : 0;
    }
    /**
     * Stop the session manager
     */
    stop() {
        this.session = null;
    }
}
//# sourceMappingURL=manager.js.map
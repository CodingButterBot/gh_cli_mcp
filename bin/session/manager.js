/**
 * SessionManager - Manages client sessions for the MCP server
 */
export class SessionManager {
    sessions = new Map();
    cleanupInterval = null;
    sessionTimeout;
    /**
     * Create a new session manager
     * @param sessionTimeout Milliseconds before inactive sessions are cleaned up (default: 30 minutes)
     */
    constructor(sessionTimeout = 30 * 60 * 1000) {
        this.sessionTimeout = sessionTimeout;
        this.startCleanupInterval();
    }
    /**
     * Start the cleanup interval to remove expired sessions
     */
    startCleanupInterval() {
        this.cleanupInterval = setInterval(() => this.cleanupSessions(), this.sessionTimeout / 2);
    }
    /**
     * Clean up expired sessions
     */
    cleanupSessions() {
        const now = new Date();
        const expiredSessions = [];
        this.sessions.forEach((session, sessionId) => {
            const elapsed = now.getTime() - session.lastActive.getTime();
            if (elapsed > this.sessionTimeout) {
                expiredSessions.push(sessionId);
            }
        });
        expiredSessions.forEach(sessionId => {
            this.sessions.delete(sessionId);
            console.error(`[SessionManager] Session expired: ${sessionId}`);
        });
    }
    /**
     * Create a new session
     * @param sessionId The session ID (optional, will be generated if not provided)
     * @param initialData Initial session data
     * @returns The created session
     */
    createSession(sessionId, initialData = {}) {
        const id = sessionId || this.generateSessionId();
        const now = new Date();
        const session = {
            id,
            createdAt: now,
            lastActive: now,
            data: { ...initialData }
        };
        this.sessions.set(id, session);
        console.error(`[SessionManager] Session created: ${id}`);
        return session;
    }
    /**
     * Get a session by ID
     * @param sessionId The session ID
     * @returns The session or undefined if not found
     */
    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }
    /**
     * Update a session's data
     * @param sessionId The session ID
     * @param data The data to update
     * @returns The updated session or undefined if not found
     */
    updateSession(sessionId, data) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        session.lastActive = new Date();
        session.data = { ...session.data, ...data };
        this.sessions.set(sessionId, session);
        return session;
    }
    /**
     * Get a value from a session
     * @param sessionId The session ID
     * @param key The data key
     * @returns The value or undefined if not found
     */
    getSessionValue(sessionId, key) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        return session.data[key];
    }
    /**
     * Set a value in a session
     * @param sessionId The session ID
     * @param key The data key
     * @param value The value to set
     * @returns True if successful, false if session not found
     */
    setSessionValue(sessionId, key, value) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return false;
        session.lastActive = new Date();
        session.data[key] = value;
        this.sessions.set(sessionId, session);
        return true;
    }
    /**
     * Delete a session
     * @param sessionId The session ID
     * @returns True if the session was found and deleted
     */
    deleteSession(sessionId) {
        return this.sessions.delete(sessionId);
    }
    /**
     * Touch a session to update its last active time
     * @param sessionId The session ID
     * @returns True if the session exists and was updated
     */
    touchSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return false;
        session.lastActive = new Date();
        this.sessions.set(sessionId, session);
        return true;
    }
    /**
     * Generate a unique session ID
     * @returns A unique session ID
     */
    generateSessionId() {
        // Simple implementation, replace with a more robust ID generation in production
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }
    /**
     * Get all sessions
     * @returns All sessions
     */
    getAllSessions() {
        return Array.from(this.sessions.values());
    }
    /**
     * Get the number of active sessions
     * @returns The number of active sessions
     */
    getSessionCount() {
        return this.sessions.size;
    }
    /**
     * Stop the session manager and clean up resources
     */
    stop() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
            this.cleanupInterval = null;
        }
        this.sessions.clear();
    }
}
//# sourceMappingURL=manager.js.map
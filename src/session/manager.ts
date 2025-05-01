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
export class SessionManager {
  private sessions: Map<string, Session> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;
  private sessionTimeout: number;

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
  private startCleanupInterval(): void {
    this.cleanupInterval = setInterval(() => this.cleanupSessions(), this.sessionTimeout / 2);
  }

  /**
   * Clean up expired sessions
   */
  private cleanupSessions(): void {
    const now = new Date();
    const expiredSessions: string[] = [];
    
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
  createSession(sessionId?: string, initialData: Record<string, unknown> = {}): Session {
    const id = sessionId || this.generateSessionId();
    const now = new Date();
    
    const session: Session = {
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
  getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Update a session's data
   * @param sessionId The session ID
   * @param data The data to update
   * @returns The updated session or undefined if not found
   */
  updateSession(sessionId: string, data: Record<string, unknown>): Session | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;
    
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
  getSessionValue<T>(sessionId: string, key: string): T | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;
    
    return session.data[key] as T;
  }

  /**
   * Set a value in a session
   * @param sessionId The session ID
   * @param key The data key
   * @param value The value to set
   * @returns True if successful, false if session not found
   */
  setSessionValue<T>(sessionId: string, key: string, value: T): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    
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
  deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  /**
   * Touch a session to update its last active time
   * @param sessionId The session ID
   * @returns True if the session exists and was updated
   */
  touchSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    
    session.lastActive = new Date();
    this.sessions.set(sessionId, session);
    
    return true;
  }

  /**
   * Generate a unique session ID
   * @returns A unique session ID
   */
  private generateSessionId(): string {
    // Simple implementation, replace with a more robust ID generation in production
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * Get all sessions
   * @returns All sessions
   */
  getAllSessions(): Session[] {
    return Array.from(this.sessions.values());
  }

  /**
   * Get the number of active sessions
   * @returns The number of active sessions
   */
  getSessionCount(): number {
    return this.sessions.size;
  }

  /**
   * Stop the session manager and clean up resources
   */
  stop(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    
    this.sessions.clear();
  }
}
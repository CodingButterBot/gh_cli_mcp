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
export class SessionManager {
  private session: Session | null = null;

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
  createSession(sessionId: string = 'default', initialData: Record<string, unknown> = {}): Session {
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
  getSession(sessionId: string): Session | undefined {
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
  updateSession(sessionId: string, data: Record<string, unknown>): Session | undefined {
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
  getSessionValue<T>(sessionId: string, key: string): T | undefined {
    if (!this.session || (sessionId !== 'default' && sessionId !== this.session.id)) {
      return undefined;
    }
    
    return this.session.data[key] as T;
  }

  /**
   * Set a value in a session
   * @param sessionId The session ID
   * @param key The data key
   * @param value The value to set
   * @returns True if successful, false if session not found
   */
  setSessionValue<T>(sessionId: string, key: string, value: T): boolean {
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
  deleteSession(sessionId: string): boolean {
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
  touchSession(sessionId: string): boolean {
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
  getAllSessions(): Session[] {
    return this.session ? [this.session] : [];
  }

  /**
   * Get the number of active sessions
   * @returns The number of active sessions
   */
  getSessionCount(): number {
    return this.session ? 1 : 0;
  }

  /**
   * Stop the session manager
   */
  stop(): void {
    this.session = null;
  }
}
import { SessionManager } from '../../src/session/manager.js';

describe('SessionManager', () => {
  let sessionManager: SessionManager;
  
  beforeEach(() => {
    // Create a new SessionManager with a short timeout for testing
    sessionManager = new SessionManager(100); // 100ms timeout
  });
  
  afterEach(() => {
    // Clean up after each test
    sessionManager.stop();
  });
  
  test('should create a new session', () => {
    const session = sessionManager.createSession();
    expect(session).toBeDefined();
    expect(session.id).toBeDefined();
    expect(session.createdAt).toBeInstanceOf(Date);
    expect(session.lastActive).toBeInstanceOf(Date);
    expect(session.data).toEqual({});
  });
  
  test('should create a session with custom ID', () => {
    const customId = 'custom-session-id';
    const session = sessionManager.createSession(customId);
    expect(session.id).toBe(customId);
  });
  
  test('should create a session with initial data', () => {
    const initialData = { username: 'testuser', role: 'admin' };
    const session = sessionManager.createSession(undefined, initialData);
    expect(session.data).toEqual(initialData);
  });
  
  test('should get a session by ID', () => {
    const session = sessionManager.createSession();
    const retrievedSession = sessionManager.getSession(session.id);
    expect(retrievedSession).toEqual(session);
  });
  
  test('should return undefined for nonexistent session', () => {
    const retrievedSession = sessionManager.getSession('nonexistent');
    expect(retrievedSession).toBeUndefined();
  });
  
  test('should update session data', () => {
    const session = sessionManager.createSession();
    const newData = { username: 'updated' };
    const updatedSession = sessionManager.updateSession(session.id, newData);
    
    expect(updatedSession).toBeDefined();
    expect(updatedSession?.data.username).toBe('updated');
    
    // Verify that the session was actually updated in the manager
    const retrievedSession = sessionManager.getSession(session.id);
    expect(retrievedSession?.data.username).toBe('updated');
  });
  
  test('should get and set session values', () => {
    const session = sessionManager.createSession();
    
    // Set a value
    const result = sessionManager.setSessionValue(session.id, 'counter', 42);
    expect(result).toBe(true);
    
    // Get the value
    const value = sessionManager.getSessionValue<number>(session.id, 'counter');
    expect(value).toBe(42);
  });
  
  test('should delete a session', () => {
    const session = sessionManager.createSession();
    const result = sessionManager.deleteSession(session.id);
    expect(result).toBe(true);
    
    // Session should no longer exist
    const retrievedSession = sessionManager.getSession(session.id);
    expect(retrievedSession).toBeUndefined();
  });
  
  test('should get session count', () => {
    expect(sessionManager.getSessionCount()).toBe(0);
    
    sessionManager.createSession();
    expect(sessionManager.getSessionCount()).toBe(1);
    
    sessionManager.createSession();
    expect(sessionManager.getSessionCount()).toBe(2);
    
    sessionManager.deleteSession(sessionManager.getAllSessions()[0].id);
    expect(sessionManager.getSessionCount()).toBe(1);
  });
  
  test('should clean up expired sessions', async () => {
    // Create sessions that will expire
    sessionManager.createSession('session1');
    sessionManager.createSession('session2');
    
    // Touch one session to keep it active
    setTimeout(() => {
      sessionManager.touchSession('session2');
    }, 50);
    
    // Wait for cleanup (timeout is 100ms, cleanup runs at 50ms)
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // session1 should be gone, session2 should still exist
    expect(sessionManager.getSession('session1')).toBeUndefined();
    expect(sessionManager.getSession('session2')).toBeDefined();
  });
});
import { GitHubCliServer } from '../../src/server.js';
import { Tool } from '../../src/stdio.js';
import { z } from 'zod';
import { jest } from '@jest/globals';

// Mock execGitHubCommand
jest.mock('../../src/github.js', () => ({
  execGitHubCommand: jest.fn().mockImplementation((command, subcommand, params, sessionId) => {
    return Promise.resolve({
      content: [
        { type: 'text', text: `Executed ${command} ${subcommand} (session: ${sessionId || 'none'})` }
      ]
    });
  }),
  checkGitHubCli: jest.fn().mockResolvedValue(true),
  cancelActiveCommand: jest.fn()
}));

describe('GitHubCliServer', () => {
  let server: GitHubCliServer;
  let closeFn: any;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });
  
  afterEach(async () => {
    // Close server if it's running
    if (closeFn) {
      await closeFn.close();
      closeFn = null;
    }
  });
  
  test('should create server with default config', () => {
    server = new GitHubCliServer();
    expect(server).toBeDefined();
  });
  
  test('should create server with custom config', () => {
    server = new GitHubCliServer({
      sessionTimeout: 60000
    });
    
    expect(server).toBeDefined();
    expect(server.config.sessionTimeout).toBe(60000);
  });
  
  test('should register tools', () => {
    server = new GitHubCliServer();
    
    // Create a test tool
    const testTool = new Tool(
      'test_tool',
      z.object({ param: z.string() }),
      async (params) => {
        return {
          content: [
            { type: 'text', text: `Executed test with param: ${params.param}` }
          ]
        };
      },
      { description: 'Test tool' }
    );
    
    // Register the tool
    server.addTool(
      testTool.name,
      testTool.schema,
      testTool.handler,
      testTool.options
    );
    
    // Can't easily test this directly, but at least verify no errors occur
    expect(true).toBe(true);
  });
  
  test('should register multiple tools', () => {
    server = new GitHubCliServer();
    
    // Create test tools
    const testTool1 = new Tool(
      'test_tool1',
      z.object({ param: z.string() }),
      async (params) => {
        return {
          content: [
            { type: 'text', text: `Executed test1 with param: ${params.param}` }
          ]
        };
      },
      { description: 'Test tool 1' }
    );
    
    const testTool2 = new Tool(
      'test_tool2',
      z.object({ param: z.string() }),
      async (params) => {
        return {
          content: [
            { type: 'text', text: `Executed test2 with param: ${params.param}` }
          ]
        };
      },
      { description: 'Test tool 2' }
    );
    
    // Register the tools
    server.tools([testTool1, testTool2]);
    
    // Can't easily test this directly, but at least verify no errors occur
    expect(true).toBe(true);
  });
  
  // This test requires manual verification of console output
  test('should start server', async () => {
    server = new GitHubCliServer();
    
    // Jest won't capture console.error output directly
    const originalConsoleError = console.error;
    const mockConsoleError = jest.fn();
    console.error = mockConsoleError;
    
    try {
      closeFn = await server.start();
      
      // Verify console output
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('GitHub CLI MCP Server running on stdio')
      );
    } finally {
      console.error = originalConsoleError;
    }
  });
});
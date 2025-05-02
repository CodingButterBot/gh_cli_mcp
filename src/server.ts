import { McpServer as BaseMcpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { Tool } from './stdio.js';

/**
 * Server configuration options
 */
export interface ServerConfig {
  name: string;
  version: string;
  description: string;
  homepage: string;
  license: string;
  sessionTimeout?: number;
}

/**
 * Default server configuration
 */
const DEFAULT_CONFIG: ServerConfig = {
  name: 'GitHub CLI MCP Server',
  version: '1.1.0',
  description: 'GitHub CLI commands via Model Context Protocol',
  homepage: 'https://github.com/codingbutter/gh-cli-mcp',
  license: 'MIT',
  sessionTimeout: 30 * 60 * 1000 // 30 minutes
};

/**
 * MCP Server for GitHub CLI tools
 */
export class GitHubCliServer extends BaseMcpServer {
  private toolsList: Tool<any>[] = [];
  public readonly config: ServerConfig;

  /**
   * Create a new GitHub CLI MCP server
   * @param config Server configuration
   */
  constructor(config: Partial<ServerConfig> = {}) {
    // Merge with default config
    const mergedConfig = {
      ...DEFAULT_CONFIG,
      ...config
    };
    
    super(mergedConfig);
    this.config = mergedConfig;
    
    console.error(`[Server] Created with stdio transport`);
  }

  /**
   * Add a tool with the given name, schema, handler, and options
   */
  addTool<T extends z.ZodTypeAny>(
    name: string,
    schema: T,
    handler: (params: z.infer<T>, sessionId?: string) => Promise<{
      content: Array<{ type: string; text: string }>;
    }>,
    options: {
      description: string;
    }
  ) {
    const wrappedHandler = async (params: z.infer<T>, sessionId?: string) => {
      // Call the original handler
      return await handler(params, sessionId);
    };
    
    const tool = new Tool(name, schema, wrappedHandler, options);
    this.toolsList.push(tool);
    
    // Register with MCP server
    const [toolName, toolSchema, toolHandler, toolOptions] = tool.definition();
    super.tool(toolName, JSON.stringify(toolOptions), (toolSchema as any)?._def?.shape || toolSchema, toolHandler);
    
    return this;
  }

  /**
   * Register multiple tools
   */
  tools(toolsList: Tool<any>[]) {
    for (const tool of toolsList) {
      const [name, schema, handler, options] = tool.definition();
      this.addTool(name, schema, handler, options);
    }
  }

  /**
   * Start the server with stdio transport
   */
  async start() {
    // Create the transport
    const transport = new StdioServerTransport();
    
    // Connect to the transport
    await this.connect(transport);
    
    console.error('🚀 GitHub CLI MCP Server running on stdio');
    
    // Return a close function that uses the transport's close method
    return {
      close: () => {
        transport.close();
        console.error('MCP server closed');
      }
    };
  }
}
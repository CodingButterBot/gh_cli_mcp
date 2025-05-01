import { z } from 'zod';
import { McpServer as BaseMcpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

/**
 * Tool class for defining GitHub CLI tools
 */
export class Tool<T extends z.ZodTypeAny> {
  constructor(
    public name: string,
    public schema: T,
    public handler: (params: z.infer<T>, sessionId?: string) => Promise<{
      content: Array<{ type: string; text: string }>;
    }>,
    public options: {
      description: string;
    }
  ) {}

  definition(): [string, z.ZodTypeAny, (params: any, sessionId?: string) => Promise<any>, { description: string }] {
    return [this.name, this.schema, this.handler, this.options];
  }
}

/**
 * MCP Server for GitHub CLI tools
 * @deprecated Use GitHubCliServer from server.ts instead for multi-client support
 */
export class GitHubCliServer extends BaseMcpServer {
  private toolsList: Tool<any>[] = [];
  public readonly config: any;

  /**
   * Create a new GitHub CLI MCP server
   */
  constructor() {
    const config = {
      name: 'GitHub CLI MCP Server',
      version: '1.1.0',
      description: 'GitHub CLI commands via Model Context Protocol',
      homepage: 'https://github.com/codingbutter/gh-cli-mcp',
      license: 'MIT'
    };
    super(config);
    this.config = config;
    console.warn('WARNING: This class is deprecated. Use GitHubCliServer from server.ts instead for multi-client support.');
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
    const tool = new Tool(name, schema, handler, options);
    this.toolsList.push(tool);
    
    // Create a wrapper handler that passes the sessionId to the original handler
    const wrappedHandler = async (extra: any) => {
      // Extract sessionId and params from extra if available
      const sessionId = extra?.sessionId;
      const params = extra?.params || {};
      
      // Call the original handler
      const result = await handler(params, sessionId);
      
      // Return in the format expected by the MCP SDK
      return {
        content: result.content.map(item => {
          if (item.type === 'text') {
            return { type: 'text', text: item.text };
          }
          // Handle other types if needed
          return item;
        }),
        _meta: extra?._meta
      };
    };
    
    // Register with MCP server
    const [toolName, toolSchema, , toolOptions] = tool.definition();
    super.tool(toolName, JSON.stringify(toolOptions), (toolSchema as any)?._def?.shape || toolSchema, wrappedHandler);
    
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
    const transport = new StdioServerTransport();
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
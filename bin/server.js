import { McpServer as BaseMcpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Tool } from './stdio.js';
/**
 * Default server configuration
 */
const DEFAULT_CONFIG = {
    name: 'GitHub CLI MCP Server',
    version: '1.1.0',
    description: 'GitHub CLI commands via Model Context Protocol',
    homepage: 'https://github.com/codingbutter/gh-cli-mcp',
    license: 'MIT',
    sessionTimeout: 30 * 60 * 1000 // 30 minutes
};
/**
 * MCP Server for GitHub CLI tools using stdio transport
 */
export class GitHubCliServer extends BaseMcpServer {
    toolsList = [];
    config;
    transport = null;
    // Standard session ID for stdio transport (since there's only one client)
    static STDIO_SESSION_ID = 'stdio-session';
    /**
     * Create a new GitHub CLI MCP server
     * @param config Server configuration
     */
    constructor(config = {}) {
        // Merge with default config
        const mergedConfig = {
            ...DEFAULT_CONFIG,
            ...config
        };
        super(mergedConfig);
        this.config = mergedConfig;
        console.error(`[Server] Created GitHub CLI MCP Server`);
    }
    /**
     * Add a tool with the given name, schema, handler, and options
     */
    addTool(name, schema, handler, options) {
        // Always use the standard session ID for stdio
        const wrappedHandler = async (params) => {
            // Call the original handler with the standard session ID
            return await handler(params, GitHubCliServer.STDIO_SESSION_ID);
        };
        const tool = new Tool(name, schema, wrappedHandler, options);
        this.toolsList.push(tool);
        // Register with MCP server
        const [toolName, toolSchema, toolHandler, toolOptions] = tool.definition();
        super.tool(toolName, JSON.stringify(toolOptions), toolSchema?._def?.shape || toolSchema, toolHandler);
        return this;
    }
    /**
     * Register multiple tools
     */
    tools(toolsList) {
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
        this.transport = new StdioServerTransport();
        // Connect to the transport
        await this.connect(this.transport);
        console.error('🚀 GitHub CLI MCP Server running on stdio');
        // Return a close function that uses the transport's close method
        return {
            close: () => {
                if (this.transport) {
                    this.transport.close();
                    this.transport = null;
                }
                console.error('MCP server closed');
            }
        };
    }
}
//# sourceMappingURL=server.js.map
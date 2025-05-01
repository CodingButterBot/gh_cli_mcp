import { McpServer as BaseMcpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
/**
 * Tool class for defining GitHub CLI tools
 */
export class Tool {
    name;
    schema;
    handler;
    options;
    constructor(name, schema, handler, options) {
        this.name = name;
        this.schema = schema;
        this.handler = handler;
        this.options = options;
    }
    definition() {
        return [this.name, this.schema, this.handler, this.options];
    }
}
/**
 * MCP Server for GitHub CLI tools
 */
export class GitHubCliServer extends BaseMcpServer {
    toolsList = [];
    config;
    /**
     * Create a new GitHub CLI MCP server
     */
    constructor() {
        const config = {
            name: 'GitHub CLI MCP Server',
            version: '1.0.1',
            description: 'GitHub CLI commands via Model Context Protocol',
            homepage: 'https://github.com/yourusername/gh-cli-mcp',
            license: 'MIT'
        };
        super(config);
        this.config = config;
    }
    /**
     * Add a tool with the given name, schema, handler, and options
     */
    addTool(name, schema, handler, options) {
        const tool = new Tool(name, schema, handler, options);
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
//# sourceMappingURL=stdio.js.map
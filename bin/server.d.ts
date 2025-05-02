import { McpServer as BaseMcpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
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
 * MCP Server for GitHub CLI tools
 */
export declare class GitHubCliServer extends BaseMcpServer {
    private toolsList;
    readonly config: ServerConfig;
    /**
     * Create a new GitHub CLI MCP server
     * @param config Server configuration
     */
    constructor(config?: Partial<ServerConfig>);
    /**
     * Add a tool with the given name, schema, handler, and options
     */
    addTool<T extends z.ZodTypeAny>(name: string, schema: T, handler: (params: z.infer<T>, sessionId?: string) => Promise<{
        content: Array<{
            type: string;
            text: string;
        }>;
    }>, options: {
        description: string;
    }): this;
    /**
     * Register multiple tools
     */
    tools(toolsList: Tool<any>[]): void;
    /**
     * Start the server with stdio transport
     */
    start(): Promise<{
        close: () => void;
    }>;
}
//# sourceMappingURL=server.d.ts.map
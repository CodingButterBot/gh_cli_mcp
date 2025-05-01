import { McpServer as BaseMcpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { Tool } from './stdio.js';
/**
 * Transport types supported by the server
 */
export declare enum TransportType {
    STDIO = "stdio",
    WEBSOCKET = "websocket",
    TCP = "tcp"
}
/**
 * Server configuration options
 */
export interface ServerConfig {
    name: string;
    version: string;
    description: string;
    homepage: string;
    license: string;
    transport: {
        type: TransportType;
        options?: {
            port?: number;
            host?: string;
        };
    };
    sessionTimeout?: number;
}
/**
 * MCP Server for GitHub CLI tools with multi-client support
 */
export declare class GitHubCliServer extends BaseMcpServer {
    private toolsList;
    readonly config: ServerConfig;
    private sessionManager;
    private transport;
    private transportEmitter;
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
     * Create a transport based on configuration
     */
    private createTransport;
    /**
     * Start the server with the configured transport
     */
    start(): Promise<{
        close: () => void;
    }>;
}
//# sourceMappingURL=server.d.ts.map
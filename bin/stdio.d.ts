import { z } from 'zod';
import { McpServer as BaseMcpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
/**
 * Tool class for defining GitHub CLI tools
 */
export declare class Tool<T extends z.ZodTypeAny> {
    name: string;
    schema: T;
    handler: (params: z.infer<T>) => Promise<{
        content: Array<{
            type: string;
            text: string;
        }>;
    }>;
    options: {
        description: string;
    };
    constructor(name: string, schema: T, handler: (params: z.infer<T>) => Promise<{
        content: Array<{
            type: string;
            text: string;
        }>;
    }>, options: {
        description: string;
    });
    definition(): [string, z.ZodTypeAny, (params: any) => Promise<any>, {
        description: string;
    }];
}
/**
 * MCP Server for GitHub CLI tools
 */
export declare class GitHubCliServer extends BaseMcpServer {
    private toolsList;
    readonly config: any;
    /**
     * Create a new GitHub CLI MCP server
     */
    constructor();
    /**
     * Add a tool with the given name, schema, handler, and options
     */
    addTool<T extends z.ZodTypeAny>(name: string, schema: T, handler: (params: z.infer<T>) => Promise<{
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
//# sourceMappingURL=stdio.d.ts.map
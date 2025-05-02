/**
 * Standard I/O utilities for the MCP server
 *
 * This module provides the base Tool class and a simple stdio-based server
 * implementation for the GitHub CLI MCP.
 *
 * @module stdio
 */
import { z } from 'zod';
import { McpServer as BaseMcpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
/**
 * Tool class for defining GitHub CLI tools
 *
 * Represents a single tool that can be registered with the MCP server.
 * Each tool has a name, schema, handler function, and description.
 *
 * @class
 * @template T The Zod schema type for the tool's parameters
 */
export declare class Tool<T extends z.ZodTypeAny> {
    name: string;
    schema: T;
    handler: (params: z.infer<T>, sessionId?: string) => Promise<{
        content: Array<{
            type: string;
            text: string;
        }>;
    }>;
    options: {
        description: string;
    };
    /**
     * Creates a new Tool instance
     *
     * @param {string} name - The name of the tool (e.g., 'gh_pr_list')
     * @param {T} schema - Zod schema defining the tool's parameters
     * @param {Function} handler - Async function that executes the tool's logic
     * @param {Object} options - Additional options for the tool
     * @param {string} options.description - Human-readable description of the tool
     */
    constructor(name: string, schema: T, handler: (params: z.infer<T>, sessionId?: string) => Promise<{
        content: Array<{
            type: string;
            text: string;
        }>;
    }>, options: {
        description: string;
    });
    /**
     * Returns the tool's definition as a tuple
     *
     * @returns {Array} A tuple containing [name, schema, handler, options]
     */
    definition(): [string, z.ZodTypeAny, (params: any, sessionId?: string) => Promise<any>, {
        description: string;
    }];
}
/**
 * MCP Server for GitHub CLI tools
 * @deprecated Use GitHubCliServer from server.ts instead for multi-client support
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
//# sourceMappingURL=stdio.d.ts.map
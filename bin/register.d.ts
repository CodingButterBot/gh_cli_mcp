/**
 * Tool registration and schema definitions
 *
 * This module provides the tool registration functionality and schema definitions
 * for GitHub CLI tools using Zod.
 *
 * @module register
 */
import { z } from 'zod';
import { Tool } from './stdio.js';
import { GithubCliTools } from './types/github.js';
/**
 * Interface for any server that can register tools
 * Used for dependency injection to allow registering tools with different server implementations
 *
 * @interface
 */
export interface ToolCapableServer {
    /**
     * Adds a tool to the server
     *
     * @template T - Zod schema type
     * @param {string} name - The name of the tool
     * @param {T} schema - The parameter schema for the tool
     * @param {Function} handler - The function that executes the tool
     * @param {Object} options - Additional options
     * @param {string} options.description - Tool description
     * @returns {any} The server instance for chaining
     */
    addTool: <T extends z.ZodTypeAny>(name: string, schema: T, handler: (params: any, sessionId?: string) => Promise<any>, options: {
        description: string;
    }) => any;
}
/**
 * ZodSchema for base GitHub parameters
 * Defines the common parameters used by most GitHub CLI commands
 *
 * @constant {z.ZodObject}
 */
export declare const baseGitHubParamsSchema: z.ZodObject<{
    /** Repository name with owner in the format 'owner/repo' */
    repo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
}, {
    repo?: string | undefined;
}>;
/**
 * ZodSchema for common resource parameters
 * Extends base parameters with fields common to resources like PRs and Issues
 *
 * @constant {z.ZodObject}
 */
export declare const commonResourceParamsSchema: z.ZodObject<{
    /** Repository name with owner in the format 'owner/repo' */
    repo: z.ZodOptional<z.ZodString>;
} & {
    /** Title for the resource (PR, issue, etc.) */
    title: z.ZodOptional<z.ZodString>;
    /** Body content as text */
    body: z.ZodOptional<z.ZodString>;
    /** Path to file containing body content */
    body_file: z.ZodOptional<z.ZodString>;
    /** Whether to open in browser */
    web: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
    body_file?: string | undefined;
    web?: boolean | undefined;
}, {
    repo?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
    body_file?: string | undefined;
    web?: boolean | undefined;
}>;
/**
 * ZodSchema for filtering GitHub resources
 * Defines common filtering parameters for listing resources
 *
 * @constant {z.ZodObject}
 */
export declare const filterParamsSchema: z.ZodObject<{
    /** Repository name with owner in the format 'owner/repo' */
    repo: z.ZodOptional<z.ZodString>;
} & {
    /** Resource state filter (open, closed, merged, all) */
    state: z.ZodOptional<z.ZodEnum<["open", "closed", "merged", "all"]>>;
    /** Filter by assigned user */
    assignee: z.ZodOptional<z.ZodString>;
    /** Filter by author/creator */
    author: z.ZodOptional<z.ZodString>;
    /** Filter by label or labels */
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    /** Maximum number of results to return */
    limit: z.ZodOptional<z.ZodNumber>;
    /** Text search query */
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
    state?: "open" | "closed" | "merged" | "all" | undefined;
    assignee?: string | undefined;
    author?: string | undefined;
    label?: string | string[] | undefined;
    limit?: number | undefined;
    search?: string | undefined;
}, {
    repo?: string | undefined;
    state?: "open" | "closed" | "merged" | "all" | undefined;
    assignee?: string | undefined;
    author?: string | undefined;
    label?: string | string[] | undefined;
    limit?: number | undefined;
    search?: string | undefined;
}>;
/**
 * ZodSchema for Pull Request specific parameters
 * Combines common resource parameters with filtering and PR-specific fields
 *
 * @constant {z.ZodObject}
 */
export declare const pullRequestParamsSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    body_file: z.ZodOptional<z.ZodString>;
    web: z.ZodOptional<z.ZodBoolean>;
} & {
    repo: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodEnum<["open", "closed", "merged", "all"]>>;
    assignee: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    limit: z.ZodOptional<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
} & {
    /** Base branch (target) for the PR */
    base: z.ZodOptional<z.ZodString>;
    /** Head branch (source) for the PR */
    head: z.ZodOptional<z.ZodString>;
    /** Whether to create as a draft PR */
    draft: z.ZodOptional<z.ZodBoolean>;
    /** Reviewer username(s) to request */
    reviewer: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
    body_file?: string | undefined;
    web?: boolean | undefined;
    state?: "open" | "closed" | "merged" | "all" | undefined;
    assignee?: string | undefined;
    author?: string | undefined;
    label?: string | string[] | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    base?: string | undefined;
    head?: string | undefined;
    draft?: boolean | undefined;
    reviewer?: string | string[] | undefined;
}, {
    repo?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
    body_file?: string | undefined;
    web?: boolean | undefined;
    state?: "open" | "closed" | "merged" | "all" | undefined;
    assignee?: string | undefined;
    author?: string | undefined;
    label?: string | string[] | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    base?: string | undefined;
    head?: string | undefined;
    draft?: boolean | undefined;
    reviewer?: string | string[] | undefined;
}>;
/**
 * ZodSchema for Issue specific parameters
 * Combines common resource parameters with filtering and issue-specific fields
 *
 * @constant {z.ZodObject}
 */
export declare const issueParamsSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    body_file: z.ZodOptional<z.ZodString>;
    web: z.ZodOptional<z.ZodBoolean>;
} & {
    repo: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodEnum<["open", "closed", "merged", "all"]>>;
    assignee: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    limit: z.ZodOptional<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
} & {
    /** Milestone name or number to filter by */
    milestone: z.ZodOptional<z.ZodString>;
    /** Project name or number to filter by */
    project: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
    body_file?: string | undefined;
    web?: boolean | undefined;
    state?: "open" | "closed" | "merged" | "all" | undefined;
    assignee?: string | undefined;
    author?: string | undefined;
    label?: string | string[] | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    milestone?: string | undefined;
    project?: string | undefined;
}, {
    repo?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
    body_file?: string | undefined;
    web?: boolean | undefined;
    state?: "open" | "closed" | "merged" | "all" | undefined;
    assignee?: string | undefined;
    author?: string | undefined;
    label?: string | string[] | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    milestone?: string | undefined;
    project?: string | undefined;
}>;
/**
 * Register tools with the server using type-safe schemas
 * Organizes tools by category and registers them with the server
 *
 * @param {ToolCapableServer} server - GitHub CLI MCP server instance
 * @param {GithubCliTools} tools - GitHub CLI tools organized by category
 * @returns {void}
 */
export declare function registerTools(server: ToolCapableServer, tools: GithubCliTools): void;
/**
 * Register tools directly using Tool class instances
 * Simpler alternative to registerTools that works with an array of Tool instances
 *
 * @param {ToolCapableServer} server - GitHub CLI MCP server instance
 * @param {Tool<any>[]} tools - Array of Tool instances to register
 * @returns {void}
 */
export declare function registerToolsList(server: ToolCapableServer, tools: Tool<any>[]): void;
//# sourceMappingURL=register.d.ts.map
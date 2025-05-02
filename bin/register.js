/**
 * Tool registration and schema definitions
 *
 * This module provides the tool registration functionality and schema definitions
 * for GitHub CLI tools using Zod.
 *
 * @module register
 */
import { z } from 'zod';
/**
 * ZodSchema for base GitHub parameters
 * Defines the common parameters used by most GitHub CLI commands
 *
 * @constant {z.ZodObject}
 */
export const baseGitHubParamsSchema = z.object({
    /** Repository name with owner in the format 'owner/repo' */
    repo: z.string().optional().describe('Repository name with owner (e.g., owner/repo)')
});
/**
 * ZodSchema for common resource parameters
 * Extends base parameters with fields common to resources like PRs and Issues
 *
 * @constant {z.ZodObject}
 */
export const commonResourceParamsSchema = baseGitHubParamsSchema.extend({
    /** Title for the resource (PR, issue, etc.) */
    title: z.string().optional().describe('Title for the resource'),
    /** Body content as text */
    body: z.string().optional().describe('Body content for the resource'),
    /** Path to file containing body content */
    body_file: z.string().optional().describe('Path to a file containing the body content'),
    /** Whether to open in browser */
    web: z.boolean().optional().describe('Open the resource in a web browser')
});
/**
 * ZodSchema for filtering GitHub resources
 * Defines common filtering parameters for listing resources
 *
 * @constant {z.ZodObject}
 */
export const filterParamsSchema = baseGitHubParamsSchema.extend({
    /** Resource state filter (open, closed, merged, all) */
    state: z.enum(['open', 'closed', 'merged', 'all']).optional().describe('State of the resource'),
    /** Filter by assigned user */
    assignee: z.string().optional().describe('Filter by assignee'),
    /** Filter by author/creator */
    author: z.string().optional().describe('Filter by author'),
    /** Filter by label or labels */
    label: z.union([z.string(), z.array(z.string())]).optional().describe('Filter by label(s)'),
    /** Maximum number of results to return */
    limit: z.number().optional().describe('Maximum number of items to fetch'),
    /** Text search query */
    search: z.string().optional().describe('Search query')
});
/**
 * ZodSchema for Pull Request specific parameters
 * Combines common resource parameters with filtering and PR-specific fields
 *
 * @constant {z.ZodObject}
 */
export const pullRequestParamsSchema = commonResourceParamsSchema.merge(filterParamsSchema).extend({
    /** Base branch (target) for the PR */
    base: z.string().optional().describe('Base branch name'),
    /** Head branch (source) for the PR */
    head: z.string().optional().describe('Head branch name'),
    /** Whether to create as a draft PR */
    draft: z.boolean().optional().describe('Create as a draft PR'),
    /** Reviewer username(s) to request */
    reviewer: z.union([z.string(), z.array(z.string())]).optional().describe('Reviewer(s) to request')
});
/**
 * ZodSchema for Issue specific parameters
 * Combines common resource parameters with filtering and issue-specific fields
 *
 * @constant {z.ZodObject}
 */
export const issueParamsSchema = commonResourceParamsSchema.merge(filterParamsSchema).extend({
    /** Milestone name or number to filter by */
    milestone: z.string().optional().describe('Filter by milestone'),
    /** Project name or number to filter by */
    project: z.string().optional().describe('Filter by project')
});
/**
 * Register tools with the server using type-safe schemas
 * Organizes tools by category and registers them with the server
 *
 * @param {ToolCapableServer} server - GitHub CLI MCP server instance
 * @param {GithubCliTools} tools - GitHub CLI tools organized by category
 * @returns {void}
 */
export function registerTools(server, tools) {
    // Register tool categories
    Object.entries(tools).forEach(([category, categoryTools]) => {
        // Skip undefined categories
        if (!categoryTools)
            return;
        // Register each tool in this category
        Object.entries(categoryTools).forEach(([name, tool]) => {
            // Build full tool name with category prefix (e.g., gh_pr_list)
            const fullName = `gh_${category}_${name}`;
            // Cast to the expected tool structure
            const typedTool = tool;
            // Register the tool with the server
            server.addTool(fullName, typedTool.schema, typedTool.execute, { description: typedTool.description });
        });
    });
}
/**
 * Register tools directly using Tool class instances
 * Simpler alternative to registerTools that works with an array of Tool instances
 *
 * @param {ToolCapableServer} server - GitHub CLI MCP server instance
 * @param {Tool<any>[]} tools - Array of Tool instances to register
 * @returns {void}
 */
export function registerToolsList(server, tools) {
    tools.forEach(tool => {
        // Register each tool directly without category organization
        server.addTool(tool.name, tool.schema, tool.handler, tool.options);
    });
}
//# sourceMappingURL=register.js.map
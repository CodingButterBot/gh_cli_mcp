import { z } from 'zod';
/**
 * ZodSchema for base GitHub parameters
 */
export const baseGitHubParamsSchema = z.object({
    repo: z.string().optional().describe('Repository name with owner (e.g., owner/repo)')
});
/**
 * ZodSchema for common resource parameters
 */
export const commonResourceParamsSchema = baseGitHubParamsSchema.extend({
    title: z.string().optional().describe('Title for the resource'),
    body: z.string().optional().describe('Body content for the resource'),
    body_file: z.string().optional().describe('Path to a file containing the body content'),
    web: z.boolean().optional().describe('Open the resource in a web browser')
});
/**
 * ZodSchema for filtering GitHub resources
 */
export const filterParamsSchema = baseGitHubParamsSchema.extend({
    state: z.enum(['open', 'closed', 'merged', 'all']).optional().describe('State of the resource'),
    assignee: z.string().optional().describe('Filter by assignee'),
    author: z.string().optional().describe('Filter by author'),
    label: z.union([z.string(), z.array(z.string())]).optional().describe('Filter by label(s)'),
    limit: z.number().optional().describe('Maximum number of items to fetch'),
    search: z.string().optional().describe('Search query')
});
/**
 * ZodSchema for PR specific parameters
 */
export const pullRequestParamsSchema = commonResourceParamsSchema.merge(filterParamsSchema).extend({
    base: z.string().optional().describe('Base branch name'),
    head: z.string().optional().describe('Head branch name'),
    draft: z.boolean().optional().describe('Create as a draft PR'),
    reviewer: z.union([z.string(), z.array(z.string())]).optional().describe('Reviewer(s) to request')
});
/**
 * ZodSchema for Issue specific parameters
 */
export const issueParamsSchema = commonResourceParamsSchema.merge(filterParamsSchema).extend({
    milestone: z.string().optional().describe('Filter by milestone'),
    project: z.string().optional().describe('Filter by project')
});
/**
 * Register tools with the server using type-safe schemas
 * @param server GitHub CLI MCP server
 * @param tools GitHub CLI tools organized by category
 */
export function registerTools(server, tools) {
    // Register tool categories
    Object.entries(tools).forEach(([category, categoryTools]) => {
        if (!categoryTools)
            return;
        Object.entries(categoryTools).forEach(([name, tool]) => {
            const fullName = `gh_${category}_${name}`;
            const typedTool = tool;
            server.addTool(fullName, typedTool.schema, typedTool.execute, { description: typedTool.description });
        });
    });
}
/**
 * Register tools directly using Tool class instances
 * @param server GitHub CLI MCP server
 * @param tools Array of Tool instances
 */
export function registerToolsList(server, tools) {
    tools.forEach(tool => {
        server.addTool(tool.name, tool.schema, tool.handler, tool.options);
    });
}
//# sourceMappingURL=register.js.map
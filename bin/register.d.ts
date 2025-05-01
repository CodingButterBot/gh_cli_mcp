import { z } from 'zod';
import { Tool } from './stdio.js';
export interface ToolCapableServer {
    addTool: <T extends z.ZodTypeAny>(name: string, schema: T, handler: (params: any, sessionId?: string) => Promise<any>, options: {
        description: string;
    }) => any;
}
import { GithubCliTools } from './types/github.js';
/**
 * ZodSchema for base GitHub parameters
 */
export declare const baseGitHubParamsSchema: z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
}, {
    repo?: string | undefined;
}>;
/**
 * ZodSchema for common resource parameters
 */
export declare const commonResourceParamsSchema: z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    body_file: z.ZodOptional<z.ZodString>;
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
 */
export declare const filterParamsSchema: z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    state: z.ZodOptional<z.ZodEnum<["open", "closed", "merged", "all"]>>;
    assignee: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    limit: z.ZodOptional<z.ZodNumber>;
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
 * ZodSchema for PR specific parameters
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
    base: z.ZodOptional<z.ZodString>;
    head: z.ZodOptional<z.ZodString>;
    draft: z.ZodOptional<z.ZodBoolean>;
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
    milestone: z.ZodOptional<z.ZodString>;
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
 * @param server GitHub CLI MCP server
 * @param tools GitHub CLI tools organized by category
 */
export declare function registerTools(server: ToolCapableServer, tools: GithubCliTools): void;
/**
 * Register tools directly using Tool class instances
 * @param server GitHub CLI MCP server
 * @param tools Array of Tool instances
 */
export declare function registerToolsList(server: ToolCapableServer, tools: Tool<any>[]): void;
//# sourceMappingURL=register.d.ts.map
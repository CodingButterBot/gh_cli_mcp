/**
 * GitHub CLI Tool Type Definitions
 *
 * This module provides TypeScript interfaces for GitHub CLI tools
 * and their parameters, making it easier to work with them in a type-safe way.
 *
 * @module types/github
 */
/**
 * Tool parameter definition
 * Describes a single parameter for a GitHub CLI tool
 *
 * @interface
 */
export interface ToolParameter {
    /** Human-readable description of the parameter */
    description: string;
    /** Data type of the parameter (string, boolean, number, etc.) */
    type: string;
    /** Whether the parameter is required */
    required?: boolean;
    /** Possible values for enum parameters */
    enum?: string[];
}
/**
 * Tool parameters object
 * A collection of parameters for a GitHub CLI tool
 *
 * @interface
 */
export interface ToolParameters {
    /** Map of parameter names to their definitions */
    [key: string]: ToolParameter;
}
/**
 * Custom Tool interface
 * Defines the structure of a GitHub CLI tool
 *
 * @interface
 */
export interface CustomTool {
    /** Human-readable description of the tool */
    description: string;
    /** Tool parameters definitions */
    parameters: ToolParameters;
    /**
     * Function to execute the tool
     * @param params - Parameters passed to the tool
     * @returns Promise resolving to formatted content
     */
    execute: (params: Record<string, unknown>) => Promise<{
        content: Array<{
            type: string;
            text: string;
        }>;
    }>;
}
/**
 * Tool category types
 * Collection of tools grouped by category (e.g., pr, issue, repo)
 *
 * @interface
 */
export interface ToolCategory {
    /** Map of tool names to tool definitions */
    [key: string]: CustomTool;
}
/**
 * GitHub CLI Tools organized by category
 * Complete collection of all available GitHub CLI tools
 *
 * @interface
 */
export interface GithubCliTools {
    auth?: ToolCategory;
    browse?: ToolCategory;
    codespace?: ToolCategory;
    gist?: ToolCategory;
    issue?: ToolCategory;
    org?: ToolCategory;
    pr?: ToolCategory;
    project?: ToolCategory;
    release?: ToolCategory;
    repo?: ToolCategory;
    actions?: ToolCategory;
    cache?: ToolCategory;
    run?: ToolCategory;
    workflow?: ToolCategory;
    alias?: ToolCategory;
    api?: ToolCategory;
    attestation?: ToolCategory;
    completion?: ToolCategory;
    config?: ToolCategory;
    extension?: ToolCategory;
    gpg_key?: ToolCategory;
    label?: ToolCategory;
    ruleset?: ToolCategory;
    search?: ToolCategory;
    secret?: ToolCategory;
    ssh_key?: ToolCategory;
    status?: ToolCategory;
    variable?: ToolCategory;
}
/**
 * Base parameter for GitHub CLI commands
 * The foundation parameter type that all other parameter types extend
 *
 * @interface
 */
export interface BaseGitHubParams {
    /** Repository in owner/repo format */
    repo?: string;
}
/**
 * Common parameters for creating/editing GitHub resources
 * Used for both issues and pull requests
 *
 * @interface
 * @extends BaseGitHubParams
 */
export interface CommonResourceParams extends BaseGitHubParams {
    /** Title of the resource */
    title?: string;
    /** Body content of the resource */
    body?: string;
    /** Path to a file containing the body content */
    body_file?: string;
    /** Whether to open in web browser after operation */
    web?: boolean;
}
/**
 * Common parameters for filtering GitHub resources
 * Used when listing issues, PRs, etc.
 *
 * @interface
 * @extends BaseGitHubParams
 */
export interface FilterParams extends BaseGitHubParams {
    /** State of the resources to filter by */
    state?: 'open' | 'closed' | 'merged' | 'all';
    /** Filter by assigned user */
    assignee?: string;
    /** Filter by author/creator */
    author?: string;
    /** Filter by label or labels */
    label?: string | string[];
    /** Maximum number of items to return */
    limit?: number;
    /** Search query to filter results */
    search?: string;
}
/**
 * Parameters for Pull Request operations
 * Combines common resource parameters with PR-specific fields
 *
 * @interface
 * @extends CommonResourceParams
 * @extends FilterParams
 */
export interface PullRequestParams extends CommonResourceParams, FilterParams {
    /** Base (target) branch name */
    base?: string;
    /** Head (source) branch name */
    head?: string;
    /** Whether to create as a draft PR */
    draft?: boolean;
    /** Reviewer(s) to request */
    reviewer?: string | string[];
}
/**
 * Parameters for Issue operations
 * Combines common resource parameters with issue-specific fields
 *
 * @interface
 * @extends CommonResourceParams
 * @extends FilterParams
 */
export interface IssueParams extends CommonResourceParams, FilterParams {
    /** Milestone to associate with the issue */
    milestone?: string;
    /** Project to associate with the issue */
    project?: string;
}
//# sourceMappingURL=github.d.ts.map
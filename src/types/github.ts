/**
 * Tool parameter definition
 */
export interface ToolParameter {
  description: string;
  type: string;
  required?: boolean;
  enum?: string[];
}

/**
 * Tool parameters object
 */
export interface ToolParameters {
  [key: string]: ToolParameter;
}

/**
 * Custom Tool interface
 */
export interface CustomTool {
  description: string;
  parameters: ToolParameters;
  execute: (params: Record<string, unknown>) => Promise<{
    content: Array<{ type: string; text: string }>;
  }>;
}

/**
 * Tool category types
 */
export interface ToolCategory {
  [key: string]: CustomTool;
}

/**
 * GitHub CLI Tools organized by category
 */
export interface GithubCliTools {
  // Core Commands
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

  // GitHub Actions Commands
  actions?: ToolCategory;
  cache?: ToolCategory;
  run?: ToolCategory;
  workflow?: ToolCategory;

  // Additional Commands
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
 */
export interface BaseGitHubParams {
  repo?: string;
}

/**
 * Common parameters for creating/editing GitHub resources
 */
export interface CommonResourceParams extends BaseGitHubParams {
  title?: string;
  body?: string;
  body_file?: string;
  web?: boolean;
}

/**
 * Common parameters for filtering GitHub resources
 */
export interface FilterParams extends BaseGitHubParams {
  state?: 'open' | 'closed' | 'merged' | 'all';
  assignee?: string;
  author?: string;
  label?: string | string[];
  limit?: number;
  search?: string;
}

/**
 * Parameters for PR operations
 */
export interface PullRequestParams extends CommonResourceParams, FilterParams {
  base?: string;
  head?: string;
  draft?: boolean;
  reviewer?: string | string[];
}

/**
 * Parameters for issue operations
 */
export interface IssueParams extends CommonResourceParams, FilterParams {
  milestone?: string;
  project?: string;
}
/**
 * GitHub CLI Tool Definitions
 * 
 * This module defines all the available GitHub CLI tools with their
 * schemas, handlers, and descriptions. Tools are grouped by category
 * (PR, issue, repo, etc.) and exported both individually and as a
 * combined array.
 * 
 * @module tools
 */

import { z } from 'zod';
import { Tool } from './stdio.js';
import { execGitHubCommand } from './github.js';
import {
  pullRequestParamsSchema,
  issueParamsSchema,
  baseGitHubParamsSchema,
  filterParamsSchema,
} from './register.js';

/**
 * Pull Request Tools
 * Collection of tools for working with GitHub Pull Requests
 * 
 * @constant {Object<string, Tool>}
 */
export const prTools = {
  list: new Tool(
    'gh_pr_list',
    filterParamsSchema,
    async (params, sessionId) => {
      return await execGitHubCommand('pr', 'list', params, sessionId);
    },
    { description: 'List pull requests in a repository' }
  ),
  
  view: new Tool(
    'gh_pr_view',
    baseGitHubParamsSchema.extend({
      number: z.number().describe('Pull request number'),
      web: z.boolean().optional().describe('Open in the browser'),
      comments: z.boolean().optional().describe('Show PR comments')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('pr', 'view', params, sessionId);
    },
    { description: 'View a pull request' }
  ),
  
  create: new Tool(
    'gh_pr_create',
    pullRequestParamsSchema,
    async (params, sessionId) => {
      return await execGitHubCommand('pr', 'create', params, sessionId);
    },
    { description: 'Create a new pull request' }
  ),
  
  close: new Tool(
    'gh_pr_close',
    baseGitHubParamsSchema.extend({
      number: z.number().describe('Pull request number'),
      comment: z.string().optional().describe('Add a closing comment'),
      delete_branch: z.boolean().optional().describe('Delete the local and remote branch after close')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('pr', 'close', params, sessionId);
    },
    { description: 'Close a pull request' }
  )
};

/**
 * Issue Tools
 * Collection of tools for working with GitHub Issues
 * 
 * @constant {Object<string, Tool>}
 */
export const issueTools = {
  list: new Tool(
    'gh_issue_list',
    filterParamsSchema,
    async (params, sessionId) => {
      return await execGitHubCommand('issue', 'list', params, sessionId);
    },
    { description: 'List issues in a repository' }
  ),
  
  view: new Tool(
    'gh_issue_view',
    baseGitHubParamsSchema.extend({
      number: z.number().describe('Issue number'),
      web: z.boolean().optional().describe('Open in the browser'),
      comments: z.boolean().optional().describe('Show issue comments')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('issue', 'view', params, sessionId);
    },
    { description: 'View an issue' }
  ),
  
  create: new Tool(
    'gh_issue_create',
    issueParamsSchema,
    async (params, sessionId) => {
      return await execGitHubCommand('issue', 'create', params, sessionId);
    },
    { description: 'Create a new issue' }
  ),
  
  close: new Tool(
    'gh_issue_close',
    baseGitHubParamsSchema.extend({
      number: z.number().describe('Issue number'),
      comment: z.string().optional().describe('Add a closing comment')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('issue', 'close', params, sessionId);
    },
    { description: 'Close an issue' }
  )
};

/**
 * Repository Tools
 * Collection of tools for working with GitHub Repositories
 * 
 * @constant {Object<string, Tool>}
 */
export const repoTools = {
  view: new Tool(
    'gh_repo_view',
    baseGitHubParamsSchema.extend({
      web: z.boolean().optional().describe('Open in the browser')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('repo', 'view', params, sessionId);
    },
    { description: 'View a repository' }
  ),
  
  list: new Tool(
    'gh_repo_list',
    z.object({
      limit: z.number().optional().describe('Maximum number of repositories to list'),
      owner: z.string().optional().describe('Filter by owner'),
      language: z.string().optional().describe('Filter by language'),
      visibility: z.enum(['public', 'private']).optional().describe('Filter by visibility')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('repo', 'list', params, sessionId);
    },
    { description: 'List repositories' }
  )
};

/**
 * Project Tools
 * Collection of tools for working with GitHub Projects
 * 
 * @constant {Object<string, Tool>}
 */
export const projectTools = {
  view: new Tool(
    'gh_project_view',
    baseGitHubParamsSchema.extend({
      number: z.number().describe('Project number'),
      web: z.boolean().optional().describe('Open in the browser')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('project', 'view', params, sessionId);
    },
    { description: 'View a project' }
  ),
  
  list: new Tool(
    'gh_project_list',
    baseGitHubParamsSchema.extend({
      limit: z.number().optional().describe('Maximum number of projects to list'),
      format: z.string().optional().describe('Format output with a Go template')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('project', 'list', params, sessionId);
    },
    { description: 'List projects' }
  ),
  
  create: new Tool(
    'gh_project_create',
    baseGitHubParamsSchema.extend({
      title: z.string().describe('Title for the project'),
      body: z.string().optional().describe('Description for the project')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('project', 'create', params, sessionId);
    },
    { description: 'Create a new project' }
  ),
  
  edit: new Tool(
    'gh_project_edit',
    baseGitHubParamsSchema.extend({
      number: z.number().describe('Project number'),
      title: z.string().optional().describe('New title for the project'),
      body: z.string().optional().describe('New description for the project')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('project', 'edit', params, sessionId);
    },
    { description: 'Edit a project' }
  )
};

/**
 * Workflow Tools
 * Collection of tools for working with GitHub Actions Workflows
 * 
 * @constant {Object<string, Tool>}
 */
export const workflowTools = {
  list: new Tool(
    'gh_workflow_list',
    baseGitHubParamsSchema.extend({
      all: z.boolean().optional().describe('Show all workflows, including disabled ones')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('workflow', 'list', params, sessionId);
    },
    { description: 'List workflows in a repository' }
  ),
  
  view: new Tool(
    'gh_workflow_view',
    baseGitHubParamsSchema.extend({
      name: z.string().describe('Name or ID of the workflow'),
      yaml: z.boolean().optional().describe('View the workflow YAML file')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('workflow', 'view', params, sessionId);
    },
    { description: 'View a workflow' }
  ),
  
  run: new Tool(
    'gh_workflow_run',
    baseGitHubParamsSchema.extend({
      name: z.string().describe('Name or ID of the workflow'),
      ref: z.string().optional().describe('Branch or tag name to run the workflow on')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('workflow', 'run', params, sessionId);
    },
    { description: 'Run a workflow' }
  ),
  
  disable: new Tool(
    'gh_workflow_disable',
    baseGitHubParamsSchema.extend({
      name: z.string().describe('Name or ID of the workflow')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('workflow', 'disable', params, sessionId);
    },
    { description: 'Disable a workflow' }
  ),
  
  enable: new Tool(
    'gh_workflow_enable',
    baseGitHubParamsSchema.extend({
      name: z.string().describe('Name or ID of the workflow')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('workflow', 'enable', params, sessionId);
    },
    { description: 'Enable a workflow' }
  )
};

/**
 * Release Tools
 * Collection of tools for working with GitHub Releases
 * 
 * @constant {Object<string, Tool>}
 */
export const releaseTools = {
  list: new Tool(
    'gh_release_list',
    baseGitHubParamsSchema.extend({
      limit: z.number().optional().describe('Maximum number of releases to fetch')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('release', 'list', params, sessionId);
    },
    { description: 'List releases in a repository' }
  ),
  
  view: new Tool(
    'gh_release_view',
    baseGitHubParamsSchema.extend({
      tag: z.string().optional().describe('Tag name of the release'),
      web: z.boolean().optional().describe('Open the release in the browser')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('release', 'view', params, sessionId);
    },
    { description: 'View a release' }
  ),
  
  create: new Tool(
    'gh_release_create',
    baseGitHubParamsSchema.extend({
      tag: z.string().describe('Tag name for the release'),
      title: z.string().optional().describe('Title for the release'),
      notes: z.string().optional().describe('Release notes'),
      draft: z.boolean().optional().describe('Create as a draft release'),
      prerelease: z.boolean().optional().describe('Mark as a prerelease')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('release', 'create', params, sessionId);
    },
    { description: 'Create a new release' }
  ),
  
  delete: new Tool(
    'gh_release_delete',
    baseGitHubParamsSchema.extend({
      tag: z.string().describe('Tag name of the release to delete'),
      yes: z.boolean().optional().describe('Skip the confirmation prompt')
    }),
    async (params, sessionId) => {
      return await execGitHubCommand('release', 'delete', params, sessionId);
    },
    { description: 'Delete a release' }
  )
};

/**
 * All GitHub CLI tools combined into a single array
 * 
 * This array contains all available tools from all categories,
 * flattened into a single list for easy registration with the server.
 * 
 * @constant {Tool<any>[]}
 */
export const allTools = [
  ...Object.values(prTools),
  ...Object.values(issueTools),
  ...Object.values(repoTools),
  ...Object.values(projectTools),
  ...Object.values(workflowTools),
  ...Object.values(releaseTools)
];
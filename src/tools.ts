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
 */
export const prTools = {
  list: new Tool(
    'gh_pr_list',
    filterParamsSchema,
    async (params) => {
      return await execGitHubCommand('pr', 'list', params);
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
    async (params) => {
      return await execGitHubCommand('pr', 'view', params);
    },
    { description: 'View a pull request' }
  ),
  
  create: new Tool(
    'gh_pr_create',
    pullRequestParamsSchema,
    async (params) => {
      return await execGitHubCommand('pr', 'create', params);
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
    async (params) => {
      return await execGitHubCommand('pr', 'close', params);
    },
    { description: 'Close a pull request' }
  )
};

/**
 * Issue Tools
 */
export const issueTools = {
  list: new Tool(
    'gh_issue_list',
    filterParamsSchema,
    async (params) => {
      return await execGitHubCommand('issue', 'list', params);
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
    async (params) => {
      return await execGitHubCommand('issue', 'view', params);
    },
    { description: 'View an issue' }
  ),
  
  create: new Tool(
    'gh_issue_create',
    issueParamsSchema,
    async (params) => {
      return await execGitHubCommand('issue', 'create', params);
    },
    { description: 'Create a new issue' }
  ),
  
  close: new Tool(
    'gh_issue_close',
    baseGitHubParamsSchema.extend({
      number: z.number().describe('Issue number'),
      comment: z.string().optional().describe('Add a closing comment')
    }),
    async (params) => {
      return await execGitHubCommand('issue', 'close', params);
    },
    { description: 'Close an issue' }
  )
};

/**
 * Repository Tools
 */
export const repoTools = {
  view: new Tool(
    'gh_repo_view',
    baseGitHubParamsSchema.extend({
      web: z.boolean().optional().describe('Open in the browser')
    }),
    async (params) => {
      return await execGitHubCommand('repo', 'view', params);
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
    async (params) => {
      return await execGitHubCommand('repo', 'list', params);
    },
    { description: 'List repositories' }
  )
};

/**
 * All GitHub CLI tools
 */
export const allTools = [
  ...Object.values(prTools),
  ...Object.values(issueTools),
  ...Object.values(repoTools)
];
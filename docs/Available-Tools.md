# Available Tools

GitHub CLI MCP provides access to various GitHub CLI tools through the Model Context Protocol. Here's a comprehensive list of the available tools organized by category.

## Pull Request Tools

### gh_pr_list

Lists pull requests in a repository.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `state` (optional): State of PRs to list (open, closed, merged, all)
- `assignee` (optional): Filter by assignee
- `author` (optional): Filter by author
- `label` (optional): Filter by label(s)
- `limit` (optional): Maximum number of items to fetch
- `search` (optional): Search query

### gh_pr_view

View a specific pull request.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `number` (required): Pull request number
- `web` (optional): Open in the browser
- `comments` (optional): Show PR comments

### gh_pr_create

Create a new pull request.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `title` (optional): Title for the PR
- `body` (optional): Body content for the PR
- `body_file` (optional): Path to a file containing the body content
- `base` (optional): Base branch name
- `head` (optional): Head branch name
- `draft` (optional): Create as a draft PR
- `reviewer` (optional): Reviewer(s) to request

### gh_pr_close

Close a pull request.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `number` (required): Pull request number
- `comment` (optional): Add a closing comment
- `delete_branch` (optional): Delete the local and remote branch after close

## Issue Tools

### gh_issue_list

List issues in a repository.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `state` (optional): State of issues to list (open, closed, all)
- `assignee` (optional): Filter by assignee
- `author` (optional): Filter by author
- `label` (optional): Filter by label(s)
- `limit` (optional): Maximum number of items to fetch
- `search` (optional): Search query
- `milestone` (optional): Filter by milestone
- `project` (optional): Filter by project

### gh_issue_view

View a specific issue.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `number` (required): Issue number
- `web` (optional): Open in the browser
- `comments` (optional): Show issue comments

### gh_issue_create

Create a new issue.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `title` (optional): Title for the issue
- `body` (optional): Body content for the issue
- `body_file` (optional): Path to a file containing the body content

### gh_issue_close

Close an issue.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `number` (required): Issue number
- `comment` (optional): Add a closing comment

## Repository Tools

### gh_repo_view

View a repository.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `web` (optional): Open in the browser

### gh_repo_list

List repositories.

**Parameters:**
- `limit` (optional): Maximum number of repositories to list
- `owner` (optional): Filter by owner
- `language` (optional): Filter by language
- `visibility` (optional): Filter by visibility (public, private)

## Project Tools

### gh_project_view

View a project.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `number` (required): Project number
- `web` (optional): Open in the browser

### gh_project_list

List projects.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `limit` (optional): Maximum number of projects to list
- `format` (optional): Format output with a Go template

### gh_project_create

Create a new project.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `title` (required): Title for the project
- `body` (optional): Description for the project

### gh_project_edit

Edit a project.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `number` (required): Project number
- `title` (optional): New title for the project
- `body` (optional): New description for the project

## Workflow Tools

### gh_workflow_list

List workflows in a repository.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `all` (optional): Show all workflows, including disabled ones

### gh_workflow_view

View a workflow.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `name` (required): Name or ID of the workflow
- `yaml` (optional): View the workflow YAML file

### gh_workflow_run

Run a workflow.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `name` (required): Name or ID of the workflow
- `ref` (optional): Branch or tag name to run the workflow on

### gh_workflow_disable

Disable a workflow.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `name` (required): Name or ID of the workflow

### gh_workflow_enable

Enable a workflow.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `name` (required): Name or ID of the workflow

## Release Tools

### gh_release_list

List releases in a repository.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `limit` (optional): Maximum number of releases to fetch

### gh_release_view

View a release.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `tag` (optional): Tag name of the release
- `web` (optional): Open the release in the browser

### gh_release_create

Create a new release.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `tag` (required): Tag name for the release
- `title` (optional): Title for the release
- `notes` (optional): Release notes
- `draft` (optional): Create as a draft release
- `prerelease` (optional): Mark as a prerelease

### gh_release_delete

Delete a release.

**Parameters:**
- `repo` (optional): Repository name with owner (e.g., owner/repo)
- `tag` (required): Tag name of the release to delete
- `yes` (optional): Skip the confirmation prompt
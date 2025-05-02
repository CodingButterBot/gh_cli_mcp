# Configuration

GitHub CLI MCP can be configured through a JSON configuration file or command-line arguments.

## Configuration File

Create a JSON configuration file (e.g., `gh-cli-mcp.config.json`) with the following structure:

```json
{
  "sessionTimeout": 1800000,
  "permissions": {
    "allow": [
      "mcp__github__gh_pr_list",
      "mcp__github__gh_pr_view",
      "mcp__github__gh_pr_create",
      "mcp__github__gh_pr_close",
      "mcp__github__gh_issue_list",
      "mcp__github__gh_issue_view",
      "mcp__github__gh_issue_create",
      "mcp__github__gh_issue_close",
      "mcp__github__gh_repo_view",
      "mcp__github__gh_repo_list",
      "mcp__github__gh_project_create",
      "mcp__github__gh_project_list",
      "mcp__github__gh_project_view"
    ],
    "deny": []
  }
}
```

### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `sessionTimeout` | Timeout for inactive sessions (milliseconds) | 1800000 (30 minutes) |
| `permissions.allow` | List of allowed tool names (empty array means all tools are allowed) | [] |
| `permissions.deny` | List of denied tool names | [] |

## Example Configuration Files

### Default Configuration

To use default settings, create a minimal configuration file:

```json
{
  "sessionTimeout": 1800000
}
```

### Restricted Access

To restrict access to only specific tools:

```json
{
  "sessionTimeout": 1800000,
  "permissions": {
    "allow": [
      "mcp__github__gh_pr_list",
      "mcp__github__gh_issue_list",
      "mcp__github__gh_repo_view"
    ],
    "deny": []
  }
}
```

### Specific Denials

To deny access to specific tools:

```json
{
  "sessionTimeout": 1800000,
  "permissions": {
    "allow": [],
    "deny": [
      "mcp__github__gh_pr_create",
      "mcp__github__gh_issue_create"
    ]
  }
}
```

## Specifying the Configuration File

You can specify the configuration file path using the `--config` command-line option:

```bash
gh-cli-mcp --config ./my-config.json
```

If no configuration file is specified, GitHub CLI MCP will look for a file named `gh-cli-mcp.config.json` in the current working directory.

## Command-Line Overrides

Command-line arguments take precedence over configuration file settings. For example:

```bash
gh-cli-mcp --session-timeout 3600000
```

This would set the session timeout to 3600000 milliseconds (1 hour), regardless of what is specified in the configuration file.
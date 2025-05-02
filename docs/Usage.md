# Usage Guide

This page explains how to use GitHub CLI MCP to enable AI assistants to interact with GitHub.

## Starting the Server

Start the GitHub CLI MCP server:

```bash
gh-cli-mcp
```

This starts the server using stdio transport.

## Command Line Options

GitHub CLI MCP supports the following command line options:

```
OPTIONS:
  -h, --help                 Show this help message
  -v, --version              Show version information
  -c, --config <path>        Path to configuration file
  --session-timeout <ms>     Session timeout in milliseconds
```

### Examples

**Show help:**
```bash
gh-cli-mcp --help
```

**Start with a custom configuration file:**
```bash
gh-cli-mcp --config ./my-config.json
```

**Set a custom session timeout:**
```bash
gh-cli-mcp --session-timeout 3600000
```

## Integration with AI Assistants

GitHub CLI MCP can be used with any AI assistant that supports the Model Context Protocol. Here's how to integrate it with your assistant:

1. Start the GitHub CLI MCP server
2. Configure your AI assistant to communicate with the server via stdio
3. Use the Model Context Protocol to invoke GitHub CLI tools

## Tool Invocation Examples

Here are some examples of how to invoke GitHub CLI MCP tools:

### Listing Pull Requests

```json
{
  "name": "gh_pr_list",
  "input": {
    "state": "open"
  }
}
```

### Viewing a Pull Request

```json
{
  "name": "gh_pr_view",
  "input": {
    "number": 123,
    "repo": "owner/repo"
  }
}
```

### Creating an Issue

```json
{
  "name": "gh_issue_create",
  "input": {
    "title": "Bug: Application crashes on startup",
    "body": "When starting the application, it crashes with the following error...",
    "repo": "owner/repo"
  }
}
```

## Next Steps

- Check the [Configuration](Configuration) guide for advanced configuration options
- See [Available Tools](Available-Tools) for a comprehensive list of available tools
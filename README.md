# GitHub CLI MCP Server

<div align="center">
  <img src="./gh-cli-mcp.png" alt="GitHub CLI MCP Logo" width="100%">
  <p><em>Use GitHub CLI commands directly from Claude and other AI assistants</em></p>
</div>

This Model Context Protocol (MCP) server wraps the GitHub CLI (`gh`) tool, enabling AI assistants to interact with GitHub repositories through standardized tools.

## ✨ Features

- **Complete GitHub CLI Integration** - Access GitHub from any MCP-compatible AI assistant
- **Multi-Client Support** - Connect multiple Claude instances to a single server
- **Multiple Transport Options** - Choose between stdio, WebSocket, and TCP transports
- **Pull Request Management** - List, view, create, and close PRs
- **Issue Tracking** - Create, view, and manage issues
- **Repository Operations** - View and list repository information
- **Secure by Design** - Uses your existing GitHub CLI authentication
- **Easy Setup** - Works with npx or global installation

## 📋 Prerequisites

- [**Node.js**](https://nodejs.org/) v18 or later
- [**GitHub CLI**](https://cli.github.com/) installed and authenticated with `gh auth login`

## 🚀 Installation

### Option 1: Run with npx (No Installation Required)

```bash
# Start the MCP server directly with stdio (default)
npx gh-cli-mcp

# Start with WebSocket transport for multi-client support
npx gh-cli-mcp --transport websocket --port 3000
```

### Option 2: Global Installation

```bash
# Install globally
npm install -g gh-cli-mcp

# Run from anywhere
gh-cli-mcp
```

### Verify Installation

The server should start and display:
```
🚀 GitHub CLI MCP Server running on stdio
```

or if using WebSocket/TCP:

```
🚀 GitHub CLI MCP Server running with websocket transport
   WebSocket server at localhost:3000
```

## ⚙️ Configuration

### Transport Options

The server supports three transport types:

1. **stdio** - Default, supports one client connection
2. **websocket** - Supports multiple client connections over WebSocket
3. **tcp** - Supports multiple client connections over TCP

You can configure the transport using command line arguments or a configuration file.

#### Command Line Options

```bash
# Use WebSocket transport
npx gh-cli-mcp --transport websocket --port 3000

# Use TCP transport
npx gh-cli-mcp --transport tcp --port 3001 --host 0.0.0.0

# Customize session timeout (in milliseconds)
npx gh-cli-mcp --transport websocket --session-timeout 600000
```

#### Configuration File

Create a `gh-cli-mcp.config.json` file in your project directory:

```json
{
  "transport": {
    "type": "websocket",
    "options": {
      "port": 3000,
      "host": "localhost"
    }
  },
  "sessionTimeout": 1800000
}
```

Specify a custom config file path:

```bash
npx gh-cli-mcp --config ./my-config.json
```

### Claude Desktop / Claude Code

#### Single-client Setup (stdio)

Add the following to your `.mcp.json` file:

```json
{
  "github": {
    "type": "stdio",
    "command": "npx",
    "args": ["gh-cli-mcp"],
    "env": {}
  }
}
```

#### Multi-client Setup (WebSocket/TCP)

1. Start the server in a separate terminal:

```bash
npx gh-cli-mcp --transport websocket --port 3000
```

2. Configure each Claude instance to connect to the server:

```json
{
  "github": {
    "type": "tcp",
    "host": "localhost",
    "port": 3000
  }
}
```

### VS Code / Cursor

In your MCP configuration:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["gh-cli-mcp"],
      "env": {}
    }
  }
}
```

For multi-client setup, use the WebSocket/TCP approach described above.

## 🛠️ Available Tools

### Pull Requests

| Tool | Description | Example Usage |
|------|-------------|--------------|
| `gh_pr_list` | List pull requests | "List open pull requests" |
| `gh_pr_view` | View PR details | "Show me PR #123" |
| `gh_pr_create` | Create a new PR | "Create a PR from my current branch" |
| `gh_pr_close` | Close a PR | "Close pull request #123" |

### Issues

| Tool | Description | Example Usage |
|------|-------------|--------------|
| `gh_issue_list` | List issues | "Show open issues with label 'bug'" |
| `gh_issue_view` | View issue details | "Look at issue #45" |
| `gh_issue_create` | Create a new issue | "Create an issue about the login bug" |
| `gh_issue_close` | Close an issue | "Close issue #45" |

### Repositories

| Tool | Description | Example Usage |
|------|-------------|--------------|
| `gh_repo_view` | View repo details | "Show info about this repository" |
| `gh_repo_list` | List repositories | "List my repositories" |

### Projects

| Tool | Description | Example Usage |
|------|-------------|--------------|
| `gh_project_list` | List projects | "Show all projects in this repository" |
| `gh_project_view` | View project details | "View project #1" |
| `gh_project_create` | Create a new project | "Create a new project for Q2 planning" |
| `gh_project_edit` | Edit a project | "Update the title of project #2" |

### Workflows

| Tool | Description | Example Usage |
|------|-------------|--------------|
| `gh_workflow_list` | List workflows | "Show all workflows in this repo" |
| `gh_workflow_view` | View workflow details | "View the CI workflow" |
| `gh_workflow_run` | Run a workflow | "Trigger the deploy workflow" |
| `gh_workflow_disable` | Disable a workflow | "Disable the nightly build workflow" |
| `gh_workflow_enable` | Enable a workflow | "Enable the release workflow" |

### Releases

| Tool | Description | Example Usage |
|------|-------------|--------------|
| `gh_release_list` | List releases | "Show all releases for this repo" |
| `gh_release_view` | View release details | "View the v1.0.0 release" |
| `gh_release_create` | Create a new release | "Create a release for version 2.0" |
| `gh_release_delete` | Delete a release | "Delete the beta release" |

## 🔑 Tool Permissions

To allow Claude to use GitHub CLI tools, you need to update Claude's tool permissions. Create a `.claude/settings.local.json` file in your project directory with the GitHub CLI tools you want to enable.

### Setup Instructions:

1. Copy the example file from the repository:
   ```bash
   cp settings.local.example.json .claude/settings.local.json
   ```
   
2. If the `.claude` directory doesn't exist, create it first:
   ```bash
   mkdir -p .claude
   ```

3. Edit the permissions in `.claude/settings.local.json` to include the specific GitHub CLI tools you want to use.

Basic example with core functionality:

```json
{
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
      "mcp__github__gh_repo_list"
    ],
    "deny": []
  }
}
```

The example file `settings.local.example.json` in the repository root includes a comprehensive list of all available GitHub CLI tool permissions. This includes permissions for:

- Pull request operations
- Issue management
- Repository viewing and listing
- Authentication control
- Gist management
- Release management
- Project management
- Workflow operations
- Search capabilities
- API access
- Secret management
- Label operations
- Alias management
- Configuration settings

You can customize this file to include only the specific GitHub CLI tool permissions you need.

## 🧩 Using with Claude or Other AI Assistants

When properly configured, you can use commands like:

```
Can you list my open pull requests?
Show me the details of issue #42
Create a new issue for the login bug
```

The AI will use the appropriate GitHub CLI MCP tools to complete these tasks.

## 🔍 Troubleshooting

### Common Issues

- **Authentication errors**: Run `gh auth login` to ensure you're logged in
- **Command not found**: Ensure GitHub CLI is installed and in your PATH
- **Connection errors**: Check your internet connection and GitHub status
- **Multiple client issues**: If multiple Claude instances can't connect, ensure you're using WebSocket or TCP transport mode

### Multi-client Troubleshooting

- **Connection errors**: Verify the server is running with `--transport websocket` or `--transport tcp`
- **Port conflicts**: Try a different port if the default port is in use
- **Access issues**: If using a remote host, ensure the host and port are correctly specified
- **Timeout problems**: Adjust the session timeout with `--session-timeout` if connections are dropping

## 👨‍💻 Development

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/gh-cli-mcp.git
cd gh-cli-mcp

# Install dependencies
npm install

# Start development server with auto-reload
npm run dev
```

### Adding New GitHub CLI Commands

1. Define parameter schema in `register.ts`
2. Implement command handler in `github.ts`
3. Add the tool to `tools.ts`

### Publishing Updates

```bash
# Update version in package.json
npm run build
npm publish
```

## 📄 License

MIT

---

<div align="center">
  <p>Made with ❤️ for AI assistants and GitHub users</p>
</div>
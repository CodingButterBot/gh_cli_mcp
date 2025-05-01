# GitHub CLI MCP Server

This is a Model Context Protocol (MCP) server that wraps around the GitHub CLI (`gh`) tool, allowing AI assistants to interact with GitHub repositories through the MCP interface.

## Features

- Provides MCP-compatible API for GitHub CLI commands
- Supports pull request operations (list, view, create, close)
- Supports issue operations (list, view, create, close)
- Supports repository operations (view, list)
- Validates input parameters using Zod schemas
- Uses Node.js standard libraries for execution
- Can be installed globally or run with npx

## Prerequisites

Before using this server, you need to have the following installed:

1. [Node.js](https://nodejs.org/) (v16 or later)
2. [GitHub CLI](https://cli.github.com/) (installed and authenticated)

## Installation & Usage

### Running with npx (Recommended)

The simplest way to use this tool is with npx, which doesn't require installation:

```bash
# Start the MCP server
npx gh-cli-mcp

# Show help
npx gh-cli-mcp --help

# Show version
npx gh-cli-mcp --version
```

### Global Installation

If you prefer, you can install the tool globally:

```bash
# Install globally
npm install -g gh-cli-mcp

# Then run from anywhere
gh-cli-mcp
```

### Local Development

If you want to contribute or modify the code:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gh-cli-mcp.git
   cd gh-cli-mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

4. Run the server:
   ```bash
   npm start
   ```

5. For development with auto-rebuild:
   ```bash
   npm run dev
   ```

## Configuring with Claude or other MCP clients

This server is listed in the `.mcp.json` configuration file under the name `github`. You can use it with Claude or other MCP-compatible clients by referring to tools like:

- `mcp__github__gh_pr_list`
- `mcp__github__gh_issue_list`
- `mcp__github__gh_repo_view`

To configure the server in your own `.mcp.json` file, add:

```json
"github": {
  "type": "stdio",
  "command": "npx",
  "args": [
    "gh-cli-mcp"
  ],
  "env": {}
}
```

## Available Tools

### Pull Requests

- `gh_pr_list`: List pull requests in a repository
- `gh_pr_view`: View a pull request
- `gh_pr_create`: Create a new pull request
- `gh_pr_close`: Close a pull request

### Issues

- `gh_issue_list`: List issues in a repository
- `gh_issue_view`: View an issue
- `gh_issue_create`: Create a new issue
- `gh_issue_close`: Close an issue

### Repositories

- `gh_repo_view`: View a repository
- `gh_repo_list`: List repositories

## Development

### Project Structure

- `bin/`: Contains the built JavaScript files and CLI entry point
- `src/`: Contains the TypeScript source files
  - `index.ts`: Main implementation entry point
  - `stdio.ts`: MCP server implementation
  - `register.ts`: Tool registration and schema definitions
  - `github.ts`: GitHub CLI execution functions
  - `tools.ts`: Tool definitions
  - `types/github.ts`: TypeScript interfaces

### Adding New Tools

To add a new GitHub CLI command as a tool:

1. Define a Zod schema for the command parameters in `register.ts`
2. Create a new tool in `tools.ts` using the `Tool` class
3. Add the tool to the appropriate category or to `allTools`

### Publishing to NPM

To publish this package to npm:

1. Update version in package.json
2. Build the TypeScript code:
   ```bash
   npm run build
   ```
3. Publish to npm:
   ```bash
   npm publish
   ```

## License

MIT
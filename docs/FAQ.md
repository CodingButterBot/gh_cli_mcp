# Frequently Asked Questions

## General Questions

### What is GitHub CLI MCP?

GitHub CLI MCP is a server that wraps GitHub CLI commands, making them available to AI assistants through the Model Context Protocol (MCP). It allows AI assistants to interact with GitHub repositories programmatically.

### What is the Model Context Protocol (MCP)?

The Model Context Protocol (MCP) is a standardized interface for AI assistants to interact with external tools. It provides a way for AI assistants to call methods on external systems and receive structured responses.

### What are the system requirements?

- Node.js v18 or later
- GitHub CLI (installed and authenticated)

## Installation and Setup

### How do I install GitHub CLI MCP?

You can install GitHub CLI MCP via npm:

```bash
npm install -g gh-cli-mcp
```

See the [Installation Guide](Installation) for more details.

### I'm getting an error about GitHub CLI not being installed or authenticated. How do I fix this?

Make sure you have installed the GitHub CLI (`gh`) and that you've authenticated with GitHub:

```bash
# Install GitHub CLI (example for macOS with Homebrew)
brew install gh

# Authenticate with GitHub
gh auth login
```

Follow the prompts to complete the authentication process.

### How do I update GitHub CLI MCP to the latest version?

To update to the latest version:

```bash
npm update -g gh-cli-mcp
```

## Configuration

### Can I restrict which GitHub operations are allowed?

Yes, you can use the permissions configuration to specify which tools are allowed or denied. See the [Configuration](Configuration) page for details.

### How do I change the session timeout?

You can change the session timeout either through the configuration file or via the command-line option:

```bash
gh-cli-mcp --session-timeout 3600000
```

This sets the timeout to 1 hour (3600000 milliseconds).

## Usage

### How do I start the server?

```bash
gh-cli-mcp
```

### How can I use GitHub CLI MCP with my AI assistant?

GitHub CLI MCP can be used with any AI assistant that supports the Model Context Protocol. Configure your assistant to communicate with the GitHub CLI MCP server via stdio.

### Does GitHub CLI MCP support multiple clients?

No, GitHub CLI MCP only supports a single client using stdio transport.

### Can I use GitHub CLI MCP with a private GitHub repository?

Yes, as long as the GitHub CLI is authenticated with an account that has access to the private repository.

## Troubleshooting

### I'm getting "Command execution timed out" errors. How can I fix this?

The default timeout for command execution is 30 seconds. If you're working with large repositories or slow network connections, you may need to handle timeouts gracefully in your client application.

### How do I report bugs or request features?

You can report bugs or request features by opening an issue on the [GitHub repository](https://github.com/CodingButterBot/gh_cli_mcp/issues).

### I'm getting an error when trying to start the server. What should I check?

1. Make sure Node.js v18 or later is installed
2. Verify that GitHub CLI is installed and authenticated
3. Check that there are no other instances of GitHub CLI MCP running
4. Look for error messages in the console output

## Development

### How can I contribute to GitHub CLI MCP?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.

### Are there any plans to support additional GitHub features?

GitHub CLI MCP aims to support all features available through the GitHub CLI. If there's a specific feature you'd like to see added, please open an issue on the GitHub repository.
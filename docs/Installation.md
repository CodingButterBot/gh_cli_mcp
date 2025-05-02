# Installation Guide

GitHub CLI MCP has a few prerequisites and can be installed via npm.

## Prerequisites

1. **Node.js** (v18 or later)
2. **GitHub CLI** - Must be installed and authenticated

## GitHub CLI Installation

Before installing GitHub CLI MCP, you need to install and authenticate the GitHub CLI:

### Installing GitHub CLI

Follow the official instructions for your operating system:
https://cli.github.com/manual/installation

### Authenticating GitHub CLI

Once installed, authenticate with your GitHub account:

```bash
gh auth login
```

Follow the prompts to authenticate with GitHub.

## Installing GitHub CLI MCP

### Via npm

```bash
npm install -g gh-cli-mcp
```

### From Source

If you want to install from source:

```bash
# Clone the repository
git clone https://github.com/CodingButterBot/gh_cli_mcp.git
cd gh_cli_mcp

# Install dependencies
npm install

# Build the project
npm run build

# Optional: Create a global symlink
npm link
```

## Verifying Installation

Verify that the installation was successful:

```bash
gh-cli-mcp --version
```

You should see output showing the version number of GitHub CLI MCP.

## Next Steps

Now that you have GitHub CLI MCP installed, check the [Usage Guide](Usage) to learn how to use it.
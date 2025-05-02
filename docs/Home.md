# GitHub CLI MCP

Welcome to the GitHub CLI MCP wiki!

GitHub CLI MCP is a server that wraps GitHub CLI commands, making them available to AI assistants through the Model Context Protocol (MCP). This allows AI assistants to interact with GitHub repositories programmatically.

![GitHub CLI MCP](https://raw.githubusercontent.com/CodingButterBot/gh_cli_mcp/master/gh-cli-mcp.png)

## Quick Links

- [Installation Guide](Installation)
- [Usage Guide](Usage)
- [Configuration](Configuration)
- [Available Tools](Available-Tools)
- [FAQ](FAQ)

## Key Features

- Access GitHub functionality through standardized interfaces
- Utilizes stdio for communication (simple integration)
- Built with TypeScript for type safety
- Built on top of the official GitHub CLI
- Comprehensive set of tools for Pull Requests, Issues, Repositories, and more

## Architecture

GitHub CLI MCP wraps the official GitHub CLI (`gh`) executable, allowing for a standardized interface between AI assistants and GitHub. The server communicates with clients using the Model Context Protocol (MCP) via stdio.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
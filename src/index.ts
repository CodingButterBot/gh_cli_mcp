#!/usr/bin/env node
import { GitHubCliServer } from './stdio.js';
import { registerToolsList } from './register.js';
import { allTools } from './tools.js';
import { checkGitHubCli } from './github.js';

// Package version from package.json
const VERSION = '1.0.0';

/**
 * Display help information
 */
function showHelp() {
  console.error(`
GitHub CLI MCP Server v${VERSION}

USAGE:
  gh-cli-mcp [OPTIONS]

OPTIONS:
  -h, --help      Show this help message
  -v, --version   Show version information

DESCRIPTION:
  This tool provides a Model Context Protocol (MCP) server for GitHub CLI.
  It allows AI assistants to interact with GitHub repositories through
  standardized interfaces.

REQUIREMENTS:
  - GitHub CLI must be installed and authenticated
  - Node.js v18 or later is required

EXAMPLES:
  # Start the MCP server
  npx gh-cli-mcp

  # Show version
  npx gh-cli-mcp --version
`);
}

/**
 * Display version information
 */
function showVersion() {
  console.error(`GitHub CLI MCP Server v${VERSION}`);
}

/**
 * Process command line arguments
 */
function processArgs() {
  const args = process.argv.slice(2);
  
  if (args.includes('-h') || args.includes('--help')) {
    showHelp();
    return false;
  }
  
  if (args.includes('-v') || args.includes('--version')) {
    showVersion();
    return false;
  }
  
  return true;
}

/**
 * Main function to start the GitHub CLI MCP server
 */
async function main() {
  try {
    // Process command line arguments
    if (!processArgs()) {
      process.exit(0);
    }

    // Check if GitHub CLI is available
    const isGitHubCliAvailable = await checkGitHubCli();
    if (!isGitHubCliAvailable) {
      console.error('❌ GitHub CLI is not available or not authenticated. Please install and authenticate it first.');
      console.error('    Installation: https://cli.github.com/manual/installation');
      console.error('    Authentication: Run `gh auth login`');
      process.exit(1);
    }

    // Create the MCP server
    const server = new GitHubCliServer();
    
    // Register all tools
    registerToolsList(server, allTools);
    
    // Log registered tools
    console.error(`📋 Registered ${allTools.length} GitHub CLI tools`);
    
    // Start the server
    await server.start();
  } catch (error) {
    console.error('Error starting GitHub CLI MCP server:', error);
    process.exit(1);
  }
}

// Run the server
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
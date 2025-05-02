#!/usr/bin/env node
/**
 * GitHub CLI MCP Server - Main entry point
 * 
 * This module initializes and starts the MCP server that wraps GitHub CLI commands,
 * making them available to AI assistants through the Model Context Protocol.
 * 
 * @module index
 */

import { registerToolsList } from './register.js';
import { allTools } from './tools.js';
import { checkGitHubCli } from './github.js';
import { GitHubCliServer, TransportType } from './server.js';
import fs from 'fs';
import path from 'path';

/**
 * Current package version
 * @constant {string}
 */
const VERSION = '1.1.0';

/**
 * Default configuration file path in the current working directory
 * @constant {string}
 */
const DEFAULT_CONFIG_PATH = path.join(process.cwd(), 'gh-cli-mcp.config.json');

/**
 * Display help information to the console
 * Shows available command line options, descriptions, and usage examples
 * @function
 */
function showHelp() {
  console.error(`
GitHub CLI MCP Server v${VERSION}

USAGE:
  gh-cli-mcp [OPTIONS]

OPTIONS:
  -h, --help                 Show this help message
  -v, --version              Show version information
  -c, --config <path>        Path to configuration file
  -t, --transport <type>     Transport type (stdio, websocket, tcp)
  -p, --port <port>          Port for websocket/tcp transport
  --host <host>              Host for websocket/tcp transport
  --session-timeout <ms>     Session timeout in milliseconds

DESCRIPTION:
  This tool provides a Model Context Protocol (MCP) server for GitHub CLI.
  It allows AI assistants to interact with GitHub repositories through
  standardized interfaces.

REQUIREMENTS:
  - GitHub CLI must be installed and authenticated
  - Node.js v18 or later is required

EXAMPLES:
  # Start the MCP server with stdio transport (default)
  npx gh-cli-mcp

  # Start the MCP server with WebSocket transport
  npx gh-cli-mcp --transport websocket --port 3000

  # Start the MCP server with TCP transport
  npx gh-cli-mcp --transport tcp --port 3001

  # Use a configuration file
  npx gh-cli-mcp --config ./my-config.json

  # Show version
  npx gh-cli-mcp --version
`);
}

/**
 * Display version information to the console
 * Used when --version flag is specified
 * @function
 */
function showVersion() {
  console.error(`GitHub CLI MCP Server v${VERSION}`);
}

/**
 * Process command line arguments and configuration file
 * Parses all command line flags and merges them with configuration from file
 * @returns {object|boolean} Parsed configuration object or false if the program should exit
 * @function
 */
function processArgs() {
  const args = process.argv.slice(2);
  let configPath = DEFAULT_CONFIG_PATH;
  const config: any = {
    transport: {
      type: TransportType.STDIO,
      options: {}
    }
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '-h' || arg === '--help') {
      showHelp();
      return false;
    }
    
    if (arg === '-v' || arg === '--version') {
      showVersion();
      return false;
    }
    
    if ((arg === '-c' || arg === '--config') && i + 1 < args.length) {
      configPath = args[++i];
    }
    
    if ((arg === '-t' || arg === '--transport') && i + 1 < args.length) {
      const transport = args[++i].toLowerCase();
      if (transport === 'stdio' || transport === 'websocket' || transport === 'tcp') {
        config.transport.type = transport;
      } else {
        console.error(`Error: Invalid transport type: ${transport}`);
        console.error('Valid types are: stdio, websocket, tcp');
        return false;
      }
    }
    
    if ((arg === '-p' || arg === '--port') && i + 1 < args.length) {
      const port = parseInt(args[++i], 10);
      if (isNaN(port) || port < 0 || port > 65535) {
        console.error(`Error: Invalid port number: ${args[i]}`);
        return false;
      }
      config.transport.options.port = port;
    }
    
    if (arg === '--host' && i + 1 < args.length) {
      config.transport.options.host = args[++i];
    }
    
    if (arg === '--session-timeout' && i + 1 < args.length) {
      const timeout = parseInt(args[++i], 10);
      if (isNaN(timeout) || timeout < 0) {
        console.error(`Error: Invalid session timeout: ${args[i]}`);
        return false;
      }
      config.sessionTimeout = timeout;
    }
  }
  
  // Try to load config file if it exists
  try {
    if (fs.existsSync(configPath)) {
      const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      
      // Merge file config with command line config (command line takes precedence)
      config.transport.type = config.transport.type || fileConfig.transport?.type;
      config.transport.options = {
        ...fileConfig.transport?.options,
        ...config.transport.options
      };
      
      if (!config.sessionTimeout && fileConfig.sessionTimeout) {
        config.sessionTimeout = fileConfig.sessionTimeout;
      }
    }
  } catch (error) {
    console.error(`Warning: Failed to load config file: ${configPath}`);
    console.error(error);
  }
  
  return config;
}

/**
 * Main function to start the GitHub CLI MCP server
 * Initializes configuration, checks prerequisites, and starts the server
 * @returns {Promise<void>} Resolves when server starts successfully
 * @throws Will throw an error if server initialization fails
 * @function
 */
async function main() {
  try {
    // Process command line arguments
    const config = processArgs();
    if (!config) {
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

    // Create the MCP server with the specified configuration
    const server = new GitHubCliServer(config);
    
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
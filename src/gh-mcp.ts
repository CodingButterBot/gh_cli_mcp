#!/usr/bin/env node
/**
 * GitHub CLI MCP Server - CLI Entry Point
 * 
 * This file serves as the entry point for the CLI application, starting
 * the MCP server for GitHub CLI commands.
 * 
 * @module gh-mcp
 */

import { main } from './index.js';

// Call the main function from index.js to start the server
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
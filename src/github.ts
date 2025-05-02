import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Command execution timeout in milliseconds (30 seconds)
const COMMAND_TIMEOUT = 30000;

// Store active command
let activeCommand: AbortController | null = null;

/**
 * Convert parameters object to GitHub CLI command arguments
 * @param params Parameters to convert to CLI arguments
 * @returns Array of CLI arguments
 */
export function paramsToArgs(params: Record<string, unknown>): string[] {
  const args: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    // Skip repo parameter as it's handled separately
    if (key === 'repo') continue;

    // Handle different parameter types
    if (value === true) {
      // Boolean flags (e.g., --draft)
      args.push(`--${key}`);
    } else if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        // Handle arrays (e.g., --reviewer user1 --reviewer user2)
        value.forEach(item => {
          args.push(`--${key}`, String(item));
        });
      } else {
        // Regular parameters (e.g., --title "My Title")
        args.push(`--${key}`, String(value));
      }
    }
  }

  return args;
}

/**
 * Execute a GitHub CLI command with timeout
 * @param command Primary command (e.g., 'pr', 'issue')
 * @param subcommand Subcommand (e.g., 'list', 'view')
 * @param params Parameters for the command
 * @param sessionId Optional session ID for multi-client support
 * @returns Command output as structured content
 */
export async function execGitHubCommand(
  command: string,
  subcommand: string,
  params: Record<string, unknown>,
  sessionId?: string
): Promise<{
  content: Array<{ type: string; text: string }>;
}> {
  // Create an AbortController for timeout management
  const controller = new AbortController();
  const { signal } = controller;
  
  // Clean up any existing command
  if (activeCommand) {
    try {
      activeCommand.abort();
    } catch (e) {
      // Ignore errors when aborting
    }
  }
  
  // Store the new controller
  activeCommand = controller;
  
  // Set timeout to cancel the command if it takes too long
  const timeoutId = setTimeout(() => {
    controller.abort();
    // Clean up the active command
    activeCommand = null;
  }, COMMAND_TIMEOUT);
  
  try {
    // Build the GitHub CLI command
    const args = paramsToArgs(params);
    const repoArg = params.repo ? ['-R', String(params.repo)] : [];
    
    // Combine all parts into a single command
    const fullCommand = ['gh', command, subcommand, ...repoArg, ...args].join(' ');
    
    // Execute the command with signal for timeout management
    console.error(`Executing: ${fullCommand}${sessionId ? ` (Session: ${sessionId})` : ''}`);
    const { stdout, stderr } = await execAsync(fullCommand, { signal });
    
    // Handle output
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return {
        content: [
          { type: 'text', text: 'Error executing GitHub CLI command:' },
          { type: 'text', text: stderr }
        ]
      };
    }
    
    return {
      content: [
        { type: 'text', text: stdout }
      ]
    };
  } catch (error) {
    console.error('Error executing GitHub CLI command:', error);
    
    // Check if the error was caused by timeout
    if ((error as Error).name === 'AbortError') {
      return {
        content: [
          { type: 'text', text: 'Error executing GitHub CLI command:' },
          { type: 'text', text: 'Command execution timed out after 30 seconds' }
        ]
      };
    }
    
    // Handle other error response
    const err = error as Error & { stderr?: string };
    const errorMessage = err.stderr || err.message || 'Unknown error';
    
    return {
      content: [
        { type: 'text', text: 'Error executing GitHub CLI command:' },
        { type: 'text', text: errorMessage }
      ]
    };
  } finally {
    // Always clear the timeout
    clearTimeout(timeoutId);
    
    // Clean up the active command
    activeCommand = null;
  }
}

/**
 * Check if GitHub CLI is installed and authenticated
 * @returns True if GitHub CLI is available and authenticated
 */
export async function checkGitHubCli(): Promise<boolean> {
  try {
    const { stdout } = await execAsync('gh --version');
    console.error('GitHub CLI version:', stdout.trim());
    
    // Check authentication status
    const { stdout: authStatus } = await execAsync('gh auth status');
    console.error('GitHub CLI auth status:', authStatus.trim());
    
    return true;
  } catch (error) {
    console.error('GitHub CLI not available:', error);
    return false;
  }
}

/**
 * Cancel the active command
 */
export function cancelActiveCommand(): void {
  if (activeCommand) {
    try {
      activeCommand.abort();
    } catch (e) {
      // Ignore errors when aborting
    }
    activeCommand = null;
  }
}// Test comment for PR

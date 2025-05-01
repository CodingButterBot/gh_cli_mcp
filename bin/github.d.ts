/**
 * Convert parameters object to GitHub CLI command arguments
 * @param params Parameters to convert to CLI arguments
 * @returns Array of CLI arguments
 */
export declare function paramsToArgs(params: Record<string, unknown>): string[];
/**
 * Execute a GitHub CLI command with timeout
 * @param command Primary command (e.g., 'pr', 'issue')
 * @param subcommand Subcommand (e.g., 'list', 'view')
 * @param params Parameters for the command
 * @param sessionId Optional session ID for multi-client support
 * @returns Command output as structured content
 */
export declare function execGitHubCommand(command: string, subcommand: string, params: Record<string, unknown>, sessionId?: string): Promise<{
    content: Array<{
        type: string;
        text: string;
    }>;
}>;
/**
 * Check if GitHub CLI is installed and authenticated
 * @returns True if GitHub CLI is available and authenticated
 */
export declare function checkGitHubCli(): Promise<boolean>;
/**
 * Cancel all active commands for a session
 * @param sessionId The session ID
 */
export declare function cancelCommandsForSession(sessionId: string): void;
//# sourceMappingURL=github.d.ts.map
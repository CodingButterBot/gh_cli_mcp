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
 * @returns Command output as structured content
 */
export declare function execGitHubCommand(command: string, subcommand: string, params: Record<string, unknown>): Promise<{
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
//# sourceMappingURL=github.d.ts.map
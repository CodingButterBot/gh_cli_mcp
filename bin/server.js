import { McpServer as BaseMcpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Tool } from './stdio.js';
import { SessionManager } from './session/manager.js';
import { WebSocketServerTransport } from './transport/websocket.js';
import { TCPServerTransport } from './transport/tcp.js';
/**
 * Transport types supported by the server
 */
export var TransportType;
(function (TransportType) {
    TransportType["STDIO"] = "stdio";
    TransportType["WEBSOCKET"] = "websocket";
    TransportType["TCP"] = "tcp";
})(TransportType || (TransportType = {}));
/**
 * Default server configuration
 */
const DEFAULT_CONFIG = {
    name: 'GitHub CLI MCP Server',
    version: '1.1.0',
    description: 'GitHub CLI commands via Model Context Protocol',
    homepage: 'https://github.com/codingbutter/gh-cli-mcp',
    license: 'MIT',
    transport: {
        type: TransportType.STDIO
    },
    sessionTimeout: 30 * 60 * 1000 // 30 minutes
};
/**
 * MCP Server for GitHub CLI tools with multi-client support
 */
export class GitHubCliServer extends BaseMcpServer {
    toolsList = [];
    config;
    sessionManager;
    transport = null;
    transportEmitter = null;
    /**
     * Create a new GitHub CLI MCP server
     * @param config Server configuration
     */
    constructor(config = {}) {
        // Merge with default config
        const mergedConfig = {
            ...DEFAULT_CONFIG,
            ...config,
            transport: {
                ...DEFAULT_CONFIG.transport,
                ...config.transport
            }
        };
        super(mergedConfig);
        this.config = mergedConfig;
        // Create session manager
        this.sessionManager = new SessionManager(mergedConfig.sessionTimeout);
        console.error(`[Server] Created with transport: ${mergedConfig.transport.type}`);
    }
    /**
     * Add a tool with the given name, schema, handler, and options
     */
    addTool(name, schema, handler, options) {
        const wrappedHandler = async (params, sessionId) => {
            // Touch the session if it exists
            if (sessionId) {
                this.sessionManager.touchSession(sessionId);
            }
            // Call the original handler
            return await handler(params, sessionId);
        };
        const tool = new Tool(name, schema, wrappedHandler, options);
        this.toolsList.push(tool);
        // Register with MCP server
        const [toolName, toolSchema, toolHandler, toolOptions] = tool.definition();
        super.tool(toolName, JSON.stringify(toolOptions), toolSchema?._def?.shape || toolSchema, toolHandler);
        return this;
    }
    /**
     * Register multiple tools
     */
    tools(toolsList) {
        for (const tool of toolsList) {
            const [name, schema, handler, options] = tool.definition();
            this.addTool(name, schema, handler, options);
        }
    }
    /**
     * Create a transport based on configuration
     */
    createTransport() {
        const { type, options } = this.config.transport;
        switch (type) {
            case TransportType.WEBSOCKET:
                return new WebSocketServerTransport(options?.port || 3000, options?.host || 'localhost', this.config.sessionTimeout);
            case TransportType.TCP:
                return new TCPServerTransport(options?.port || 3000, options?.host || 'localhost', this.config.sessionTimeout);
            case TransportType.STDIO:
            default:
                return new StdioServerTransport();
        }
    }
    /**
     * Start the server with the configured transport
     */
    async start() {
        // Create the transport
        this.transport = this.createTransport();
        // Connect to the transport
        await this.connect(this.transport);
        // Get the message emitter to track session IDs
        this.transportEmitter = this.transport.getMessageEmitter();
        // Support session tracking for multi-client transports
        if (this.transport instanceof WebSocketServerTransport ||
            this.transport instanceof TCPServerTransport) {
            // Listen for client events with session information
            this.transportEmitter?.on('message', ({ text, sessionId }) => {
                if (sessionId && !this.sessionManager.getSession(sessionId)) {
                    // Create a new session for this client if it doesn't exist
                    this.sessionManager.createSession(sessionId);
                }
            });
            console.error(`🚀 GitHub CLI MCP Server running with ${this.config.transport.type} transport`);
            if (this.config.transport.type === TransportType.WEBSOCKET) {
                console.error(`   WebSocket server at ${this.config.transport.options?.host || 'localhost'}:${this.config.transport.options?.port || 3000}`);
            }
            else if (this.config.transport.type === TransportType.TCP) {
                console.error(`   TCP server at ${this.config.transport.options?.host || 'localhost'}:${this.config.transport.options?.port || 3000}`);
            }
        }
        else {
            console.error('🚀 GitHub CLI MCP Server running on stdio');
        }
        // Return a close function that uses the transport's close method
        return {
            close: () => {
                if (this.transport) {
                    this.transport.close();
                    this.transport = null;
                }
                this.sessionManager.stop();
                console.error('MCP server closed');
            }
        };
    }
}
//# sourceMappingURL=server.js.map
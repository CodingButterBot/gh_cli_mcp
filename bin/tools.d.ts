import { z } from 'zod';
import { Tool } from './stdio.js';
/**
 * Pull Request Tools
 */
export declare const prTools: {
    list: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        state: z.ZodOptional<z.ZodEnum<["open", "closed", "merged", "all"]>>;
        assignee: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        limit: z.ZodOptional<z.ZodNumber>;
        search: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        repo?: string | undefined;
        state?: "open" | "closed" | "merged" | "all" | undefined;
        assignee?: string | undefined;
        author?: string | undefined;
        label?: string | string[] | undefined;
        limit?: number | undefined;
        search?: string | undefined;
    }, {
        repo?: string | undefined;
        state?: "open" | "closed" | "merged" | "all" | undefined;
        assignee?: string | undefined;
        author?: string | undefined;
        label?: string | string[] | undefined;
        limit?: number | undefined;
        search?: string | undefined;
    }>>;
    view: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        number: z.ZodNumber;
        web: z.ZodOptional<z.ZodBoolean>;
        comments: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        number: number;
        repo?: string | undefined;
        web?: boolean | undefined;
        comments?: boolean | undefined;
    }, {
        number: number;
        repo?: string | undefined;
        web?: boolean | undefined;
        comments?: boolean | undefined;
    }>>;
    create: Tool<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        body: z.ZodOptional<z.ZodString>;
        body_file: z.ZodOptional<z.ZodString>;
        web: z.ZodOptional<z.ZodBoolean>;
    } & {
        repo: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodEnum<["open", "closed", "merged", "all"]>>;
        assignee: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        limit: z.ZodOptional<z.ZodNumber>;
        search: z.ZodOptional<z.ZodString>;
    } & {
        base: z.ZodOptional<z.ZodString>;
        head: z.ZodOptional<z.ZodString>;
        draft: z.ZodOptional<z.ZodBoolean>;
        reviewer: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        repo?: string | undefined;
        title?: string | undefined;
        body?: string | undefined;
        body_file?: string | undefined;
        web?: boolean | undefined;
        state?: "open" | "closed" | "merged" | "all" | undefined;
        assignee?: string | undefined;
        author?: string | undefined;
        label?: string | string[] | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        base?: string | undefined;
        head?: string | undefined;
        draft?: boolean | undefined;
        reviewer?: string | string[] | undefined;
    }, {
        repo?: string | undefined;
        title?: string | undefined;
        body?: string | undefined;
        body_file?: string | undefined;
        web?: boolean | undefined;
        state?: "open" | "closed" | "merged" | "all" | undefined;
        assignee?: string | undefined;
        author?: string | undefined;
        label?: string | string[] | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        base?: string | undefined;
        head?: string | undefined;
        draft?: boolean | undefined;
        reviewer?: string | string[] | undefined;
    }>>;
    close: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        number: z.ZodNumber;
        comment: z.ZodOptional<z.ZodString>;
        delete_branch: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        number: number;
        repo?: string | undefined;
        comment?: string | undefined;
        delete_branch?: boolean | undefined;
    }, {
        number: number;
        repo?: string | undefined;
        comment?: string | undefined;
        delete_branch?: boolean | undefined;
    }>>;
};
/**
 * Issue Tools
 */
export declare const issueTools: {
    list: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        state: z.ZodOptional<z.ZodEnum<["open", "closed", "merged", "all"]>>;
        assignee: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        limit: z.ZodOptional<z.ZodNumber>;
        search: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        repo?: string | undefined;
        state?: "open" | "closed" | "merged" | "all" | undefined;
        assignee?: string | undefined;
        author?: string | undefined;
        label?: string | string[] | undefined;
        limit?: number | undefined;
        search?: string | undefined;
    }, {
        repo?: string | undefined;
        state?: "open" | "closed" | "merged" | "all" | undefined;
        assignee?: string | undefined;
        author?: string | undefined;
        label?: string | string[] | undefined;
        limit?: number | undefined;
        search?: string | undefined;
    }>>;
    view: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        number: z.ZodNumber;
        web: z.ZodOptional<z.ZodBoolean>;
        comments: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        number: number;
        repo?: string | undefined;
        web?: boolean | undefined;
        comments?: boolean | undefined;
    }, {
        number: number;
        repo?: string | undefined;
        web?: boolean | undefined;
        comments?: boolean | undefined;
    }>>;
    create: Tool<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        body: z.ZodOptional<z.ZodString>;
        body_file: z.ZodOptional<z.ZodString>;
        web: z.ZodOptional<z.ZodBoolean>;
    } & {
        repo: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodEnum<["open", "closed", "merged", "all"]>>;
        assignee: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        limit: z.ZodOptional<z.ZodNumber>;
        search: z.ZodOptional<z.ZodString>;
    } & {
        milestone: z.ZodOptional<z.ZodString>;
        project: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        repo?: string | undefined;
        title?: string | undefined;
        body?: string | undefined;
        body_file?: string | undefined;
        web?: boolean | undefined;
        state?: "open" | "closed" | "merged" | "all" | undefined;
        assignee?: string | undefined;
        author?: string | undefined;
        label?: string | string[] | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        milestone?: string | undefined;
        project?: string | undefined;
    }, {
        repo?: string | undefined;
        title?: string | undefined;
        body?: string | undefined;
        body_file?: string | undefined;
        web?: boolean | undefined;
        state?: "open" | "closed" | "merged" | "all" | undefined;
        assignee?: string | undefined;
        author?: string | undefined;
        label?: string | string[] | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        milestone?: string | undefined;
        project?: string | undefined;
    }>>;
    close: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        number: z.ZodNumber;
        comment: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        number: number;
        repo?: string | undefined;
        comment?: string | undefined;
    }, {
        number: number;
        repo?: string | undefined;
        comment?: string | undefined;
    }>>;
};
/**
 * Repository Tools
 */
export declare const repoTools: {
    view: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        web: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        repo?: string | undefined;
        web?: boolean | undefined;
    }, {
        repo?: string | undefined;
        web?: boolean | undefined;
    }>>;
    list: Tool<z.ZodObject<{
        limit: z.ZodOptional<z.ZodNumber>;
        owner: z.ZodOptional<z.ZodString>;
        language: z.ZodOptional<z.ZodString>;
        visibility: z.ZodOptional<z.ZodEnum<["public", "private"]>>;
    }, "strip", z.ZodTypeAny, {
        limit?: number | undefined;
        owner?: string | undefined;
        language?: string | undefined;
        visibility?: "public" | "private" | undefined;
    }, {
        limit?: number | undefined;
        owner?: string | undefined;
        language?: string | undefined;
        visibility?: "public" | "private" | undefined;
    }>>;
};
/**
 * Project Tools
 */
export declare const projectTools: {
    view: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        number: z.ZodNumber;
        web: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        number: number;
        repo?: string | undefined;
        web?: boolean | undefined;
    }, {
        number: number;
        repo?: string | undefined;
        web?: boolean | undefined;
    }>>;
    list: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        limit: z.ZodOptional<z.ZodNumber>;
        format: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        repo?: string | undefined;
        limit?: number | undefined;
        format?: string | undefined;
    }, {
        repo?: string | undefined;
        limit?: number | undefined;
        format?: string | undefined;
    }>>;
    create: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        title: z.ZodString;
        body: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        repo?: string | undefined;
        body?: string | undefined;
    }, {
        title: string;
        repo?: string | undefined;
        body?: string | undefined;
    }>>;
    edit: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        number: z.ZodNumber;
        title: z.ZodOptional<z.ZodString>;
        body: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        number: number;
        repo?: string | undefined;
        title?: string | undefined;
        body?: string | undefined;
    }, {
        number: number;
        repo?: string | undefined;
        title?: string | undefined;
        body?: string | undefined;
    }>>;
};
/**
 * Workflow Tools
 */
export declare const workflowTools: {
    list: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        all: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        repo?: string | undefined;
        all?: boolean | undefined;
    }, {
        repo?: string | undefined;
        all?: boolean | undefined;
    }>>;
    view: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        name: z.ZodString;
        yaml: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        repo?: string | undefined;
        yaml?: boolean | undefined;
    }, {
        name: string;
        repo?: string | undefined;
        yaml?: boolean | undefined;
    }>>;
    run: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        name: z.ZodString;
        ref: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        repo?: string | undefined;
        ref?: string | undefined;
    }, {
        name: string;
        repo?: string | undefined;
        ref?: string | undefined;
    }>>;
    disable: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        repo?: string | undefined;
    }, {
        name: string;
        repo?: string | undefined;
    }>>;
    enable: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        repo?: string | undefined;
    }, {
        name: string;
        repo?: string | undefined;
    }>>;
};
/**
 * Release Tools
 */
export declare const releaseTools: {
    list: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        limit: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        repo?: string | undefined;
        limit?: number | undefined;
    }, {
        repo?: string | undefined;
        limit?: number | undefined;
    }>>;
    view: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        tag: z.ZodOptional<z.ZodString>;
        web: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        repo?: string | undefined;
        web?: boolean | undefined;
        tag?: string | undefined;
    }, {
        repo?: string | undefined;
        web?: boolean | undefined;
        tag?: string | undefined;
    }>>;
    create: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        tag: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
        draft: z.ZodOptional<z.ZodBoolean>;
        prerelease: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        repo?: string | undefined;
        title?: string | undefined;
        draft?: boolean | undefined;
        notes?: string | undefined;
        prerelease?: boolean | undefined;
    }, {
        tag: string;
        repo?: string | undefined;
        title?: string | undefined;
        draft?: boolean | undefined;
        notes?: string | undefined;
        prerelease?: boolean | undefined;
    }>>;
    delete: Tool<z.ZodObject<{
        repo: z.ZodOptional<z.ZodString>;
    } & {
        tag: z.ZodString;
        yes: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        repo?: string | undefined;
        yes?: boolean | undefined;
    }, {
        tag: string;
        repo?: string | undefined;
        yes?: boolean | undefined;
    }>>;
};
/**
 * All GitHub CLI tools
 */
export declare const allTools: (Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    state: z.ZodOptional<z.ZodEnum<["open", "closed", "merged", "all"]>>;
    assignee: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    limit: z.ZodOptional<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
    state?: "open" | "closed" | "merged" | "all" | undefined;
    assignee?: string | undefined;
    author?: string | undefined;
    label?: string | string[] | undefined;
    limit?: number | undefined;
    search?: string | undefined;
}, {
    repo?: string | undefined;
    state?: "open" | "closed" | "merged" | "all" | undefined;
    assignee?: string | undefined;
    author?: string | undefined;
    label?: string | string[] | undefined;
    limit?: number | undefined;
    search?: string | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    number: z.ZodNumber;
    web: z.ZodOptional<z.ZodBoolean>;
    comments: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    number: number;
    repo?: string | undefined;
    web?: boolean | undefined;
    comments?: boolean | undefined;
}, {
    number: number;
    repo?: string | undefined;
    web?: boolean | undefined;
    comments?: boolean | undefined;
}>> | Tool<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    body_file: z.ZodOptional<z.ZodString>;
    web: z.ZodOptional<z.ZodBoolean>;
} & {
    repo: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodEnum<["open", "closed", "merged", "all"]>>;
    assignee: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    limit: z.ZodOptional<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
} & {
    base: z.ZodOptional<z.ZodString>;
    head: z.ZodOptional<z.ZodString>;
    draft: z.ZodOptional<z.ZodBoolean>;
    reviewer: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
    body_file?: string | undefined;
    web?: boolean | undefined;
    state?: "open" | "closed" | "merged" | "all" | undefined;
    assignee?: string | undefined;
    author?: string | undefined;
    label?: string | string[] | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    base?: string | undefined;
    head?: string | undefined;
    draft?: boolean | undefined;
    reviewer?: string | string[] | undefined;
}, {
    repo?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
    body_file?: string | undefined;
    web?: boolean | undefined;
    state?: "open" | "closed" | "merged" | "all" | undefined;
    assignee?: string | undefined;
    author?: string | undefined;
    label?: string | string[] | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    base?: string | undefined;
    head?: string | undefined;
    draft?: boolean | undefined;
    reviewer?: string | string[] | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    number: z.ZodNumber;
    comment: z.ZodOptional<z.ZodString>;
    delete_branch: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    number: number;
    repo?: string | undefined;
    comment?: string | undefined;
    delete_branch?: boolean | undefined;
}, {
    number: number;
    repo?: string | undefined;
    comment?: string | undefined;
    delete_branch?: boolean | undefined;
}>> | Tool<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    body_file: z.ZodOptional<z.ZodString>;
    web: z.ZodOptional<z.ZodBoolean>;
} & {
    repo: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodEnum<["open", "closed", "merged", "all"]>>;
    assignee: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    limit: z.ZodOptional<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
} & {
    milestone: z.ZodOptional<z.ZodString>;
    project: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
    body_file?: string | undefined;
    web?: boolean | undefined;
    state?: "open" | "closed" | "merged" | "all" | undefined;
    assignee?: string | undefined;
    author?: string | undefined;
    label?: string | string[] | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    milestone?: string | undefined;
    project?: string | undefined;
}, {
    repo?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
    body_file?: string | undefined;
    web?: boolean | undefined;
    state?: "open" | "closed" | "merged" | "all" | undefined;
    assignee?: string | undefined;
    author?: string | undefined;
    label?: string | string[] | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    milestone?: string | undefined;
    project?: string | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    number: z.ZodNumber;
    comment: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    number: number;
    repo?: string | undefined;
    comment?: string | undefined;
}, {
    number: number;
    repo?: string | undefined;
    comment?: string | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    web: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
    web?: boolean | undefined;
}, {
    repo?: string | undefined;
    web?: boolean | undefined;
}>> | Tool<z.ZodObject<{
    limit: z.ZodOptional<z.ZodNumber>;
    owner: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    visibility: z.ZodOptional<z.ZodEnum<["public", "private"]>>;
}, "strip", z.ZodTypeAny, {
    limit?: number | undefined;
    owner?: string | undefined;
    language?: string | undefined;
    visibility?: "public" | "private" | undefined;
}, {
    limit?: number | undefined;
    owner?: string | undefined;
    language?: string | undefined;
    visibility?: "public" | "private" | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    number: z.ZodNumber;
    web: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    number: number;
    repo?: string | undefined;
    web?: boolean | undefined;
}, {
    number: number;
    repo?: string | undefined;
    web?: boolean | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    limit: z.ZodOptional<z.ZodNumber>;
    format: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
    limit?: number | undefined;
    format?: string | undefined;
}, {
    repo?: string | undefined;
    limit?: number | undefined;
    format?: string | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    title: z.ZodString;
    body: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    repo?: string | undefined;
    body?: string | undefined;
}, {
    title: string;
    repo?: string | undefined;
    body?: string | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    number: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    number: number;
    repo?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
}, {
    number: number;
    repo?: string | undefined;
    title?: string | undefined;
    body?: string | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    all: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
    all?: boolean | undefined;
}, {
    repo?: string | undefined;
    all?: boolean | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    name: z.ZodString;
    yaml: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    repo?: string | undefined;
    yaml?: boolean | undefined;
}, {
    name: string;
    repo?: string | undefined;
    yaml?: boolean | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    name: z.ZodString;
    ref: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    repo?: string | undefined;
    ref?: string | undefined;
}, {
    name: string;
    repo?: string | undefined;
    ref?: string | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    repo?: string | undefined;
}, {
    name: string;
    repo?: string | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
    limit?: number | undefined;
}, {
    repo?: string | undefined;
    limit?: number | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    tag: z.ZodOptional<z.ZodString>;
    web: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    repo?: string | undefined;
    web?: boolean | undefined;
    tag?: string | undefined;
}, {
    repo?: string | undefined;
    web?: boolean | undefined;
    tag?: string | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    tag: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    draft: z.ZodOptional<z.ZodBoolean>;
    prerelease: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    tag: string;
    repo?: string | undefined;
    title?: string | undefined;
    draft?: boolean | undefined;
    notes?: string | undefined;
    prerelease?: boolean | undefined;
}, {
    tag: string;
    repo?: string | undefined;
    title?: string | undefined;
    draft?: boolean | undefined;
    notes?: string | undefined;
    prerelease?: boolean | undefined;
}>> | Tool<z.ZodObject<{
    repo: z.ZodOptional<z.ZodString>;
} & {
    tag: z.ZodString;
    yes: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    tag: string;
    repo?: string | undefined;
    yes?: boolean | undefined;
}, {
    tag: string;
    repo?: string | undefined;
    yes?: boolean | undefined;
}>>)[];
//# sourceMappingURL=tools.d.ts.map
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
}>>)[];
//# sourceMappingURL=tools.d.ts.map
<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import FileTree from "$lib/components/file_tree.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Schema" {prefix}>
    <Title text="Schema" />
    <span>
        You can generate Go code from Sql code using
        <a target="_blank" href="https://sqlc.dev/">Sqlc</a> through
    </span>
    <InlineCode source="frizzante generate schema" />
    <span>.</span>
    <br />
    <br />
    <Title text="Requirements" />
    <span>You will need a</span>
    <InlineCode source="sqlc.yaml" />
    <span>file.</span>
    <Code
        lang="yaml"
        source={`
            version: "2"
            sql:
            - engine: "sqlite"
                queries: "queries.sql"
                schema: "schema.sql"
                gen:
                go:
                    package: "schema"
                    out: "lib/schema"
                    emit_json_tags: true
                    json_tags_case_style: camel
        `}
    />
    <span>The above configuration indicates a</span>
    <InlineCode source="schema.sql" />
    <span>file, which will contain your database schema and a</span>
    <InlineCode source="queries.sql" />
    <span>file, which will contain your sql queries.</span>
    <Note>
        <span>For more details, see the official</span>
        <a target="_blank" href="https://docs.sqlc.dev/en/latest/tutorials/getting-started-sqlite.html">
            <span>Sqlc documentation for Sqlite</span>
        </a>
        <span>.</span>
    </Note>
    <br />
    <br />
    <Title text="Define Schema" />
    <span>Define your schema in</span>
    <InlineCode source="schema.sql" />
    <span>.</span>
    <Code
        lang="sql"
        source={`
            create table if not exists sessions(
                id varchar(36) primary key,
                created_at datetime not null,
                updated_at datetime not null
            );
        `}
    />
    <br />
    <br />
    <Title text="Define Queries" />
    <span>Define your queries in</span>
    <InlineCode source="queries.sql" />
    <span>.</span>
    <Code
        lang="sql"
        source={`
            -- name: FindSessionById :one
            select * from sessions where id = :id;
        `}
    />
    <br />
    <br />
    <Title text="Generate Go Code" />
    <span>Run</span>
    <InlineCode source="frizzante generate schema" />
    <span>to generate your Go code.</span>
    <br />
    <span>This will create a new</span>
    <InlineCode source="lib/schema" />
    <span>package which contains all your types and functions.</span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory name="lib" expanded>
                <Directory name="schema" expanded>
                    <File name="db.go" />
                    <File name="models.go" />
                    <File name="queries.sql.go" />
                </Directory>
            </Directory>
        {/snippet}
    </FileTree>
    <br />
    <br />
    <Title text="Invoke Queries" />
    <span>You can invoke your queries by creating a new schema object.</span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "context"
                "main/lib/databases"
                "main/lib/schema"
            )

            var database, databaseError = databases.Connect()
            var queries = schema.New(database)
            var session, _ = queries.FindSessionById(context.Background(), "some-session-id")
        `}
    />
    <Note>
        <span>The resulting</span>
        <InlineCode source="session" />
        <span>is of type</span>
        <InlineCode source="schema.Session" />
        <span>, a type that is automatically generated in</span>
        <InlineCode source="lib/schema" />
        <span>.</span>
    </Note>
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Schema" },
                { shift: 0, text: "Requirements" },
                { shift: 0, text: "Define Schema" },
                { shift: 0, text: "Define Queries" },
                { shift: 0, text: "Generate Go Code" },
                { shift: 0, text: "Invoke Queries" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Cli", href: base("/cli", { prefix }) }}
            next={{ label: "Migrate", href: base("/migrate", { prefix }) }}
        />
    {/snippet}
</Page>

<script lang="ts">
    import frizzanteGenerateMigrationPng from "$lib/assets/frizzante-generate-migration.png"
    import Code from "$lib/components/code.svelte"
    import FileTree from "$lib/components/file_tree.svelte"
    import Footer from "$lib/components/footer.svelte"
    import Image from "$lib/components/image.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Migrate" {prefix}>
    <Title text="Migrate" />
    <span>
        Frizzante comes with a default sqlite database setup which you can initialize and migrate through Go and Sql
        code.
    </span>
    <br />
    <br />
    <Title text="Create Migration Files" />
    <span>Migration files usually live under</span>
    <InlineCode source="lib/core/databases/migrations" />
    <span>.</span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory name="lib" expanded>
                <Directory name="core" expanded>
                    <Directory name="databases" expanded>
                        <Directory name="migrations" expanded>
                            <File name="2025_00_01T09_16_00+02_00.sql" />
                            <File name="2026_07_13T09_19_16+02_00.sql" />
                        </Directory>
                    </Directory>
                </Directory>
            </Directory>
        {/snippet}
    </FileTree>
    <br />
    <span>You can either create these files manually, or use</span>
    <InlineCode source="frizzante generate migration" />
    <span>which will create a migration file using the local date, time and timezone.</span>
    <br />
    <br />
    <Image src={frizzanteGenerateMigrationPng} />
    <br />
    <br />
    <span>Each migration file has a</span>
    <InlineCode source="-- migrate: up" />
    <span>and a</span>
    <InlineCode source="-- migrate: down" />
    <span>sections, which are executed respectively when when a migration runs forwards and backwards.</span>
    <br />
    <Code
        lang="sql"
        source={`
            -- migration: down
            drop table if exists sessions;
            drop table if exists todos;

            -- migration: up
            create table if not exists sessions(
            id varchar(36) primary key,
            created_at datetime not null,
            updated_at datetime not null,
            roles varchar(256) not null default 'user',
            user_id varchar(256) not null default 'guest',
            error text not null default ''
            );
            create table if not exists todos(
                id varchar(36) primary key,
                session_id varchar(36) not null,
                description varchar(256) not null default '',
                checked int not null default 0,
                foreign key (session_id) references sessions(id)
            );
        `}
    />
    <Note>The order in which these sections are defined is irrelevant.</Note>
    <br />
    <Title text="Executing Migration Files" />
    <span>You can automate initialization and migration of your database by defining a</span>
    <InlineCode source="./migrate" />
    <span>program at the root of your project.</span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory name="migrate" expanded>
                <File name="main.go" />
            </Directory>
        {/snippet}
    </FileTree>
    <Code
        lang="go"
        source={`
            package main

            import (
                "database/sql"
                "log"
                "main/lib/core/databases"
            )

            func main() {
                // no need to close database connection,
                // this program runs once and dies immediately
                var err error
                var database *sql.DB
                if database, _, err = databases.Connect(); err != nil {
                    log.Fatal(err)
                }
                if err = databases.Migrate(database, "first", "last"); err != nil {
                    log.Fatal(err)
                }
            }
        `}
    />
    <Note>
        <span>Function</span>
        <InlineCode source="databases.Connect()" />
        <span>will initialize a</span>
        <InlineCode source="source.sqlite" />
        <span>database file if it doesn't already exist.</span>
        <br />
        <br />
        <span>
            Future database solutions will probably not have this feature, this is something that can generally be done
            only with sqlite.
        </span>
    </Note>
    <span>This will run all migrations from the</span>
    <InlineCode source="first" />
    <span>one to the</span>
    <InlineCode source="last" />
    <span>one.</span>
    <br />
    <br />
    <span>You can also specify a range by indicating the migration names.</span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "database/sql"
                "log"
                "main/lib/core/databases"
            )

            func main() {
                // no need to close database connection,
                // this program runs once and dies immediately
                var err error
                var database *sql.DB
                if database, _, err = databases.Connect(); err != nil {
                    log.Fatal(err)
                }
                if err = databases.Migrate(
                    database,
                    "2025_01_01T09_16_00+02_00",
                    "2026_07_13T09_19_16+02_00",
                ); err != nil {
                    log.Fatal(err)
                }
            }
        `}
    />
    {#snippet rightSidebar({ body })}
        <RightSidebar {body} items={[]} />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Cli", href: base("/cli", { prefix }) }}
            next={{ label: "Build Checkpoints", href: base("/build_checkpoints", { prefix }) }}
        />
    {/snippet}
</Page>

<script lang="ts">
    import frizzanteGenerateMigrationPng from "$lib/assets/frizzante-generate-migration.png"
    import Caution from "$lib/components/caution.svelte"
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
    <InlineCode source="migrate/migrations" />
    <span>.</span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory name="migrate" expanded>
                <Directory name="migrations" expanded>
                    <File name="2025_00_01T09_16_00+02_00.sql" />
                    <File name="2026_07_17T09_54_35+02_00.sql" />
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
    <Title text="Create Migrate Program" />

    <span>You can automate initialization and migration of your database by defining a</span>
    <InlineCode source="./migrate" />
    <span>program at the root of your project.</span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory name="migrate" expanded>
                <Directory name="migrations" expanded>
                    <File name="2025_00_01T09_16_00+02_00.sql" />
                    <File name="2026_07_17T09_54_35+02_00.sql" />
                </Directory>
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
                "embed"
                "log"
                "main/lib/databases"
            )

            //go:embed migrations
            var efs embed.FS

            func main() {
                // no need to close database connection,
                // this program runs once and dies immediately
                var err error
                var database *sql.DB
                if database, _, err = databases.Connect(); err != nil {
                    log.Fatal(err)
                }
                if err = databases.Migrate(databases.MigrateOptions{
                    Efs:      efs,
                    Database: database,
                    Offset:   "first",
                    Target:   "last",
                }); err != nil {
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
    <Note>
        <span>Note that this program embeds the migration files.</span>
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
                "embed"
                "log"
                "main/lib/databases"
            )

            //go:embed migrations
            var efs embed.FS

            func main() {
                // no need to close database connection,
                // this program runs once and dies immediately
                var err error
                var database *sql.DB
                if database, _, err = databases.Connect(); err != nil {
                    log.Fatal(err)
                }
                if err = databases.Migrate(databases.MigrateOptions{
                    Efs:      efs,
                    Database: database,
                    Offset:   "2025_01_01T09_16_00+02_00",
                    Target:   "2026_07_17T09_54_35+02_00",
                }); err != nil {
                    log.Fatal(err)
                }
            }
        `}
    />
    <Caution>
        <span>File extension and parent directory path must be excluded.</span>
        <br />
        <br />
        <span>This means that the following</span>
        <ul>
            <li><InlineCode source="2025_01_01T09_16_00+02_00.sql" /></li>
            <li><InlineCode source="migrate/migrations/2025_01_01T09_16_00+02_00" /></li>
            <li><InlineCode source="migrate/migrations/2025_01_01T09_16_00+02_00.sql" /></li>
        </ul>
        <span>are not valid migration names.</span>
    </Caution>
    <br />
    <br />
    <Title text="Execute Migration Files" />
    <span>Run the program</span>
    <Code
        lang="sh"
        source={`
            frizzante migrate
            # or go run ./migrate
        `}
    />
    <Note>
        <span>
            Since the migrate program from above embeds the migration files, it's a portable binary that can single
            handedly create and migrate your database.
        </span>
    </Note>
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Migrate" },
                { shift: 0, text: "Create Migration Files" },
                { shift: 0, text: "Create Migrate Program" },
                { shift: 0, text: "Execute Migration Files" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Schema", href: base("/schema", { prefix }) }}
            next={{ label: "Build Checkpoints", href: base("/schema", { prefix }) }}
        />
    {/snippet}
</Page>

<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import FileTree from "$lib/components/file_tree.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import KeyedSection from "$lib/components/keyed_section.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Tip from "$lib/components/tip.svelte"
    import Title from "$lib/components/title.svelte"
    import { mdiApplication } from "@mdi/js"
</script>

<Page title="Docker">
    <Title text="Docker" />
    <span>A Docker solution is available for both development and production deployment.</span>
    <Title type="h3" text="Get Started" />
    <KeyedSection key="1" description="Create a new container.">
        <Code
            lang="sh"
            source={`
                git clone git@github.com:cmjoseph07/frizzante-docker.git
                cd frizzante-docker
                docker compose build --pull --no-cache
            `}
        />
    </KeyedSection>
    <KeyedSection key="2" description="Start the container.">
        <Code lang="sh" source="docker compose up" />
        <Note>
            <span>
                First launch might take a minute or two because the project needs to configure itself installing Air,
                Bun and code dependencies.
            </span>
        </Note>
        <Tip>
            <span>You can send the container in the background with</span>
            <Code lang="sh" source="docker compose up -d" />
            <span>and you can stop it with</span>
            <Code lang="sh" source="docker compose down --remove-orphans" />
        </Tip>
    </KeyedSection>
    <KeyedSection key="3" description="Attach to this container with your IDE or directly with a shell.">
        <Code lang="sh" source="docker exec -it frizzante-start sh" />
    </KeyedSection>
    <KeyedSection key="4" description="Configure project.">
        <Code lang="sh" source="docker exec -it frizzante-start sh" />
    </KeyedSection>
    <KeyedSection key="5" description="Start development.">
        <Code lang="sh" source="docker exec -it frizzante-start sh" />
    </KeyedSection>
    <KeyedSection key="6" description="Build." noLink>
        <Code lang="sh" source="frizzante --build" />
        <span>This will create a <InlineCode source=".gen/bin/app" /> standalone executable.</span>
        <FileTree>
            {#snippet children({ Directory, File })}
                <Directory name=".gen">
                    <Directory name="bin">
                        <File name="app" icon={mdiApplication} />
                    </Directory>
                </Directory>
            {/snippet}
        </FileTree>
    </KeyedSection>
    <Title text="Production with Docker" />
    <span>You have different options for deploying to the production environment using docker.</span>
    <br />
    <br />
    <KeyedSection key="A" description="Build and run production binary inside container.">
        <Code
            source={`
                # Inside the container
                frizzante --build
                ./.gen/bin/app
            `}
        />
    </KeyedSection>
    <KeyedSection key="B" description="Build production Docker image.">
        <Code
            source={`
                docker build --target frizzante_prod -t my-app:prod .
                docker run -p 8080:8080 my-app:prod
            `}
        />
    </KeyedSection>
    <KeyedSection key="C" description="Use Docker Compose for production." noLink>
        <Code source="docker compose -f compose.yaml -f compose.prod.yaml up -d --build" />
    </KeyedSection>
    <Note>
        <span>
            For more details see the official
            <a target="_blank" href="https://github.com/cmjoseph07/frizzante-docker">Frizzante Docker</a>
            made by <a target="_blank" href="https://github.com/cmjoseph07">@cmjoseph07</a>.
        </span>
    </Note>
    {#snippet rightSidebar()}
        <RightSidebar
            items={[
                { shift: 0, text: "Docker" },
                { shift: 0, text: "Get Started" },
                { shift: 1, text: "Create a new container" },
                { shift: 1, text: "Start the container" },
                { shift: 1, text: "Attach to this container with your IDE or directly with a shell" },
                { shift: 1, text: "Configure project" },
                { shift: 1, text: "Start development" },
                { shift: 1, text: "Build" },
                { shift: 0, text: "Production with Docker" },
                { shift: 1, text: "Build and run production binary inside container" },
                { shift: 1, text: "Build production Docker image" },
                { shift: 1, text: "Use Docker Compose for production" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Todos Example", href: "/todos_example" }}
            next={{ label: "Issues", href: "/issues" }}
        />
    {/snippet}
</Page>

<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import KeyedSection from "$lib/components/keyed_section.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Docker" {prefix}>
    <Title text="Docker" />
    <span>You don't need docker to deploy your application.</span>
    <br />
    <span>
        If you <strong>really</strong> want to use docker, the recommended way to do so is to statically compile your program
        and start from scratch.
    </span>
    <br />
    <br />
    <Title type="h3" text="Get Started" />
    <KeyedSection key="1" description="Build your program statically.">
        <Code lang="sh" source="CGO_ENABLED=0 frizzante build" />
    </KeyedSection>
    <KeyedSection key="2" description="Migrate database.">
        <Code lang="sh" source="cd .gen/bin && ./migrate" />
        <Note>
            <span>This will create the <InlineCode source="source.sqlite" /> file on the host's disk.</span>
        </Note>
    </KeyedSection>
    <KeyedSection key="3" description="Make a Dockerfile.">
        <Code
            lang="sh"
            source={`
                FROM scratch
                COPY .gen/bin/source.sqlite /source.sqlite
                COPY .gen/bin/serve /serve
                EXPOSE 8080
                ENTRYPOINT ["/serve"]
            `}
        />
    </KeyedSection>
    <KeyedSection key="4" description="Build the image.">
        <Code lang="sh" source="docker build -t my-web-server ." />
    </KeyedSection>
    <KeyedSection key="5" description="Run.">
        <Code lang="sh" source="docker run -p 8080:8080 my-web-server" />
    </KeyedSection>
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Docker" },
                { shift: 0, text: "Get Started" },
                { shift: 1, text: "Build your program statically" },
                { shift: 1, text: "Migrate database" },
                { shift: 1, text: "Make a Dockerfile" },
                { shift: 1, text: "Build the image" },
                { shift: 1, text: "Run" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Snapshots", href: base("/snapshots", { prefix }) }}
            next={{ label: "Issues", href: base("/issues", { prefix }) }}
        />
    {/snippet}
</Page>

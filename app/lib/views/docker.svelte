<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import Footer from "$lib/components/footer.svelte"
    import KeyedSection from "$lib/components/keyed_section.svelte"
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
    <KeyedSection key="2" description="Make a Dockerfile.">
        <Code
            lang="sh"
            source={`
                FROM scratch
                COPY .gen/bin/app /app
                EXPOSE 8080
                ENTRYPOINT ["/app"]
            `}
        />
    </KeyedSection>
    <KeyedSection key="3" description="Build the image.">
        <Code lang="sh" source="docker build -t my-web-server ." />
    </KeyedSection>
    <KeyedSection key="4" description="Run." noLink>
        <Code lang="sh" source="docker run -p 8080:8080 my-web-server" />
    </KeyedSection>
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Docker" },
                { shift: 0, text: "Get Started" },
                { shift: 1, text: "Build your program statically" },
                { shift: 1, text: "Make a Dockerfile" },
                { shift: 1, text: "Build the image" },
                { shift: 1, text: "Run" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Todos Example", href: base("/todos_example", { prefix }) }}
            next={{ label: "Issues", href: base("/issues", { prefix }) }}
        />
    {/snippet}
</Page>

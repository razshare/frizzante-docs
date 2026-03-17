<script lang="ts">
    import Footer from "$lib/components/footer.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
</script>

<Page title="Issues">
    <Title text="Issues" />
    <span>This document is a guide on how to submit bug reports and feature requests.</span>
    <Title text="Reporting a Bug" />
    <span>
        Make sure to read the <a href="/">documentation</a> before submitting a bug report.
    </span>
    <br />
    <span>
        Bug reports can be submitted using the
        <a target="_blank" href="https://github.com/razshare/frizzante/issues/new?template=bug_report.md"
            >GitHub issue tracker</a
        >.
    </span>
    <br />
    <span>
        When reporting a bug, make sure to include a link to a repository isolating the issue and the steps to reproduce
        said issue.
    </span>
    <Title text="Requesting a Feature" />
    <span>
        Make sure to read the <a href="/">documentation</a> before submitting a feature request.
    </span>
    <br />
    <span>
        Feature requests can be submitted using the
        <a target="_blank" href="https://github.com/razshare/frizzante/issues/new?template=feature_request.md">
            <span>GitHub issue tracker</span>
        </a>.
    </span>

    {#snippet rightSidebar()}
        <RightSidebar
            items={[
                { shift: 0, text: "Issues" },
                { shift: 0, text: "Reporting a Bug" },
                { shift: 0, text: "Requesting a Feature" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Docker", href: "/docker" }}
            next={{ label: "Contributing", href: "/contributing" }}
        />
    {/snippet}
</Page>

<script lang="ts">
    import Page from "$lib/components/page.svelte"
</script>

<Page title="Issues">
    <h1>Issues</h1>
    <span>This document is a guide on how to submit bug reports and feature requests.</span>
    <h1>Reporting a Bug</h1>
    <span>
        Make sure to read the <a href="/">documentation</a> before submitting a bug report.
    </span>
    <br />
    <span>
        Bug reports can be submitted using the
        <a href="https://github.com/razshare/frizzante/issues/new?template=bug_report.md">GitHub issue tracker</a>.
    </span>
    <br />
    <span>
        When reporting a bug, make sure to include a link to a repository isolating the issue and the steps to reproduce
        said issue.
    </span>
    <h1>Requesting a Feature</h1>
    <span>
        Make sure to read the <a href="/">documentation</a> before submitting a feature request.
    </span>
    <br />
    <span>
        Feature requests can be submitted using the
        <a href="https://github.com/razshare/frizzante/issues/new?template=feature_request.md">GitHub issue tracker</a>.
    </span>

    {#snippet rightSidebar()}
        <!-- empty -->
    {/snippet}
</Page>

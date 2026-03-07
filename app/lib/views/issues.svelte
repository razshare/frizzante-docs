<script lang="ts">
    import MenuItemHyperlink from "$lib/components/menu_item_hyperlink.svelte"
    import Page from "$lib/components/page.svelte"
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
        <a href="https://github.com/razshare/frizzante/issues/new?template=bug_report.md">GitHub issue tracker</a>.
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
        <a href="https://github.com/razshare/frizzante/issues/new?template=feature_request.md">GitHub issue tracker</a>.
    </span>

    {#snippet rightSidebar()}
        <MenuItemHyperlink text="Issues" />
        <MenuItemHyperlink text="Reporting a Bug" />
        <MenuItemHyperlink text="Requesting a Feature" />
    {/snippet}
</Page>

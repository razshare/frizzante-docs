<style>
    :root {
        --footer-padding: 1rem;
        --footer-previous-padding: 1rem;
        --footer-next-padding: 1rem;
        --footer-line-color: #cecdc3;
        --footer-line-thickness: 1px;
    }
    .footer {
        padding-top: var(--footer-padding);
        padding-bottom: 20rem;
    }
    .footer-line {
        grid-area: footer-line;
        position: relative;
        height: var(--footer-line-thickness);
        background-color: var(--footer-line-color);
        opacity: 0.3;
    }
    .footer-content {
        display: flex;
        flex-wrap: wrap;
    }
    .footer-content-previous {
        padding: var(--footer-previous-padding);
        font-size: 1.3rem;
        flex-grow: 1;
        text-align: start;
    }
    .footer-content-previous-hint {
        opacity: 0.5;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas: "footer-content-previous-hint-icon footer-content-previous-hint-text";
    }
    .footer-content-previous-hint-icon {
        top: 0.1rem;
        position: relative;
        grid-area: footer-content-previous-hint-icon;
    }
    .footer-content-previous-hint-text {
        grid-area: footer-content-previous-hint-text;
    }
    .footer-content-next {
        padding: var(--footer-next-padding);
        font-size: 1.3rem;
        flex-grow: 1;
        text-align: end;
    }
    .footer-content-next-hint {
        opacity: 0.5;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas: "footer-content-next-hint-text footer-content-next-hint-icon";
    }
    .footer-content-next-hint-icon {
        top: 0.1rem;
        position: relative;
        grid-area: footer-content-next-hint-icon;
    }
    .footer-content-next-hint-text {
        grid-area: footer-content-next-hint-text;
    }
    @media screen and (max-width: 980px) {
        .footer-content-previous {
            text-align: center;
        }
        .footer-content-next {
            text-align: center;
        }
    }
</style>

<script lang="ts">
    import { mdiArrowLeft, mdiArrowRight, mdiCloudRefresh } from "@mdi/js"
    import Icon from "./icons/icon.svelte"
    import Link from "./links/link.svelte"
    type Props = {
        previous?: { label: string; href: string }
        next?: { label: string; href: string }
    }
    let { previous, next }: Props = $props()
</script>

<div class="footer">
    <div class="footer-line"></div>
    <div class="footer-content">
        <div class="footer-content-previous">
            {#if previous}
                <Link href={previous.href}>
                    {#snippet children({ pending })}
                        <div class="footer-content-previous-hint">
                            <span class="footer-content-previous-hint-text">Previous</span>
                            <div class="footer-content-previous-hint-icon">
                                {#if pending}
                                    <Icon path={mdiCloudRefresh} size="1.3rem" />
                                {:else}
                                    <Icon path={mdiArrowLeft} size="1.3rem" />
                                {/if}
                            </div>
                        </div>
                        <div class="footer-content-previous-title">
                            <span>{previous.label}</span>
                        </div>
                    {/snippet}
                </Link>
            {/if}
        </div>
        <div class="footer-content-next">
            {#if next}
                <Link href={next.href}>
                    {#snippet children({ pending })}
                        <div class="footer-content-next-hint">
                            <span class="footer-content-next-hint-text">Next</span>
                            <div class="footer-content-next-hint-icon">
                                {#if pending}
                                    <Icon path={mdiCloudRefresh} size="1.3rem" />
                                {:else}
                                    <Icon path={mdiArrowRight} size="1.3rem" />
                                {/if}
                            </div>
                        </div>
                        <div class="footer-content-next-title">
                            <span>{next.label}</span>
                        </div>
                    {/snippet}
                </Link>
            {/if}
        </div>
    </div>
</div>

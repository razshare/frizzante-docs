<style>
    :root {
        --footer-padding: 1rem;
        --footer-line-thickness: 1px;
        --footer-line-color: #cecdc3;
        --footer-gap: 1rem;
        --footer-previous-button-text-size: 1.3rem;
        --footer-previous-button-label-size: 2rem;
        --footer-previous-button-label-weight: bold;
        --footer-next-button-text-size: 1.3rem;
        --footer-next-button-label-size: 2rem;
        --footer-next-button-label-weight: bold;
    }
    .footer {
        padding-top: var(--footer-padding);
        padding-bottom: 20rem;
        display: grid;
        gap: var(--footer-gap);
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "footer-line footer-line"
            "footer-previous footer-next";
    }
    .footer-line {
        grid-area: footer-line;
        position: relative;
        height: var(--footer-line-thickness);
        background-color: var(--footer-line-color);
        opacity: 0.1;
    }
    .footer-previous {
        grid-area: footer-previous;
        text-align: start;
    }
    .footer-next {
        grid-area: footer-next;
        text-align: end;
    }
    .footer-previous-button {
        display: grid;
        gap: 1rem;
        padding: 1rem;
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "footer-previous-button-icon footer-previous-button-text"
            "footer-previous-button-label footer-previous-button-label";
        color: #cecdc3;
        text-decoration: none;
        opacity: 0.5;
    }
    .footer-previous-button:hover {
        text-decoration: none;
        opacity: 1;
    }
    .footer-previous-button-text {
        grid-area: footer-previous-button-text;
        font-size: var(--footer-previous-button-text-size);
    }
    .footer-previous-button-icon {
        grid-area: footer-previous-button-icon;
        align-items: center;
        display: grid;
    }
    .footer-previous-button-label {
        grid-area: footer-previous-button-label;
        font-size: var(--footer-previous-button-label-size);
        font-weight: var(--footer-previous-button-label-weight);
    }
    .footer-next-button {
        display: grid;
        gap: 0.3rem;
        padding: 1rem;
        grid-template-columns: 1fr auto;
        grid-template-areas:
            "footer-next-button-text footer-next-button-icon"
            "footer-next-button-label footer-next-button-label";
        color: #cecdc3;
        text-decoration: none;
        opacity: 0.5;
    }
    .footer-next-button:hover {
        text-decoration: none;
        opacity: 1;
    }
    .footer-next-button-text {
        grid-area: footer-next-button-text;
        font-size: var(--footer-next-button-text-size);
    }
    .footer-next-button-icon {
        grid-area: footer-next-button-icon;
        align-items: center;
        display: grid;
    }
    .footer-next-button-label {
        grid-area: footer-next-button-label;
        font-size: var(--footer-next-button-label-size);
        font-weight: var(--footer-next-button-label-weight);
    }
    @media screen and (max-width: 980px) {
        .footer {
            padding-top: var(--footer-padding);
            padding-bottom: 20rem;
            display: grid;
            gap: var(--footer-gap);
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
                "footer-line footer-line"
                "footer-previous footer-previous"
                "footer-next footer-next";
        }
        .footer-previous-button {
            text-align: center;
        }
        .footer-next-button {
            text-align: center;
        }
    }
</style>

<script lang="ts">
    import { href } from "$lib/scripts/core/href"
    import { mdiArrowLeft, mdiArrowRight } from "@mdi/js"
    import Icon from "./icons/icon.svelte"
    type Props = {
        previous?: { label: string; href: string }
        next?: { label: string; href: string }
    }
    let { previous, next }: Props = $props()
</script>

<div class="footer">
    <div class="footer-line"></div>
    <div class="footer-previous">
        {#if previous}
            <a class="footer-previous-button" {...href(previous.href)}>
                <div class="footer-previous-button-text">Previous</div>
                <div class="footer-previous-button-icon">
                    <Icon path={mdiArrowLeft} size="1.5rem" />
                </div>
                <div class="footer-previous-button-label">{previous.label}</div>
            </a>
        {/if}
    </div>
    <div class="footer-next">
        {#if next}
            <a class="footer-next-button" {...href(next.href)}>
                <div class="footer-next-button-text">Next</div>
                <div class="footer-next-button-icon">
                    <Icon path={mdiArrowRight} size="1.5rem" />
                </div>
                <div class="footer-next-button-label">{next.label}</div>
            </a>
        {/if}
    </div>
</div>

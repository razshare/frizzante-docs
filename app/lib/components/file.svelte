<style>
    :root {
        --file-padding: 0.5rem;
    }
    .file {
        position: relative;
        display: grid;
        padding: var(--file-padding);
        grid-template-areas:
            "name empty"
            "content content";
    }
</style>

<div class="file"></div>

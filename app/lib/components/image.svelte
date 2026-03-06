<style>
    :root {
        --image-roundness: 1rem;
    }
    .image {
        --width: auto;
        --height: auto;
        border-radius: var(--image-roundness);
        width: var(--width);
        height: var(--height);
        max-width: 100%;
        max-height: 100%;
    }
</style>

<script lang="ts">
    type Props = {
        src: string
        alt?: string
        width?: string
        height?: string
    }
    let { src, alt = "", width = "auto", height = "auto" }: Props = $props()
</script>

<img
    class="image"
    {src}
    {alt}
    loading="lazy"
    decoding="async"
    fetchpriority="auto"
    {width}
    {height}
    style:--width={width}
    style:--height={height}
/>

<style>
    :root {
        --logo-text: #d24317;
    }
    .logo {
        color: var(--logo-text);
        background: transparent;
        font-size: 0.3rem;
    }
</style>

<script lang="ts">
    import logoText from "$lib/assets/logo.txt?raw"
</script>

<pre class="logo">{logoText}</pre>

Views are `.svelte` components located under `lib/components/views`.

Views are used by Go pages to render content.

Here's an example of a view located under `lib/components/views/Welcome.svelte`

```html
<script>
    let name = "world"
</script>

Hello {name}!
```
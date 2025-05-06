Views are `.svelte` files located under `lib/components/views`.

!!! warning
    This is not just a convention, tit's a requirement; views must be located under `lib/components/views`.

Here's an example of a view located at `lib/components/views/Welcome.svelte`

```html
<script>
    let name = "world"
</script>

Hello {name}!
```

!!! note
    Views are used by Go pages to render content.<br/>
    See the [pages section](./pages.md) for more details.
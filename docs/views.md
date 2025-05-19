Views are `.svelte` files located under `lib/components/views`.

Here's an example

`lib/components/views/WelcomeView.svelte`
```html
<script>
    let name = "world"
</script>

Hello {name}!
```

!!! note
    Views are automatically bound to Go page controllers to render content.<br/>
    See the [pages section](./pages.md) for more details.

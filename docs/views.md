Views are `.svelte` components located under `lib/components/views`.

Views are used by Go pages to render content.

Here's an example of a view located under `lib/components/views/Welcome`

```html
<script>
    import {getContext} from "svelte";

    /**
     * Server data.
     * @typedef Data
     * @property {string} name
     */

    /** @type {Data} */
    const data = getContext("data")
</script>

Hello {data.name}!
```

This view expects a data property called `name` from the server.

Say for example the server provides the value `world` for the property `name`, 
then the view would render the text `Hello world!`.

!!! note
    Read more about Go pages in the [pages section](./pages.md).
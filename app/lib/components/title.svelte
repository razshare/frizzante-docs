<script lang="ts">
    type Props = {
        text: string
        type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
        id?: string
    }
    let { text, type: tag = "h1", id: tagId = "" }: Props = $props()
    let id = $derived.by(function run() {
        if (tagId !== "") {
            return tagId
        }

        return text
            .replaceAll(/&+/g, "and")
            .replaceAll(/[_\s,.;:!"£$%/()=?^'']+/g, "-")
            .replace(/-$/, "")
            .replace(/^-/, "")
            .toLowerCase()
    })
</script>

<a href="#{id}">
    {#if tag === "h1"}
        <h1 {id}>
            <span>#</span>
            <span>{text}</span>
        </h1>
    {:else if tag === "h2"}
        <h2 {id}>
            <span>#</span>
            <span>{text}</span>
        </h2>
    {:else if tag === "h3"}
        <h3 {id}>
            <span>#</span>
            <span>{text}</span>
        </h3>
    {:else if tag === "h4"}
        <h4 {id}>
            <span>#</span>
            <span>{text}</span>
        </h4>
    {:else if tag === "h5"}
        <h5 {id}>
            <span>#</span>
            <span>{text}</span>
        </h5>
    {:else}
        <h6 {id}>
            <span>#</span>
            <span>{text}</span>
        </h6>
    {/if}
</a>

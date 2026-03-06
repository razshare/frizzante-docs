<style>
    :root {
        --hyper-table-padding: 1rem;
        --hyper-border-color: rgba(255, 255, 255, 0.3);
    }
    .hyper-table {
        text-align: start;
        border-collapse: collapse;
    }
    .hyper-table > thead > tr > th {
        text-align: start;
        padding: var(--hyper-table-padding);
        font-weight: bold;
    }
    .hyper-table > tbody > tr > td {
        border-top: 1px var(--hyper-border-color) solid;
        padding: var(--hyper-table-padding);
    }
</style>

<script lang="ts">
    type Props = {
        hyperlinks: Record<string, string>
    }
    let { hyperlinks }: Props = $props()
</script>

<table class="hyper-table">
    <thead>
        <tr>
            <th>Description</th>
            <th>Hyperlink</th>
        </tr>
    </thead>
    <tbody>
        {#each Object.keys(hyperlinks) as key (key)}
            {@const value = hyperlinks[key]}
            <tr>
                <td>
                    <span>{key}</span>
                </td>
                <td>
                    <a href={value}>
                        <span>{value}</span>
                    </a>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

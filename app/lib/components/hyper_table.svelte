<style>
    :root {
        --hyper-table-padding: 1rem;
        --hyper-border-color: rgba(255, 255, 255, 0.3);
    }
    .hyper-table {
        overflow: auto;
        max-width: 100%;
        max-height: 100%;
    }
    .hyper-table > table {
        text-align: start;
        border-collapse: collapse;
    }
    .hyper-table > table > thead > tr > th {
        text-align: start;
        padding: var(--hyper-table-padding);
        font-weight: bold;
    }
    .hyper-table > table > tbody > tr > td {
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

<div class="hyper-table">
    <table>
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
</div>

<style>
    :root {
        --menu-padding: 1rem;
    }
    .menu {
        display: grid;
        position: relative;
        justify-items: end;
        grid-template-areas: "";
        padding: var(--menu-padding);
    }
</style>

<script>
    import { href } from "$lib/scripts/core/href"
    import MenuItem from "$lib/components/menu_item.svelte"
</script>

<div class="menu">
    <MenuItem><a {...href("/")}>Overview</a></MenuItem>
    <MenuItem><a {...href("/get_started")}>Get Started</a></MenuItem>
    <MenuItem><a {...href("/basics")}>Basics</a></MenuItem>
    <MenuItem><a {...href("/web_sockets")}>Web Sockets</a></MenuItem>
    <MenuItem><a {...href("/server_sent_events")}>Server Sent Events</a></MenuItem>
    <MenuItem><a {...href("/guards")}>Guards</a></MenuItem>
    <MenuItem><a {...href("/views")}>Views</a></MenuItem>
    <MenuItem><a {...href("/web_standards")}>Web Standards</a></MenuItem>
    <MenuItem><a {...href("/type_definitions")}>Type Definitions</a></MenuItem>
    <MenuItem><a {...href("/todos_example")}>Todos Example</a></MenuItem>
    <MenuItem><a {...href("/cli")}>Cli</a></MenuItem>
    <MenuItem><a {...href("/docker")}>Docker</a></MenuItem>
    <MenuItem><a {...href("/issues")}>Issues</a></MenuItem>
    <MenuItem><a {...href("/contributing")}>Contributing</a></MenuItem>
    <MenuItem><a {...href("/faq")}>Faq</a></MenuItem>
</div>

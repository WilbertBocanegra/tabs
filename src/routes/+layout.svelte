<script lang="ts">
	import { Tabs, tab } from '$lib/index.js';
</script>

<Tabs name="_UID">
	{#if $tab}
		<h1>error</h1>
	{:else}
		<slot />
	{/if}
</Tabs>

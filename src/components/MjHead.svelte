<script lang="ts">
  export let children: () => any;
</script>

<svelte:element this={'mj-head'}>
  {@render children()}
</svelte:element>

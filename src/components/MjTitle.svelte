<script lang="ts">
  export let children: () => any;
</script>

<svelte:element this={'mj-title'}>
  {@render children()}
</svelte:element>

<script lang="ts">
  // export let cssClass: string | undefined = undefined;
  export let children: () => any; //raw
</script>

<svelte:element this={'mj-title'}>
  {@render children()}
</svelte:element>

<script lang="ts">
  // export let cssClass: string | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element this={'mj-html-attributes'}>
  {@render children()}
</svelte:element>

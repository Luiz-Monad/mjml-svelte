<script lang="ts">
  export let path: string;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-selector'}
  {...{
    path
  }}
>
  {@render children()}
</svelte:element>

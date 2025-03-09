<script lang="ts">
  export let position: 'file-start' | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-raw'}
  {...{
    position
  }}
>
  {@render children()}
</svelte:element>

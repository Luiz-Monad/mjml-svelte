<script lang="ts">
  export let width: string | number | undefined = undefined;
  // export let children: () => any;
</script>

<svelte:element
  this={'mj-breakpoint'}
  {...{
    width
  }}
/>

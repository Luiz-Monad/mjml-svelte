<script lang="ts">
  // export let cssClass: string | undefined = undefined;
  export let position: 'file-start' | undefined = undefined;
  export let children: () => any; //raw
</script>

<svelte:element
  this={'mj-raw'}
  {...{
    position
  }}
>
  {@render children()}
</svelte:element>

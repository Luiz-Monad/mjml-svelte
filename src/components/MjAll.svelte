<script lang="ts">
  export let cssClass: string | undefined = undefined;
</script>

<svelte:element
  this={'mj-all'}
  {...{
    'css-class': cssClass
  }}
  {...$$restProps}
/>

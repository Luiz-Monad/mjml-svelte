<script lang="ts">
  export let path: string;
  export let type: 'css' | 'html' | undefined = undefined;
  export let cssInline: 'inline' | undefined = undefined;
</script>

<svelte:element
  this={'mj-include'}
  {...{
    path,
    type,
    'css-inline': cssInline
  }}
/>

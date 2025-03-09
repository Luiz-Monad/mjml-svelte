<script lang="ts">
  export let inline: 'inline' | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-style'}
  {...{
    inline
  }}
>
  {@render children()}
</svelte:element>

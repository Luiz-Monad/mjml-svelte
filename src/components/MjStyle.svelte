<script lang="ts">
  export let inline: 'inline' | undefined = undefined;
  export let children: () => any; //raw
</script>

<svelte:element
  this={'mj-style'}
  {...{
    inline
  }}
>
  {@render children()}
</svelte:element>

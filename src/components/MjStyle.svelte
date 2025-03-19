<script lang="ts">
  export let inline: 'inline' | undefined = undefined;
  export let children: (() => any) | undefined = undefined; //raw
</script>

<svelte:element
  this={'mj-style'}
  {...{
    inline
  }}
>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>

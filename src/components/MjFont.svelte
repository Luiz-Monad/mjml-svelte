<script lang="ts">
  // export let cssClass: string | undefined = undefined;
  export let href: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-font'}
  {...{
    href,
    name
  }}
>
  {@render children()}
</svelte:element>

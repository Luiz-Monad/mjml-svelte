<script lang="ts">
  export let name: string;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-html-attribute'}
  {...{
    name
  }}
>
  {@render children()}
</svelte:element>

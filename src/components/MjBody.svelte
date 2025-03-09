<script lang="ts">
  export let backgroundColor: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let width: string | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-body'}
  {...{
    'background-color': backgroundColor,
    'css-class': cssClass,
    width
  }}
>
  {@render children()}
</svelte:element>

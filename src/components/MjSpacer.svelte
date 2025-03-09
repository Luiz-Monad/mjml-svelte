<script lang="ts">
  export let containerBackgroundColor: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let height: string | undefined = undefined;
  export let padding: string | undefined = undefined;
  export let paddingBottom: string | undefined = undefined;
  export let paddingLeft: string | undefined = undefined;
  export let paddingRight: string | undefined = undefined;
  export let paddingTop: string | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-spacer'}
  {...{
    'container-background-color': containerBackgroundColor,
    'css-class': cssClass,
    height,
    padding,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop
  }}
>
  {@render children()}
</svelte:element>

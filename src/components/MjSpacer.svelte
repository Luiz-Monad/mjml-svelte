<script lang="ts">
  export let border: string | undefined = undefined;
  export let borderBottom: string | undefined = undefined;
  export let borderLeft: string | undefined = undefined;
  export let borderRight: string | undefined = undefined;
  export let borderTop: string | undefined = undefined;
  export let containerBackgroundColor: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let height: string | number | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  // export let children: () => any;
</script>

<svelte:element
  this={'mj-spacer'}
  {...{
    border,
    'border-bottom': borderBottom,
    'border-left': borderLeft,
    'border-right': borderRight,
    'border-top': borderTop,
    'container-background-color': containerBackgroundColor,
    'css-class': cssClass,
    height,
    padding,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop
  }}
/>

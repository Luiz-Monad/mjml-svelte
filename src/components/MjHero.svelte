<script lang="ts">
  export let backgroundColor: string | undefined = undefined;
  export let backgroundHeight: string | number | undefined = undefined;
  export let backgroundPosition: string | undefined = undefined;
  export let backgroundUrl: string | undefined = undefined;
  export let backgroundWidth: string | number | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let containerBackgroundColor: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let height: string | number | undefined = undefined;
  export let innerBackgroundColor: string | undefined = undefined;
  export let innerPadding: string | number | undefined = undefined;
  export let innerPaddingBottom: string | number | undefined = undefined;
  export let innerPaddingLeft: string | number | undefined = undefined;
  export let innerPaddingRight: string | number | undefined = undefined;
  export let innerPaddingTop: string | number | undefined = undefined;
  export let mode: 'fluid-height' | 'fixed-height' | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let verticalAlign: 'top' | 'middle' | 'bottom' | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-hero'}
  {...{
    'background-color': backgroundColor,
    'background-height': backgroundHeight,
    'background-position': backgroundPosition,
    'background-url': backgroundUrl,
    'background-width': backgroundWidth,
    'border-radius': borderRadius,
    'container-background-color': containerBackgroundColor,
    'css-class': cssClass,
    height,
    'inner-background-color': innerBackgroundColor,
    'inner-padding-bottom': innerPaddingBottom,
    'inner-padding-left': innerPaddingLeft,
    'inner-padding-right': innerPaddingRight,
    'inner-padding-top': innerPaddingTop,
    'inner-padding': innerPadding,
    mode,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    padding,
    'vertical-align': verticalAlign
  }}
>
  {@render children()}
</svelte:element>

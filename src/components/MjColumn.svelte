<script lang="ts">
  export let backgroundColor: string | undefined = undefined;
  export let innerBackgroundColor: string | undefined = undefined;
  export let border: string | undefined = undefined;
  export let borderBottom: string | undefined = undefined;
  export let borderLeft: string | undefined = undefined;
  export let borderRight: string | undefined = undefined;
  export let borderTop: string | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let innerBorder: string | undefined = undefined;
  export let innerBorderBottom: string | undefined = undefined;
  export let innerBorderLeft: string | undefined = undefined;
  export let innerBorderRight: string | undefined = undefined;
  export let innerBorderTop: string | undefined = undefined;
  export let innerBorderRadius: string | undefined = undefined;
  export let width: string | undefined = undefined;
  export let verticalAlign: 'top' | 'middle' | 'bottom' | undefined = undefined;
  export let padding: string | undefined = undefined;
  export let paddingTop: string | undefined = undefined;
  export let paddingBottom: string | undefined = undefined;
  export let paddingLeft: string | undefined = undefined;
  export let paddingRight: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-column'}
  {...{
    'background-color': backgroundColor,
    'inner-background-color': innerBackgroundColor,
    border,
    'border-bottom': borderBottom,
    'border-left': borderLeft,
    'border-right': borderRight,
    'border-top': borderTop,
    'border-radius': borderRadius,
    'inner-border': innerBorder,
    'inner-border-bottom': innerBorderBottom,
    'inner-border-left': innerBorderLeft,
    'inner-border-right': innerBorderRight,
    'inner-border-top': innerBorderTop,
    'inner-border-radius': innerBorderRadius,
    width,
    'vertical-align': verticalAlign,
    padding,
    'padding-top': paddingTop,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'css-class': cssClass
  }}
>
  {@render children()}
</svelte:element>

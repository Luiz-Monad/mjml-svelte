<script lang="ts">
  export let backgroundColor: string | undefined = undefined;
  export let border: string | undefined = undefined;
  export let borderBottom: string | undefined = undefined;
  export let borderLeft: string | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let borderRight: string | undefined = undefined;
  export let borderTop: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let direction: 'ltr' | 'rtl' | undefined = undefined;
  export let innerBackgroundColor: string | undefined = undefined;
  export let innerBorder: string | undefined = undefined;
  export let innerBorderBottom: string | undefined = undefined;
  export let innerBorderLeft: string | undefined = undefined;
  export let innerBorderRadius: string | number | undefined = undefined;
  export let innerBorderRight: string | undefined = undefined;
  export let innerBorderTop: string | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let verticalAlign: 'top' | 'middle' | 'bottom' | undefined = undefined;
  export let width: string | number | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-column'}
  {...{
    'background-color': backgroundColor,
    'border-bottom': borderBottom,
    'border-left': borderLeft,
    'border-radius': borderRadius,
    'border-right': borderRight,
    'border-top': borderTop,
    border,
    'css-class': cssClass,
    direction,
    'inner-background-color': innerBackgroundColor,
    'inner-border-bottom': innerBorderBottom,
    'inner-border-left': innerBorderLeft,
    'inner-border-radius': innerBorderRadius,
    'inner-border-right': innerBorderRight,
    'inner-border-top': innerBorderTop,
    'inner-border': innerBorder,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    padding,
    'vertical-align': verticalAlign,
    width
  }}
>
  {@render children()}
</svelte:element>

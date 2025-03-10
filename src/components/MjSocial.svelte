<script lang="ts">
  export let align: 'left' | 'center' | 'right' | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let color: string | undefined = undefined;
  export let containerBackgroundColor: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let fontFamily: string | undefined = undefined;
  export let fontSize: string | number | undefined = undefined;
  export let fontStyle: 'normal' | 'italic' | 'oblique' | undefined = undefined;
  export let fontWeight: string | number | undefined = undefined;
  export let iconHeight: string | number | undefined = undefined;
  export let iconPadding: string | number | undefined = undefined;
  export let iconSize: string | number | undefined = undefined;
  export let innerPadding: string | number | undefined = undefined;
  export let lineHeight: string | number | undefined = undefined;
  export let mode: 'horizontal' | 'vertical' | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let tableLayout: 'auto' | 'fixed' | undefined = undefined;
  export let textDecoration: 'underline' | 'overline' | 'none' | undefined = undefined;
  export let textPadding: string | number | undefined = undefined;
  export let verticalAlign: 'top' | 'middle' | 'bottom' | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-social'}
  {...{
    align,
    'border-radius': borderRadius,
    color,
    'container-background-color': containerBackgroundColor,
    'css-class': cssClass,
    'font-family': fontFamily,
    'font-size': fontSize,
    'font-style': fontStyle,
    'font-weight': fontWeight,
    'icon-height': iconHeight,
    'icon-padding': iconPadding,
    'icon-size': iconSize,
    'inner-padding': innerPadding,
    'line-height': lineHeight,
    mode,
    padding,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    'table-layout': tableLayout,
    'text-decoration': textDecoration,
    'text-padding': textPadding,
    'vertical-align': verticalAlign
  }}
>
  {@render children()}
</svelte:element>

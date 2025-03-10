<script lang="ts">
  export let align: 'left' | 'center' | 'right' | undefined = undefined;
  export let border: string | undefined = undefined;
  export let cellpadding: string | undefined = undefined;
  export let cellspacing: string | undefined = undefined;
  export let color: string | undefined = undefined;
  export let containerBackgroundColor: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let fontFamily: string | undefined = undefined;
  export let fontSize: string | number | undefined = undefined;
  export let fontWeight: string | undefined = undefined;
  export let lineHeight: string | number | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let role: 'none' | 'presentation' | undefined = undefined;
  export let tableLayout: 'auto' | 'fixed' | 'initial' | 'inherit' | undefined = undefined;
  export let verticalAlign: 'top' | 'middle' | 'bottom' | undefined = undefined;
  export let width: string | number | undefined = undefined;
  export let children: () => any; //raw
</script>

<svelte:element
  this={'mj-table'}
  {...{
    align,
    border,
    cellpadding,
    cellspacing,
    color,
    'container-background-color': containerBackgroundColor,
    'css-class': cssClass,
    'font-family': fontFamily,
    'font-size': fontSize,
    'font-weight': fontWeight,
    'line-height': lineHeight,
    padding,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    role,
    'table-layout': tableLayout,
    'vertical-align': verticalAlign,
    width
  }}
>
  {@render children()}
</svelte:element>

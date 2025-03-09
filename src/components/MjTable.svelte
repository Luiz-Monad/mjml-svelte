<script lang="ts">
  export let align: 'left' | 'right' | 'center' | undefined = undefined;
  export let border: string | undefined = undefined;
  export let cellpadding: string | undefined = undefined;
  export let cellspacing: string | undefined = undefined;
  export let color: string | undefined = undefined;
  export let containerBackgroundColor: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let fontFamily: string | undefined = undefined;
  export let fontSize: string | undefined = undefined;
  export let lineHeight: string | undefined = undefined;
  export let padding: string | undefined = undefined;
  export let paddingBottom: string | undefined = undefined;
  export let paddingLeft: string | undefined = undefined;
  export let paddingRight: string | undefined = undefined;
  export let paddingTop: string | undefined = undefined;
  export let role: 'none' | 'presentation' | undefined = undefined;
  export let tableLayout: 'auto' | 'fixed' | 'initial' | 'inherit' | undefined = undefined;
  export let width: string | undefined = undefined;
  export let children: () => any;
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
    'line-height': lineHeight,
    padding,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    role,
    'table-layout': tableLayout,
    width
  }}
>
  {@render children()}
</svelte:element>

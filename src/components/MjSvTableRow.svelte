<script lang="ts">
  export let backgroundColor: string | undefined = undefined;
  export let border: string | undefined = undefined;
  export let borderBottom: string | undefined = undefined;
  export let borderLeft: string | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let borderRight: string | undefined = undefined;
  export let borderTop: string | undefined = undefined;
  export let color: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let fontFamily: string | undefined = undefined;
  export let fontSize: string | number | undefined = undefined;
  export let fontWeight: string | undefined = undefined;
  export let lineHeight: string | number | undefined = undefined;
  export let height: string | number | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let textAlign: 'left' | 'center' | 'right' | undefined = undefined;
  export let verticalAlign: 'top' | 'middle' | 'bottom' | undefined = undefined;
  export let width: string | number | undefined = undefined;
  export let children: (() => any) | undefined = undefined; //raw
</script>

<svelte:element
  this={'mjsv-table-row'}
  {...{
    'background-color': backgroundColor,
    'border-bottom': borderBottom,
    'border-left': borderLeft,
    'border-radius': borderRadius,
    'border-right': borderRight,
    'border-top': borderTop,
    border,
    height,
    color,
    'css-class': cssClass,
    'font-family': fontFamily,
    'font-size': fontSize,
    'font-weight': fontWeight,
    'line-height': lineHeight,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    padding,
    'text-align': textAlign,
    'vertical-align': verticalAlign,
    width
  }}
>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>

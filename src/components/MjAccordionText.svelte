<script lang="ts">
  export let backgroundColor: string | undefined = undefined;
  export let color: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let fontFamily: string | undefined = undefined;
  export let fontSize: string | number | undefined = undefined;
  export let fontWeight: string | number | undefined = undefined;
  export let letterSpacing: string | number | undefined = undefined;
  export let lineHeight: string | number | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let children: () => any; //raw
</script>

<svelte:element
  this={'mj-accordion-text'}
  {...{
    'background-color': backgroundColor,
    color,
    'css-class': cssClass,
    'font-family': fontFamily,
    'font-size': fontSize,
    'font-weight': fontWeight,
    'letter-spacing': letterSpacing,
    'line-height': lineHeight,
    padding,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop
  }}
>
  {@render children()}
</svelte:element>

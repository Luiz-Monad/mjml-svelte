<script lang="ts">
  export let color: string | undefined = undefined;
  export let fontFamily: string | undefined = undefined;
  export let fontSize: string | undefined = undefined;
  export let fontStyle: 'normal' | 'italic' | 'oblique' | undefined = undefined;
  export let fontWeight: number | string | undefined = undefined;
  export let lineHeight: string | undefined = undefined;
  export let letterSpacing: string | undefined = undefined;
  export let height: string | undefined = undefined;
  export let textDecoration: 'underline' | 'overline' | 'line-through' | 'none' | undefined =
    undefined;
  export let textTransform: 'uppercase' | 'lowercase' | 'capitalize' | undefined = undefined;
  export let align: 'left' | 'right' | 'center' | 'justify' | undefined = undefined;
  export let containerBackgroundColor: string | undefined = undefined;
  export let padding: string | undefined = undefined;
  export let paddingTop: string | undefined = undefined;
  export let paddingBottom: string | undefined = undefined;
  export let paddingLeft: string | undefined = undefined;
  export let paddingRight: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-text'}
  {...{
    color,
    'font-family': fontFamily,
    'font-size': fontSize,
    'font-style': fontStyle,
    'font-weight': fontWeight,
    'line-height': lineHeight,
    'letter-spacing': letterSpacing,
    height,
    'text-decoration': textDecoration,
    'text-transform': textTransform,
    align,
    'container-background-color': containerBackgroundColor,
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

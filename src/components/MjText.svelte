<script lang="ts">
  export let align: 'left' | 'center' | 'right' | 'justify' | undefined = undefined;
  export let backgroundColor: string | undefined = undefined;
  export let color: string | undefined = undefined;
  export let containerBackgroundColor: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let fontFamily: string | undefined = undefined;
  export let fontSize: string | number | undefined = undefined;
  export let fontStyle: 'normal' | 'italic' | 'oblique' | undefined = undefined;
  export let fontWeight: string | number | undefined = undefined;
  export let height: string | number | undefined = undefined;
  export let letterSpacing: string | number | undefined = undefined;
  export let lineHeight: string | number | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let textDecoration: 'underline' | 'overline' | 'line-through' | 'none' | undefined =
    undefined;
  export let textTransform: 'capitalize' | 'uppercase' | 'lowercase' | undefined = undefined;
  export let verticalAlign: 'top' | 'middle' | 'bottom' | undefined = undefined;
  export let children: () => any; //raw
</script>

<svelte:element
  this={'mj-text'}
  {...{
    align,
    'background-color': backgroundColor,
    color,
    'container-background-color': containerBackgroundColor,
    'css-class': cssClass,
    'font-family': fontFamily,
    'font-size': fontSize,
    'font-style': fontStyle,
    'font-weight': fontWeight,
    height,
    'letter-spacing': letterSpacing,
    'line-height': lineHeight,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    padding,
    'text-decoration': textDecoration,
    'text-transform': textTransform,
    'vertical-align': verticalAlign
  }}
>
  {@render children()}
</svelte:element>

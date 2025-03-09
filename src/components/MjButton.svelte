<script lang="ts">
  export let align: 'left' | 'center' | 'right' | undefined = undefined;
  export let backgroundColor: string | undefined = undefined;
  export let border: string | undefined = undefined;
  export let borderBottom: string | undefined = undefined;
  export let borderLeft: string | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let borderRight: string | undefined = undefined;
  export let borderTop: string | undefined = undefined;
  export let color: string | undefined = undefined;
  export let containerBackgroundColor: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let fontFamily: string | undefined = undefined;
  export let fontSize: string | undefined = undefined;
  export let fontStyle: 'normal' | 'italic' | 'oblique' | undefined = undefined;
  export let fontWeight: number | string | undefined = undefined;
  export let height: string | undefined = undefined;
  export let href: string | undefined = undefined;
  export let innerPadding: string | undefined = undefined;
  export let letterSpacing: string | undefined = undefined;
  export let lineHeight: string | undefined = undefined;
  export let padding: string | undefined = undefined;
  export let paddingBottom: string | undefined = undefined;
  export let paddingLeft: string | undefined = undefined;
  export let paddingRight: string | undefined = undefined;
  export let paddingTop: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let textAlign: string | undefined = undefined;
  export let textDecoration: 'underline' | 'overline' | 'none' | undefined = undefined;
  export let textTransform: 'capitalize' | 'uppercase' | 'lowercase' | 'none' | undefined =
    undefined;
  export let title: string | undefined = undefined;
  export let verticalAlign: string | undefined = undefined;
  export let width: string | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-button'}
  {...{
    align,
    'background-color': backgroundColor,
    border,
    'border-bottom': borderBottom,
    'border-left': borderLeft,
    'border-radius': borderRadius,
    'border-right': borderRight,
    'border-top': borderTop,
    color,
    'container-background-color': containerBackgroundColor,
    'css-class': cssClass,
    'font-family': fontFamily,
    'font-size': fontSize,
    'font-style': fontStyle,
    'font-weight': fontWeight,
    height,
    href,
    'inner-padding': innerPadding,
    'letter-spacing': letterSpacing,
    'line-height': lineHeight,
    padding,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    rel,
    target,
    'text-align': textAlign,
    'text-decoration': textDecoration,
    'text-transform': textTransform,
    title,
    'vertical-align': verticalAlign,
    width
  }}
>
  {@render children()}
</svelte:element>

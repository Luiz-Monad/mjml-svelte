<script lang="ts">
  export let align: 'left' | 'center' | 'right' | undefined = undefined;
  export let alt: string | undefined = undefined;
  export let backgroundColor: string | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let color: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let fontFamily: string | undefined = undefined;
  export let fontSize: string | number | undefined = undefined;
  export let fontStyle: 'normal' | 'italic' | 'oblique' | undefined = undefined;
  export let fontWeight: string | number | undefined = undefined;
  export let href: string | undefined = undefined;
  export let iconHeight: string | number | undefined = undefined;
  export let iconPadding: string | number | undefined = undefined;
  export let iconSize: string | number | undefined = undefined;
  export let lineHeight: string | number | undefined = undefined;
  export let name: string | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let sizes: string | undefined = undefined;
  export let src: string | undefined = undefined;
  export let srcset: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let textDecoration: 'underline' | 'overline' | 'none' | undefined = undefined;
  export let textPadding: string | number | undefined = undefined;
  export let title: string | undefined = undefined;
  export let verticalAlign: 'top' | 'middle' | 'bottom' | undefined = undefined;
  export let children: () => any; //raw
</script>

<svelte:element
  this={'mj-social-element'}
  {...{
    align,
    alt,
    'background-color': backgroundColor,
    'border-radius': borderRadius,
    color,
    'css-class': cssClass,
    'font-family': fontFamily,
    'font-size': fontSize,
    'font-style': fontStyle,
    'font-weight': fontWeight,
    href,
    'icon-height': iconHeight,
    'icon-padding': iconPadding,
    'icon-size': iconSize,
    'line-height': lineHeight,
    name,
    padding,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    rel,
    sizes,
    src,
    srcset,
    target,
    'text-decoration': textDecoration,
    'text-padding': textPadding,
    title,
    'vertical-align': verticalAlign
  }}
>
  {@render children()}
</svelte:element>

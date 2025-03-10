<script lang="ts">
  export let color: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let fontFamily: string | undefined = undefined;
  export let fontSize: string | number | undefined = undefined;
  export let fontStyle: 'normal' | 'italic' | 'oblique' | undefined = undefined;
  export let fontWeight: string | number | undefined = undefined;
  export let href: string | undefined = undefined;
  export let letterSpacing: string | number | undefined = undefined;
  export let lineHeight: string | number | undefined = undefined;
  export let name: string | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let textDecoration: 'underline' | 'overline' | 'none' | undefined = undefined;
  export let textTransform: 'capitalize' | 'uppercase' | 'lowercase' | 'none' | undefined =
    undefined;
  export let children: () => any; //raw
</script>

<svelte:element
  this={'mj-navbar-link'}
  {...{
    color,
    'css-class': cssClass,
    'font-family': fontFamily,
    'font-size': fontSize,
    'font-style': fontStyle,
    'font-weight': fontWeight,
    href,
    'letter-spacing': letterSpacing,
    'line-height': lineHeight,
    name,
    padding,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    rel,
    target,
    'text-decoration': textDecoration,
    'text-transform': textTransform
  }}
>
  {@render children()}
</svelte:element>

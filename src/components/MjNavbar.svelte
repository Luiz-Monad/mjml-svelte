<script lang="ts">
  export let align: 'left' | 'center' | 'right' | undefined = undefined;
  export let baseUrl: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let hamburger: string | undefined = undefined;
  export let icoAlign: 'left' | 'center' | 'right' | undefined = undefined;
  export let icoClose: string | undefined = undefined;
  export let icoColor: string | undefined = undefined;
  export let icoFontFamily: string | undefined = undefined;
  export let icoFontSize: string | number | undefined = undefined;
  export let icoLineHeight: string | number | undefined = undefined;
  export let icoOpen: string | undefined = undefined;
  export let icoPadding: string | number | undefined = undefined;
  export let icoPaddingBottom: string | number | undefined = undefined;
  export let icoPaddingLeft: string | number | undefined = undefined;
  export let icoPaddingRight: string | number | undefined = undefined;
  export let icoPaddingTop: string | number | undefined = undefined;
  export let icoTextDecoration: 'underline' | 'overline' | 'none' | undefined = undefined;
  export let icoTextTransform: 'capitalize' | 'uppercase' | 'lowercase' | 'none' | undefined =
    undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-navbar'}
  {...{
    align,
    'base-url': baseUrl,
    'css-class': cssClass,
    hamburger,
    'ico-align': icoAlign,
    'ico-open': icoOpen,
    'ico-close': icoClose,
    'ico-color': icoColor,
    'ico-font-size': icoFontSize,
    'ico-font-family': icoFontFamily,
    'ico-text-transform': icoTextTransform,
    'ico-padding': icoPadding,
    'ico-padding-left': icoPaddingLeft,
    'ico-padding-top': icoPaddingTop,
    'ico-padding-right': icoPaddingRight,
    'ico-padding-bottom': icoPaddingBottom,
    padding,
    'padding-left': paddingLeft,
    'padding-top': paddingTop,
    'padding-right': paddingRight,
    'padding-bottom': paddingBottom,
    'ico-text-decoration': icoTextDecoration,
    'ico-line-height': icoLineHeight
  }}
>
  {@render children()}
</svelte:element>

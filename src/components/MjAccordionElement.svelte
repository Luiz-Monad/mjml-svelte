<script lang="ts">
  export let backgroundColor: string | undefined = undefined;
  export let border: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let fontFamily: string | undefined = undefined;
  export let iconAlign: 'top' | 'middle' | 'bottom' | undefined = undefined;
  export let iconHeight: string | number | undefined = undefined;
  export let iconPosition: 'left' | 'right' | undefined = undefined;
  export let iconUnwrappedAlt: string | undefined = undefined;
  export let iconUnwrappedUrl: string | undefined = undefined;
  export let iconWidth: string | number | undefined = undefined;
  export let iconWrappedAlt: string | undefined = undefined;
  export let iconWrappedUrl: string | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-accordion-element'}
  {...{
    'background-color': backgroundColor,
    border,
    'css-class': cssClass,
    'font-family': fontFamily,
    'icon-align': iconAlign,
    'icon-height': iconHeight,
    'icon-position': iconPosition,
    'icon-unwrapped-alt': iconUnwrappedAlt,
    'icon-unwrapped-url': iconUnwrappedUrl,
    'icon-width': iconWidth,
    'icon-wrapped-alt': iconWrappedAlt,
    'icon-wrapped-url': iconWrappedUrl
  }}
>
  {@render children()}
</svelte:element>

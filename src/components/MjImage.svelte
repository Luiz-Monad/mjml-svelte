<script lang="ts">
  export let align: 'left' | 'center' | 'right' | undefined = undefined;
  export let alt: string | undefined = undefined;
  export let border: string | undefined = undefined;
  export let borderBottom: string | undefined = undefined;
  export let borderLeft: string | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let borderRight: string | undefined = undefined;
  export let borderTop: string | undefined = undefined;
  export let containerBackgroundColor: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let fluidOnMobile: string | boolean | undefined = undefined;
  export let fontSize: string | number | undefined = undefined;
  export let height: string | number | undefined = undefined;
  export let href: string | undefined = undefined;
  export let maxHeight: string | number | undefined = undefined;
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
  export let title: string | undefined = undefined;
  export let usemap: string | undefined = undefined;
  export let width: string | number | undefined = undefined;
  export let children: (() => any) | undefined = undefined; //non-standard mjml
</script>

<svelte:element
  this={'mj-image'}
  {...{
    align,
    alt,
    border,
    'border-top': borderTop,
    'border-bottom': borderBottom,
    'border-left': borderLeft,
    'border-right': borderRight,
    'border-radius': borderRadius,
    'container-background-color': containerBackgroundColor,
    'css-class': cssClass,
    'fluid-on-mobile': fluidOnMobile,
    'font-size': fontSize,
    height,
    href,
    'max-height': maxHeight,
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
    title,
    usemap,
    width
  }}
>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>

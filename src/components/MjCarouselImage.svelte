<script lang="ts">
  export let alt: string | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let href: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let src: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let tbBorder: string | undefined = undefined;
  export let tbBorderRadius: string | number | undefined = undefined;
  export let thumbnailsSrc: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let children: () => any; //raw
</script>

<svelte:element
  this={'mj-carousel-image'}
  {...{
    alt,
    'border-radius': borderRadius,
    'css-class': cssClass,
    href,
    rel,
    src,
    target,
    'tb-border-radius': tbBorderRadius,
    'tb-border': tbBorder,
    'thumbnails-src': thumbnailsSrc,
    title
  }}
>
  {@render children()}
</svelte:element>

<script lang="ts">
  export let align: 'left' | 'center' | 'right' | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let containerBackgroundColor: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let iconWidth: string | number | undefined = undefined;
  export let leftIcon: string | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let rightIcon: string | undefined = undefined;
  export let tbBorder: string | undefined = undefined;
  export let tbBorderRadius: string | number | undefined = undefined;
  export let tbHoverBorderColor: string | undefined = undefined;
  export let tbSelectedBorderColor: string | undefined = undefined;
  export let tbWidth: string | number | undefined = undefined;
  export let thumbnails: 'visible' | 'hidden' | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-carousel'}
  {...{
    align,
    'border-radius': borderRadius,
    'container-background-color': containerBackgroundColor,
    'css-class': cssClass,
    'icon-width': iconWidth,
    'left-icon': leftIcon,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    padding,
    'right-icon': rightIcon,
    'tb-border-radius': tbBorderRadius,
    'tb-border': tbBorder,
    'tb-hover-border-color': tbHoverBorderColor,
    'tb-selected-border-color': tbSelectedBorderColor,
    'tb-width': tbWidth,
    thumbnails
  }}
>
  {@render children()}
</svelte:element>

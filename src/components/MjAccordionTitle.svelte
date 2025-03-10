<script lang="ts">
  export let backgroundColor: string | undefined = undefined;
  export let color: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let fontFamily: string | undefined = undefined;
  export let fontSize: string | number | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let children: () => any; //raw
</script>

<svelte:element
  this={'mj-accordion-title'}
  {...{
    'background-color': backgroundColor,
    color,
    'css-class': cssClass,
    'font-family': fontFamily,
    'font-size': fontSize,
    padding,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop
  }}
>
  {@render children()}
</svelte:element>

<script lang="ts">
  export let align: 'left' | 'right' | 'center' | undefined = undefined;
  export let borderColor: string | undefined = undefined;
  export let borderStyle: 'dashed' | 'dotted' | 'solid' | undefined = undefined;
  export let borderWidth: string | undefined = undefined;
  export let containerBackgroundColor: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let padding: string | undefined = undefined;
  export let paddingBottom: string | undefined = undefined;
  export let paddingLeft: string | undefined = undefined;
  export let paddingRight: string | undefined = undefined;
  export let paddingTop: string | undefined = undefined;
  export let width: string | undefined = undefined;
</script>

<svelte:element
  this={'mj-divider'}
  {...{
    align,
    'border-color': borderColor,
    'border-style': borderStyle,
    'border-width': borderWidth,
    'container-background-color': containerBackgroundColor,
    'css-class': cssClass,
    padding,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    width
  }}
>
</svelte:element>

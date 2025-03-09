<script lang="ts">
  export let backgroundColor: string | undefined = undefined;
  export let backgroundPosition: string | undefined = undefined;
  export let backgroundPositionX: string | undefined = undefined;
  export let backgroundPositionY: string | undefined = undefined;
  export let backgroundRepeat: string | undefined = undefined;
  export let backgroundSize: string | undefined = undefined;
  export let backgroundUrl: string | undefined = undefined;
  export let border: string | undefined = undefined;
  export let borderBottom: string | undefined = undefined;
  export let borderLeft: string | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let borderRight: string | undefined = undefined;
  export let borderTop: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let direction: 'ltr' | 'rtl' | undefined = undefined;
  export let fullWidth: string | undefined = undefined;
  export let padding: string | undefined = undefined;
  export let paddingBottom: string | undefined = undefined;
  export let paddingLeft: string | undefined = undefined;
  export let paddingRight: string | undefined = undefined;
  export let paddingTop: string | undefined = undefined;
  export let textAlign: string | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-section'}
  {...{
    'background-color': backgroundColor,
    'background-position': backgroundPosition,
    'background-position-x': backgroundPositionX,
    'background-position-y': backgroundPositionY,
    'background-repeat': backgroundRepeat,
    'background-size': backgroundSize,
    'background-url': backgroundUrl,
    border,
    'border-bottom': borderBottom,
    'border-left': borderLeft,
    'border-radius': borderRadius,
    'border-right': borderRight,
    'border-top': borderTop,
    'css-class': cssClass,
    direction,
    'full-width': fullWidth,
    padding,
    'padding-bottom': paddingBottom,
    'padding-left': paddingLeft,
    'padding-right': paddingRight,
    'padding-top': paddingTop,
    'text-align': textAlign
  }}
>
  {@render children()}
</svelte:element>

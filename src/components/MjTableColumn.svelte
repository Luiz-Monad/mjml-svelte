<script lang="ts">
  export let backgroundColor: string | undefined = undefined;
  export let border: string | undefined = undefined;
  export let borderBottom: string | undefined = undefined;
  export let borderLeft: string | undefined = undefined;
  export let borderRadius: string | undefined = undefined;
  export let borderRight: string | undefined = undefined;
  export let borderTop: string | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let height: string | number | undefined = undefined;
  export let padding: string | number | undefined = undefined;
  export let paddingBottom: string | number | undefined = undefined;
  export let paddingLeft: string | number | undefined = undefined;
  export let paddingRight: string | number | undefined = undefined;
  export let paddingTop: string | number | undefined = undefined;
  export let textAlign: 'left' | 'center' | 'right' | undefined = undefined;
  export let verticalAlign: 'top' | 'middle' | 'bottom' | undefined = undefined;
  export let width: string | number | undefined = undefined;
  export let children: (() => any) | undefined = undefined; //raw

  $: style = `
    ${backgroundColor ? `background-color: ${backgroundColor};` : ''}
    ${border ? `border: ${border};` : ''}
    ${borderBottom ? `border-bottom: ${borderBottom};` : ''}
    ${borderLeft ? `border-left: ${borderLeft};` : ''}
    ${borderRadius ? `border-radius: ${borderRadius};` : ''}
    ${borderRight ? `border-right: ${borderRight};` : ''}
    ${borderTop ? `border-top: ${borderTop};` : ''}
    ${height ? `height: ${typeof height === 'number' ? `${height}px` : height};` : ''}
    ${padding ? `padding: ${typeof padding === 'number' ? `${padding}px` : padding};` : ''}
    ${paddingBottom ? `padding-bottom: ${typeof paddingBottom === 'number' ? `${paddingBottom}px` : paddingBottom};` : ''}
    ${paddingLeft ? `padding-left: ${typeof paddingLeft === 'number' ? `${paddingLeft}px` : paddingLeft};` : ''}
    ${paddingRight ? `padding-right: ${typeof paddingRight === 'number' ? `${paddingRight}px` : paddingRight};` : ''}
    ${paddingTop ? `padding-top: ${typeof paddingTop === 'number' ? `${paddingTop}px` : paddingTop};` : ''}
    ${textAlign ? `text-align: ${textAlign};` : ''}
    ${verticalAlign ? `vertical-align: ${verticalAlign};` : ''}
    ${width ? `width: ${typeof width === 'number' ? `${width}px` : width};` : ''}
  `.trim();
</script>

<svelte:element
  this={'td'}
  {...{
    class: cssClass,
    style
  }}
>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>

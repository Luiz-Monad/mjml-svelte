<script lang="ts">
  export let width: string | undefined = undefined;
  export let verticalAlign: 'top' | 'middle' | 'bottom' | undefined = undefined;
  export let backgroundColor: string | undefined = undefined;
  export let direction: 'ltr' | 'rtl' | undefined = undefined;
  export let cssClass: string | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mj-group'}
  {...{
    width,
    'vertical-align': verticalAlign,
    'background-color': backgroundColor,
    direction,
    'css-class': cssClass
  }}
>
  {@render children()}
</svelte:element>

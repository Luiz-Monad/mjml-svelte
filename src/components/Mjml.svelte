<script lang="ts">
  export let owa: string | undefined = undefined;
  export let lang: string | undefined = undefined;
  export let dir: string | undefined = undefined;
  export let children: () => any;
</script>

<svelte:element
  this={'mjml'}
  {...{
    owa,
    lang,
    dir
  }}
>
  {@render children()}
</svelte:element>

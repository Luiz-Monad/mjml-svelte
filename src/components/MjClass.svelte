<script lang="ts">
  export let name: string;
</script>

<svelte:element this={'mj-class'} {name} {...$$restProps} />

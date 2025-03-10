<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  let showRawMail = false;
  let showRenderedMail = false;

  function toggleRawMail() {
    showRawMail = true;
    showRenderedMail = false;
  }

  function toggleRenderedMail() {
    showRawMail = false;
    showRenderedMail = true;
  }
</script>

<main>
  <h1>Mail Viewer</h1>

  <div class="links">
    <button on:click={toggleRenderedMail} class="button">View Rendered Mail</button>
    <button on:click={toggleRawMail} class="button">View Raw Mail HTML</button>
  </div>

  {#if showRenderedMail}
    <div class="rendered-mail-container">
      <h2>Rendered Mail</h2>
      <iframe title="mail" src="/mail" class="rendered-mail-iframe"></iframe>
    </div>
  {/if}

  {#if showRawMail}
    <div class="raw-mail-container">
      <h2>Raw Mail HTML</h2>
      <pre class="raw-html">{data.rawMailHtml}</pre>
    </div>
  {/if}
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: sans-serif;
  }

  h1 {
    color: #333;
    text-align: center;
  }

  .links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
  }

  .button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #4a86e8;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }

  .button:hover {
    background-color: #3a76d8;
  }

  .rendered-mail-container {
    margin-top: 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
  }

  .rendered-mail-iframe {
    width: 100%;
    height: 500px;
    border: none;
  }

  .raw-mail-container {
    margin-top: 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
  }

  .raw-html {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    white-space: pre-wrap;
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
  }
</style>

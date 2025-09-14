<script>
  let { class: className = "", onclick, expanded = false, children } = $props();
  const fallback = () => (expanded ? "Close" : "Menu");
</script>

<button aria-expanded={expanded} {onclick} class={className}>
  {@render (children ?? fallback)()}
</button>

<style>
  button {
    font-family: "Bull", monospace;
    font-variation-settings: "wght" 180;
    font-size: 1.4em;
    color: white;
    padding: 0.3em 1em;
    border: none;
    border-radius: 2em;
    background: hsla(0, 0%, 100%, 0.2);
    backdrop-filter: blur(15px);
    cursor: pointer;
  }
</style>

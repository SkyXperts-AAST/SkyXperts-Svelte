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
    border-radius: 9999px;
    padding: 0.45rem 0.9rem;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(15px);
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.28);
      border: 1px solid rgba(255, 255, 255, 0.09);
    }
  }
</style>

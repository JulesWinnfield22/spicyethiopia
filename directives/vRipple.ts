function ripple(ev: MouseEvent) {
  const btn = (ev.target as HTMLElement)?.classList?.contains?.("__ripple")
    ? (ev.target as HTMLElement)
    : (ev.target as HTMLElement)?.closest?.(".__ripple");

  const rippleChild =
    btn && (btn.querySelector(".__ripple_child") as HTMLElement);
  const x = ev.layerX;
  const y = ev.layerY;
  const width = btn?.clientWidth;

  rippleChild && rippleChild.style.setProperty("--x", `${x}px`);
  rippleChild && rippleChild.style.setProperty("--y", `${y}px`);
  rippleChild && rippleChild.style.setProperty("--btnWidth", `${width}px`);
  rippleChild && rippleChild && rippleChild.classList.add("__ripple_animation");

  setTimeout(() => {
    rippleChild &&
      rippleChild.classList &&
      rippleChild.classList.remove("__ripple_animation");
  }, 500);
}

const init = (el: HTMLElement, { value }: any) => {
  if (value) {
    el.style.setProperty("--ripple-clr", value);
  }
  el.classList.add("__ripple");
  el.addEventListener("click", ripple);
  const div = document.createElement("div");
  div.classList.add("__ripple_child");
  el.appendChild(div);
}

export default {
  mounted: init,
  updated: init,
  unmounted: (el: HTMLElement) => {
    el.removeEventListener("click", ripple);
  },
};

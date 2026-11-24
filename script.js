const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
const $ = (s) => document.querySelector(s);
// brilho que segue o cursor
addEventListener("pointermove", (e) => {
  document.body.style.setProperty("--gx", e.clientX + "px");
  document.body.style.setProperty("--gy", e.clientY + "px");
});
// título com efeito de decodificação
(function () {
  const h = $("#h1"),
    t = h.dataset.text;
  if (rm) {
    h.textContent = t;
    return;
  }
  const ch = "01<>/{}#%";
  let i = 0;
  const id = setInterval(() => {
    h.textContent = t
      .split("")
      .map((c, k) =>
        c === " " || k < i ? c : ch[(Math.random() * ch.length) | 0],
      )
      .join("");
    i += 0.7;
    if (i >= t.length) {
      h.textContent = t;
      clearInterval(id);
    }
  }, 30);
})();
// comparador antes/depois
const scr = [...document.querySelectorAll(".scr")],
  th = [...document.querySelectorAll(".thumbs button")];
let cur = 0,
  timer;
function show(i) {
  cur = i;
  scr.forEach((s, k) => s.classList.toggle("on", k === i));
  th.forEach((b, k) => b.setAttribute("aria-pressed", k === i));
  $("#url").textContent = scr[i].dataset.url;
}
th.forEach((b, k) =>
  b.addEventListener("click", () => {
    clearInterval(timer);
    show(k);
  }),
);
$(".screens input").addEventListener("input", (e) =>
  $(".screens").style.setProperty("--p", e.target.value + "%"),
);
if (!rm) {
  timer = setInterval(() => show((cur + 1) % scr.length), 4500);
  $("#heroTilt").addEventListener("pointerenter", () => clearInterval(timer));
}
// inclinação 3D
if (!rm)
  document.querySelectorAll(".tilt").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      el.style.setProperty("--mx", (x + 0.5) * 100 + "%");
      el.style.setProperty("--my", (y + 0.5) * 100 + "%");
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });
// letreiro de tecnologias
$("#tk").innerHTML = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "Figma",
  "Acessibilidade",
  "Performance",
]
  .map((t) => `<span>${t}</span>`)
  .join("")
  .repeat(2);
// etapas: toque abre no celular
document
  .querySelectorAll(".steps li")
  .forEach((li) =>
    li.addEventListener("click", () => li.classList.toggle("on")),
  );

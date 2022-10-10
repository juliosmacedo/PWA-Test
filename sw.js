if (!self.define) {
  let e,
    s = {};
  const t = (t, c) => (
    (t = new URL(t + ".js", c).href),
    s[t] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = t), (e.onload = s), document.head.appendChild(e);
        } else (e = t), importScripts(t), s();
      }).then(() => {
        let e = s[t];
        if (!e) throw new Error(`Module ${t} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const r =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[r]) return;
    let n = {};
    const o = (e) => t(e, r),
      f = { module: { uri: r }, exports: n, require: o };
    s[r] = Promise.all(c.map((e) => f[e] || o(e))).then((e) => (i(...e), n));
  };
}
define(["./workbox-926a8ce9"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: "css/style.css", revision: "ec40f4c8ca310ac0eadf4ce9c8f681cf" },
        { url: "index.html", revision: "7d802fe41ff1c51224c22151a8ee251c" },
        { url: "js/scripts.js", revision: "ef08c8671941daae421a5dbaf3d78382" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    );
});
//# sourceMappingURL=sw.js.map

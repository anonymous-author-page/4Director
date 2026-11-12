// Rebuttal section: each [data-rb-player] block plays its videos in sync (81 frames, 16 fps),
// starts when it scrolls into view and pauses when it leaves.
(() => {
  const FPS = 16;
  const LAST = 80;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-rb-player]").forEach((root) => {
    const vids = Array.from(root.querySelectorAll("video"));
    if (!vids.length) return;
    const master = vids[0];
    const btn = root.querySelector(".rb-play");
    const scrub = root.querySelector(".rb-scrub");
    const label = root.querySelector(".rb-frame");
    let playing = false;
    let userPaused = false;

    const show = (f) => {
      if (scrub) scrub.value = String(f);
      if (label) label.textContent = `frame ${f} / ${LAST}`;
    };
    const play = () => {
      playing = true;
      if (btn) btn.textContent = "Pause";
      const t = master.currentTime;
      vids.forEach((v) => {
        if (v !== master && Math.abs(v.currentTime - t) > 0.05) v.currentTime = t;
        v.play().catch(() => {});
      });
    };
    const pause = () => {
      playing = false;
      if (btn) btn.textContent = "Play";
      vids.forEach((v) => v.pause());
    };

    if (btn) {
      btn.addEventListener("click", () => {
        if (playing) {
          userPaused = true;
          pause();
        } else {
          userPaused = false;
          play();
        }
      });
    }
    if (scrub) {
      scrub.addEventListener("input", () => {
        userPaused = true;
        pause();
        const f = Number(scrub.value);
        vids.forEach((v) => {
          try {
            v.currentTime = (f + 0.3) / FPS;
          } catch (e) {
            /* not loaded yet */
          }
        });
        show(f);
      });
    }

    const tick = () => {
      if (playing) {
        const t = master.currentTime;
        vids.forEach((v) => {
          if (v !== master && !v.seeking && Math.abs(v.currentTime - t) > 0.09) v.currentTime = t;
        });
        show(Math.min(LAST, Math.floor(t * FPS)));
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              vids.forEach((v) => {
                if (v.preload !== "auto") v.preload = "auto";
              });
              if (!reduce && !userPaused && !playing) play();
            } else if (playing) {
              pause();
            }
          });
        },
        { threshold: 0.2 },
      ).observe(root);
    }
  });

  // Interactive scenes (viser recordings): load each iframe the first time it scrolls into view.
  const scenes = Array.from(document.querySelectorAll("iframe[data-rb-src]"));
  if ("IntersectionObserver" in window) {
    const sceneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.src = entry.target.dataset.rbSrc;
          sceneObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "200px" },
    );
    scenes.forEach((f) => sceneObserver.observe(f));
  } else {
    scenes.forEach((f) => (f.src = f.dataset.rbSrc));
  }

  // Top-level view: the Rebuttal or the project page.
  const views = Array.from(document.querySelectorAll(".view-tab"));
  const setView = (view) => {
    if (!views.length || document.body.dataset.view === view) return;
    document.body.dataset.view = view;
    views.forEach((b) => {
      const on = b.dataset.view === view;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    // carousels and viewers of the project page measure themselves on resize
    if (view === "project") window.dispatchEvent(new Event("resize"));
  };
  views.forEach((b, i) => {
    b.addEventListener("click", () => {
      setView(b.dataset.view);
      history.replaceState(null, "", b.dataset.view === "project" ? "#project" : "#rebuttal");
    });
    b.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const next = views[(i + 1) % views.length];
      setView(next.dataset.view);
      next.focus();
    });
  });

  // One tab per reviewer. A link to a panel (#rb-ragw) or to a block inside it (#rebuttal-boat) opens that tab;
  // #project or a link into the project page opens the project view.
  const tabs = Array.from(document.querySelectorAll(".rb-tab"));
  const panelOf = (tab) => document.getElementById(tab.getAttribute("aria-controls"));
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      panelOf(t).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      select(tab);
      history.replaceState(null, "", `#${tab.getAttribute("aria-controls")}`);
    });
    tab.addEventListener("keydown", (e) => {
      const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (k === undefined) return;
      e.preventDefault();
      select(tabs[(k + tabs.length) % tabs.length], true);
    });
  });
  const openFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id === "project") {
      setView("project");
      return;
    }
    const target = id && document.getElementById(id);
    if (!target) return;
    if (target.closest("#rebuttal")) setView("rebuttal");
    else if (!target.closest(".publication-hero, .view-tabs")) setView("project");
    const panel = target.closest(".rb-panel");
    const tab = panel && tabs.find((t) => panelOf(t) === panel);
    if (tab) select(tab);
    requestAnimationFrame(() => target.scrollIntoView());
  };
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();

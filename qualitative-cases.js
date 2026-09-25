// Qualitative cases for both editions of the page.
//
//   index.html  -> data-edition="release"   the published, trimmed page
//   full.html   -> data-edition="full"      every case we have
//
// Every case below is in both editions. To drop one from the published page
// while keeping it in the full one, add   editions: ["full"]   to its entry.
// Cases without an `editions` field appear in both.

const DEFAULT_EDITIONS = ["release", "full"];

function currentEdition() {
  return document.body.dataset.edition === "full" ? "full" : "release";
}

function forEdition(cases) {
  const edition = currentEdition();
  return cases.filter(
    (item) => (item.editions || DEFAULT_EDITIONS).includes(edition),
  );
}

const BASELINE_METHODS = [
  ["MotionControl", "motionctrl-animatediff"],
  ["Perception as Control", "perception-as-control"],
  ["SymphoMotion", "symphomotion"],
  ["VerseCrafter", "versecrafter"],
];

const NO_GROUND_TRUTH_CASES = [
  {
    slug: "case-bear",
    editions: ["full"],
    title: "Bear · Object Rotation",
    description: "Clockwise 180° object rotation · Static camera.",
    viewerNote: "Cyan = Moving Foreground",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-01",
    title: "Black Swan · Object Rotation",
    description: "Clockwise 180° object rotation · Static camera.",
    viewerNote: "Cyan = Moving Foreground",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-02",
    title: "Boat · Object Rotation",
    description: "Clockwise 180° object rotation · Static camera.",
    viewerNote: "Cyan = Moving Foreground",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-03",
    editions: ["full"],
    title: "Boat · Camera Yaw −180°",
    description: "Static object · Camera yaw −180°.",
    viewerNote: "Blue = Moving Camera",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-04",
    title: "Breakdance Flare · Camera Yaw −180°",
    description: "Static object · Camera yaw −180°.",
    viewerNote: "Blue = Moving Camera",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-05",
    title: "Camel · Camera Yaw +120°",
    description: "Static object · Camera yaw +120°.",
    viewerNote: "Blue = Moving Camera",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-06",
    title: "Camel · Object Translation + Camera Follow",
    description:
      "Object moves left by 3 body widths · Parallel camera follow.",
    viewerNote: "Cyan = Foreground · Blue = Camera",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-07",
    title: "Car Roundabout · Object Rotation",
    description: "Clockwise 180° object rotation · Static camera.",
    viewerNote: "Cyan = Moving Foreground",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-08",
    editions: ["full"],
    title: "Car Shadow · Object Rotation",
    description: "Clockwise 180° object rotation · Static camera.",
    viewerNote: "Cyan = Moving Foreground",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-09",
    title: "Car Shadow · Camera Yaw +180°",
    description: "Static object · Camera yaw +180°.",
    viewerNote: "Blue = Moving Camera",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-10",
    editions: ["full"],
    title: "Cows · Object Translation + Camera Follow",
    description:
      "Object moves right by 3 body widths · Parallel camera follow.",
    viewerNote: "Cyan = Foreground · Blue = Camera",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-12",
    title: "Dog · Object Translation + Camera Follow",
    description:
      "Object moves left by 3 body widths · Parallel camera follow.",
    viewerNote: "Cyan = Foreground · Blue = Camera",
    result: ["V7-Rank16-LoRA", "v7-rank16-lora"],
  },
  {
    slug: "qual-13",
    title: "Dog Agility · Camera Yaw +120°",
    description: "Static object · Camera yaw +120°.",
    viewerNote: "Blue = Moving Camera",
    result: ["V5 / Wave Rotation", "v5-wave-rotation"],
  },
  {
    slug: "qual-14",
    title: "Elephant · Object Translation + Camera Follow",
    description:
      "Object moves left by 3 body widths · Parallel camera follow.",
    viewerNote: "Cyan = Foreground · Blue = Camera",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-15",
    editions: ["full"],
    title: "Flamingo · Object Rotation",
    description: "Clockwise 180° object rotation · Static camera.",
    viewerNote: "Cyan = Moving Foreground",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-16",
    title: "Koala · Object Rotation",
    description: "Clockwise 180° object rotation · Static camera.",
    viewerNote: "Cyan = Moving Foreground",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-17",
    title: "Libby · Object Rotation",
    description: "Clockwise 180° object rotation · Static camera.",
    viewerNote: "Cyan = Moving Foreground",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-18",
    editions: ["full"],
    title: "Libby · Camera Yaw +120°",
    description: "Static object · Camera yaw +120°.",
    viewerNote: "Blue = Moving Camera",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-19",
    title: "Mallard Water · Object Rotation",
    description: "Clockwise 180° object rotation · Static camera.",
    viewerNote: "Cyan = Moving Foreground",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-20",
    title: "Varanus Cage · Object Rotation",
    description: "Clockwise 180° object rotation · Static camera.",
    viewerNote: "Cyan = Moving Foreground",
    result: ["V5 / Wave Rotation", "v5-wave-rotation"],
  },
];

const GROUND_TRUTH_CASES = [
  {
    slug: "qual-21",
    editions: ["full"],
    title: "Reef Fish · Natural Motion",
    description:
      "Estimated rigid object and camera trajectories.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-22",
    editions: ["full"],
    title: "Runner · Natural Motion",
    description:
      "Estimated rigid object and camera trajectories.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-23",
    title: "Push-Ups · Articulated Motion",
    description:
      "Estimated rigid object and camera trajectories.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-25",
    editions: ["full"],
    title: "Two Runners · Multi-Object Motion",
    description:
      "Two rigid object trajectories and camera motion.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-26",
    editions: ["full"],
    title: "Motorcyclist · Natural Motion",
    description:
      "Estimated rigid object and camera trajectories.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-27",
    title: "Bearded Runner · Natural Motion",
    description:
      "Forward running motion through an outdoor training facility.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-28",
    editions: ["full"],
    title: "Forest Turnaround · Natural Motion",
    description:
      "A runner turns and moves away through an autumn forest.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-29",
    editions: ["full"],
    title: "Forest Jogger · Natural Motion",
    description:
      "Forward jogging motion along a forest path.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-30",
    editions: ["full"],
    title: "Shark · Natural Motion",
    description:
      "A shark swims and turns through an underwater scene.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-31",
    title: "Bridge Runner · Natural Motion",
    description:
      "A runner approaches the camera along a bridge.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-32",
    editions: ["full"],
    title: "Lakeside Runner · Natural Motion",
    description:
      "Forward running motion along a lakeside stone path.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-33",
    editions: ["full"],
    title: "Stadium Runner · Natural Motion",
    description:
      "Lateral running motion across an outdoor track.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-34",
    editions: ["full"],
    title: "Horse Rider · Natural Motion",
    description:
      "A mounted rider advances along a forest path.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-35",
    editions: ["full"],
    title: "Courtyard Runner · Natural Motion",
    description:
      "Forward running motion through a stone courtyard.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-36",
    editions: ["full"],
    title: "Twilight Forest Runner · Natural Motion",
    description:
      "Forward running motion across dim forest terrain.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-37",
    editions: ["full"],
    title: "Skier · Natural Motion",
    description:
      "A skier descends through an alpine landscape.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-38",
    editions: ["full"],
    title: "Crouching Character · Game Motion",
    description:
      "Cautious crouching motion along a village path.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-39",
    editions: ["full"],
    title: "Ancient Courtyard · Game Motion",
    description:
      "Forward character motion through a populated courtyard.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-40",
    editions: ["full"],
    title: "Cloaked Character · Game Motion",
    description:
      "A cloaked character advances through an ornate hall.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-41",
    editions: ["full"],
    title: "Sports Car · Natural Motion",
    description:
      "A sports car follows a winding mountain road.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-42",
    editions: ["full"],
    title: "Armored Character · Game Motion",
    description:
      "Forward character motion across an open field.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-43",
    editions: ["full"],
    title: "Shielded Warrior · Game Motion",
    description:
      "A shielded warrior advances along a rural path.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-44",
    editions: ["full"],
    title: "Sword-Fighting Warrior · Game Motion",
    description:
      "Combat motion inside an ancient stone temple.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-45",
    editions: ["full"],
    title: "Ornate Hall Character · Game Motion",
    description:
      "Crouch-to-stand motion through an ornate indoor hall.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
  {
    slug: "qual-46",
    editions: ["full"],
    title: "Rooftop Jump · Game Motion",
    description:
      "Rooftop jump and landing motion in an ancient city.",
    result: ["V7 for VACE", "v7-full-vace"],
  },
];

function baselineFigure(slug, label, methodSlug) {
  return `
    <figure class="media-card">
      <figcaption class="media-title">${label}</figcaption>
      <div class="media-frame">
        <video muted loop playsinline preload="none" data-lazy-video>
          <source
            data-src="./assets/${slug}-${methodSlug}.mp4"
            type="video/mp4"
          >
        </video>
      </div>
    </figure>
  `;
}

function qualitativeCase(caseData, index, carouselId, totalCases) {
  // Ground truth is deliberately not shown: every case is presented against
  // the same baselines so the rows stay comparable.
  return `
    <article
      id="${carouselId}-slide-${index}"
      class="qualitative-case"
      data-carousel-slide
      role="group"
      aria-roledescription="slide"
      aria-label="${index + 1} of ${totalCases}"
    >
      <header class="qualitative-case-heading">
        <h3>${caseData.title}</h3>
        <p>${caseData.description}</p>
      </header>

      <div class="qualitative-context-row">
        <figure class="media-card">
          <figcaption class="media-title">Input Image</figcaption>
          <div class="media-frame">
            <img
              src="./assets/${caseData.slug}-input.png"
              alt="Input image for ${caseData.title}"
              loading="lazy"
            >
          </div>
        </figure>
      </div>

      <div class="qualitative-hero-row">
        <figure class="media-card">
          <figcaption class="media-title">4D Scene Visualization<small>Interactive</small></figcaption>
          <div class="media-frame">
            <iframe
              data-lazy-iframe
              data-src="./viser-client/?playbackPath=../assets/${caseData.slug}-scene.viser"
              title="Interactive point cloud for ${caseData.title}"
              loading="lazy"
              allow="fullscreen"
            ></iframe>
          </div>
        </figure>

        <figure class="media-card">
          <figcaption class="media-title">4Director (Ours)</figcaption>
          <div class="media-frame">
            <video muted loop playsinline preload="none" data-lazy-video>
              <source
                data-src="./assets/${caseData.slug}-${caseData.result[1]}.mp4"
                type="video/mp4"
              >
            </video>
          </div>
        </figure>
      </div>

      <h4 class="baseline-output-title">Previous Works</h4>
      <div class="qualitative-baseline-row">
        ${BASELINE_METHODS
          .map(([label, methodSlug]) =>
            baselineFigure(caseData.slug, label, methodSlug),
          )
          .join("")}
      </div>
    </article>
  `;
}

function createCarousel(
  root,
  cases,
  {
    id,
    label,
    renderSlide = qualitativeCase,
    renderProgress,
    navigator = false,
    progressBar = true,
  },
) {
  if (!root) {
    return;
  }
  if (cases.length === 0) {
    root.remove();
    return;
  }
  const totalCases = cases.length;
  // The navigator doubles as the position readout, so it also appears when
  // only the bar and the counter are wanted.
  const progressMarkup = renderProgress
    ? `
      <div class="qualitative-progress">
        <div class="qualitative-progress-heading">
          <span>
            <span class="qualitative-progress-kicker">${label}</span>
            <span class="qualitative-progress-current-title"></span>
          </span>
          <span class="qualitative-progress-count">
            <strong>1</strong> / ${totalCases}
          </span>
        </div>
        ${progressBar
          ? `<div class="qualitative-progress-bar" aria-hidden="true"><span></span></div>`
          : ""}
        ${navigator
          ? `<div class="qualitative-progress-list">
               ${cases
                 .map((caseData, index) =>
                   renderProgress(caseData, index, id, totalCases),
                 )
                 .join("")}
             </div>`
          : ""}
      </div>
    `
    : "";
  root.innerHTML = `
    <div
      class="qualitative-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="${label}"
      tabindex="0"
    >
      ${progressMarkup}
      <div class="qualitative-carousel-stage">
        <div class="qualitative-carousel-viewport">
          <div class="qualitative-carousel-track">
            ${cases
              .map((caseData, index) =>
                renderSlide(caseData, index, id, totalCases),
              )
              .join("")}
          </div>
        </div>
        <button
          class="qualitative-carousel-button is-previous"
          type="button"
          aria-label="Previous case in ${label}"
        >&#8249;</button>
        <button
          class="qualitative-carousel-button is-next"
          type="button"
          aria-label="Next case in ${label}"
        >&#8250;</button>
      </div>
      <p class="qualitative-carousel-status" aria-live="polite"></p>
    </div>
  `;

  const carousel = root.querySelector(".qualitative-carousel");
  const carouselTrack = carousel.querySelector(
    ".qualitative-carousel-track",
  );
  const carouselSlides = Array.from(
    carousel.querySelectorAll("[data-carousel-slide]"),
  );
  const previousButton = carousel.querySelector(".is-previous");
  const nextButton = carousel.querySelector(".is-next");
  const carouselStatus = carousel.querySelector(
    ".qualitative-carousel-status",
  );
  const progressTitle = carousel.querySelector(
    ".qualitative-progress-current-title",
  );
  const progressCount = carousel.querySelector(
    ".qualitative-progress-count strong",
  );
  const progressFill = carousel.querySelector(
    ".qualitative-progress-bar > span",
  );
  const progressList = carousel.querySelector(".qualitative-progress-list");
  const progressItems = Array.from(
    carousel.querySelectorAll(".qualitative-progress-item"),
  );
  let currentSlide = 0;

  function showSlide(index) {
    currentSlide = Math.max(
      0,
      Math.min(index, carouselSlides.length - 1),
    );
    carouselTrack.style.transform =
      `translateX(-${currentSlide * 100}%)`;
    carouselSlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentSlide;
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.inert = !isActive;
    });
    previousButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === carouselSlides.length - 1;
    carouselStatus.textContent =
      `${currentSlide + 1} / ${carouselSlides.length} · ` +
      cases[currentSlide].title;
    updateProgress();
    carousel.dataset.ready = "true";
  }

  function updateProgress() {
    if (progressTitle) {
      progressTitle.textContent = cases[currentSlide].title;
    }
    if (progressCount) {
      progressCount.textContent = String(currentSlide + 1);
    }
    if (progressFill) {
      progressFill.style.width =
        `${((currentSlide + 1) / carouselSlides.length) * 100}%`;
    }
    progressItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === currentSlide);
      item.classList.toggle("is-complete", itemIndex < currentSlide);
      if (itemIndex === currentSlide) {
        item.setAttribute("aria-current", "true");
      } else {
        item.removeAttribute("aria-current");
      }
    });
    const active = progressItems[currentSlide];
    if (active && progressList) {
      // Keep the active card in view without scrolling the page to it.
      const offset =
        active.offsetLeft
        - (progressList.clientWidth - active.offsetWidth) / 2;
      progressList.scrollTo({ left: Math.max(offset, 0), behavior: "smooth" });
    }
  }

  progressItems.forEach((item) => {
    item.addEventListener("click", () => {
      showSlide(Number(item.dataset.progressIndex));
    });
  });

  previousButton.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(currentSlide - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(currentSlide + 1);
    }
  });

  let touchStartX = null;
  const carouselViewport = carousel.querySelector(
    ".qualitative-carousel-viewport",
  );
  carouselViewport.addEventListener(
    "touchstart",
    (event) => {
      if (event.target.closest(".qualitative-baseline-row")) {
        return;
      }
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true },
  );
  carouselViewport.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX === null) {
        return;
      }
      const distance = event.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(distance) < 50) {
        return;
      }
      showSlide(currentSlide + (distance < 0 ? 1 : -1));
    },
    { passive: true },
  );

  showSlide(0);
}

// One window over every case; the split into "with"/"without ground truth"
// is gone now that ground truth is not displayed.
createCarousel(
  document.querySelector("#qualitative-cases"),
  forEdition([...NO_GROUND_TRUTH_CASES, ...GROUND_TRUTH_CASES]),
  {
    id: "qualitative",
    label: "Qualitative comparison",
    renderProgress: (caseData, index, carouselId, total) => `
      <button
        class="qualitative-progress-item"
        type="button"
        data-progress-index="${index}"
        aria-controls="${carouselId}-slide-${index}"
        aria-label="Show case ${index + 1} of ${total}: ${caseData.title}"
      >
        <span class="qualitative-progress-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="qualitative-progress-copy">
          <strong>${caseData.title}</strong>
          <small>${caseData.description}</small>
        </span>
      </button>
    `,
    navigator: true,
  },
);

// A control and the result it drove only read as a pair when they show the same
// frame. Inside a group marked data-video-sync, hold every clip at its first
// frame until they are all buffered, then start them in one go. Nudging
// currentTime instead would need range requests, which not every static host
// serves, and a refused seek drops the clip back to the start.
function startSyncGroup(group) {
  const videos = Array.from(group.querySelectorAll("video"));
  if (!videos.length || videos.some((video) => video.readyState < 3)) {
    return;
  }
  videos.forEach((video) => {
    video.play().catch(() => {});
  });
}

const SYNC_TOLERANCE = 0.04;
const SYNC_SEEK_THRESHOLD = 0.5;
const SYNC_MAX_RATE_TRIM = 0.08;

function bufferedCovers(video, time) {
  for (let index = 0; index < video.buffered.length; index += 1) {
    if (time >= video.buffered.start(index) && time <= video.buffered.end(index)) {
      return true;
    }
  }
  return false;
}

// Clips that started together can still creep apart when a machine decodes some
// of them slower than real time. Small gaps close by trimming playback rate,
// which never stalls; a large gap is worth a seek, but only into data the clip
// already holds, so a host that refuses range requests is left alone.
function correctSyncDrift() {
  document.querySelectorAll("[data-video-sync]").forEach((group) => {
    const playing = Array.from(group.querySelectorAll("video")).filter(
      (video) => !video.paused && video.readyState >= 3,
    );
    if (playing.length < 2) {
      return;
    }
    const [leader, ...followers] = playing;
    const period = leader.duration;
    if (!Number.isFinite(period)) {
      return;
    }
    followers.forEach((video) => {
      if (Math.abs(video.duration - period) > 0.05) {
        return;
      }
      let delta = (video.currentTime - leader.currentTime) % period;
      if (delta > period / 2) {
        delta -= period;
      } else if (delta < -period / 2) {
        delta += period;
      }
      if (Math.abs(delta) <= SYNC_TOLERANCE) {
        if (video.playbackRate !== 1) {
          video.playbackRate = 1;
        }
        return;
      }
      if (
        Math.abs(delta) > SYNC_SEEK_THRESHOLD &&
        bufferedCovers(video, leader.currentTime)
      ) {
        video.playbackRate = 1;
        video.currentTime = leader.currentTime;
        return;
      }
      const trim = Math.max(
        -SYNC_MAX_RATE_TRIM,
        Math.min(SYNC_MAX_RATE_TRIM, -delta / 2),
      );
      video.playbackRate = 1 + trim;
    });
  });
}

setInterval(correctSyncDrift, 1000);

function watchSyncGroups(root = document) {
  root.querySelectorAll("[data-video-sync]").forEach((group) => {
    if (group.dataset.syncWatched) {
      return;
    }
    group.dataset.syncWatched = "true";
    group.querySelectorAll("video").forEach((video) => {
      video.addEventListener("canplaythrough", () => startSyncGroup(group));
    });
  });
}

// Bumped whenever the exported media changes. Assets keep their file names
// across re-exports, and a re-export can even carry an older modified time than
// the copy a browser already holds, which leaves stale media cached.
const ASSET_VERSION = "20260912g";

function versioned(url) {
  return `${url}${url.includes("?") ? "&" : "?"}v=${ASSET_VERSION}`;
}

function loadVideo(video) {
  const source = video.querySelector("source[data-src]");
  if (source) {
    source.src = versioned(source.dataset.src);
    source.removeAttribute("data-src");
    video.load();
  }
  const group = video.closest("[data-video-sync]");
  if (group) {
    startSyncGroup(group);
    return;
  }
  video.play().catch(() => {});
}

const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        loadVideo(video);
      } else {
        video.pause();
      }
    });
  },
  { rootMargin: "400px 0px" },
);



const iframeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const iframe = entry.target;
      if (entry.isIntersecting) {
        if (!iframe.dataset.loaded) {
          iframe.src = versioned(iframe.dataset.src);
          iframe.dataset.loaded = "true";
        }
      } else if (iframe.dataset.loaded) {
        iframe.removeAttribute("src");
        delete iframe.dataset.loaded;
      }
    });
  },
  { rootMargin: "500px 0px" },
);

// teaser.js mounts its blocks after this file runs, so it re-uses this to
// register whatever it just built.
function observeLazyMedia(root = document) {
  watchSyncGroups(root);
  root.querySelectorAll("[data-lazy-video]").forEach((video) => {
    videoObserver.observe(video);
  });
  root.querySelectorAll("[data-lazy-iframe]").forEach((iframe) => {
    iframeObserver.observe(iframe);
  });
}

observeLazyMedia();

window.PuppeteerPage = { createCarousel, observeLazyMedia, versioned };

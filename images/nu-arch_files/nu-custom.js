// top-level v9 custom scripts

// video play/pause toggle
document.querySelectorAll('.video').forEach(videoContainer => {
    const button = videoContainer.querySelector('.video-toggle');
    const video = videoContainer.querySelector('video');

    if (!button || !video) return; // ensure button and video exist

    button.addEventListener('click', () => {
        const isPaused = video.paused;
        video[isPaused ? 'play' : 'pause']();
        button.innerHTML = `
            <span>Click to ${isPaused ? 'pause' : 'play'} video</span>
            <span class='${isPaused ? 'pause' : 'play'}'></span>
        `;
    });

    video.addEventListener('ended', () => {
        button.innerHTML = `
            <span>Click to play video</span>
            <span class='play'></span>
        `;
    });
});

// modal - changes z-index on #top-nav when visible
document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.querySelector("#dialog");
    if (!dialog) return;

    let styleTag = document.querySelector("#dynamic-style") ||
        Object.assign(document.head.appendChild(document.createElement("style")), {
            id: "dynamic-style"
        });

    const updateStyle = () => {
        styleTag.textContent = dialog.getAttribute("aria-hidden") !== "true" ? "#top-nav { z-index: 1; }" : "";
    };

    updateStyle();
    new MutationObserver(updateStyle).observe(dialog, {
        attributes: true,
        attributeFilter: ["aria-hidden"]
    });
});

// autoplay <video> when visible
document.addEventListener('DOMContentLoaded', function () {
    function playVideoWhenVisible(video) {
        // skip selectors
        const skipSelectors = ['.video-card', '.video-hero'];

        // do nothing if <video> is inside skip selectors
        if (skipSelectors.some(selector => video.closest(selector))) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // load the video source if not already loaded
                        if (!video.dataset.loaded) {
                            const sources = video.querySelectorAll('source');
                            sources.forEach(source => {
                                source.src = source.dataset.src || source.src; // Support lazy-loading
                            });
                            video.load();
                            video.dataset.loaded = "true";
                        }
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 } // trigger when 50% visible
        );

        observer.observe(video);
    }

    const videos = document.querySelectorAll('video');
    videos.forEach(playVideoWhenVisible);
});

// play video on hover
document.querySelectorAll('.video-card video').forEach(video => {
    // pause the video initially
    video.pause();

    // play video on mouseover
    video.addEventListener('mouseover', () => {
        video.play();
    });

    // pause video on mouseout
    video.addEventListener('mouseout', () => {
        video.pause();
    });

    // ensure the video loops (in case it stops for some reason)
    video.loop = true;
});

// audio player
document.addEventListener('DOMContentLoaded', () => {
    let currentlyPlayingAudio = null;

    document.querySelectorAll('.audio-player').forEach((audioPlayer, index) => {
        const audio = audioPlayer.querySelector('audio');
        const playPauseBtn = audioPlayer.querySelector('.play-button');
        const progressBar = audioPlayer.querySelector('.progress');
        const progressContainer = audioPlayer.querySelector('.progress-container');
        const currentTimeEl = audioPlayer.querySelector('.current-time');
        const durationEl = audioPlayer.querySelector('.duration');
        const a11yStatus = audioPlayer.querySelector('.a11y-status');
        const trackName = audioPlayer.querySelector('.track-name')?.textContent || `Audio ${index + 1}`;

        if (!audio || !playPauseBtn || !progressBar || !progressContainer || !currentTimeEl || !durationEl || !a11yStatus) return;

        audio._durationAnnounced = false;

        function togglePlayback() {
            if (audio.paused) {
                if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
                    currentlyPlayingAudio.pause();
                }

                if (!audio._durationAnnounced && !isNaN(audio.duration)) {
                    const mins = Math.floor(audio.duration / 60);
                    const secs = Math.floor(audio.duration % 60);
                    const timeStr = `${mins} minute${mins !== 1 ? 's' : ''} and ${secs} second${secs !== 1 ? 's' : ''}`;
                    a11yStatus.textContent = `Playing: ${trackName}. Duration: ${timeStr}.`;
                    audio._durationAnnounced = true;
                } else {
                    a11yStatus.textContent = `Playing: ${trackName}`;
                }

                audio.play();
                updatePlayPauseUI(true);
                currentlyPlayingAudio = audio;
            } else {
                audio.pause();
            }
        }

        function updatePlayPauseUI(isPlaying) {
            playPauseBtn.classList.toggle('play', !isPlaying);
            playPauseBtn.classList.toggle('pause', isPlaying);
            playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
            playPauseBtn.setAttribute('aria-pressed', String(isPlaying));
        }

        function formatTime(time) {
            const mins = Math.floor(time / 60);
            const secs = Math.floor(time % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        function updateProgress() {
            if (audio.duration > 0) {
                progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
                currentTimeEl.textContent = formatTime(audio.currentTime);
            }
        }

        function seekAudio(e) {
            const rect = progressContainer.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        }

        function announcePauseTimeRemaining() {
            const remaining = audio.duration - audio.currentTime;
            const mins = Math.floor(remaining / 60);
            const secs = Math.floor(remaining % 60);
            const minutesStr = mins > 0 ? `${mins} minute${mins !== 1 ? 's' : ''}` : '';
            const secondsStr = `${secs} second${secs !== 1 ? 's' : ''}`;
            const timeRemainingStr = [minutesStr, secondsStr].filter(Boolean).join(' and ');
            a11yStatus.textContent = `Paused. ${timeRemainingStr} remaining.`;
        }

        // event listeners
        playPauseBtn.addEventListener('click', togglePlayback);
        audio.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(audio.duration);
        });
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('pause', () => {
            updatePlayPauseUI(false);
            announcePauseTimeRemaining();
            if (currentlyPlayingAudio === audio) {
                currentlyPlayingAudio = null;
            }
        });
        audio.addEventListener('ended', () => {
            updatePlayPauseUI(false);
            a11yStatus.textContent = 'Playback ended';
            currentlyPlayingAudio = null;
        });
        progressContainer.addEventListener('click', seekAudio);
    });
});

// animated willy loop
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".animated-willy img");
    let currentIndex = 0;

    const showNextImage = () => {
        images.forEach((img, index) => {
            img.style.opacity = index === currentIndex ? "1" : "0";
            img.style.transition = "opacity 0.2s ease-in-out";
        });

        currentIndex = (currentIndex + 1) % images.length; // loop to the next image
        setTimeout(showNextImage, 500); // timing
    };

    if (images.length > 0) showNextImage(); // start animation if images exist
});

// timeline swiper initialization (history landing page)
const timelineSwiper = new Swiper(".timeline .swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    autoHeight: true,
    centeredSlides: true,
    grabCursor: "true",
    keyboard: {
        enabled: true
    },
    loop: false,
    speed: 500,
    effect: "slide",
    direction: "horizontal",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
        clickable: true
    },
});

// timeline swiper - move .swiper-nav on small screens
document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.querySelector('.timeline');
    const swiper = document.querySelector('.swiper');
    const swiperNav = document.querySelector('.swiper-nav');

    if (timeline && swiper && swiperNav) {
        const handleLayoutChange = () => {
            if (window.matchMedia('(max-width: 768px)').matches) {
                // move .swiper-nav below .swiper for small screens
                if (!swiper.nextElementSibling?.isEqualNode(swiperNav)) {
                    swiper.parentNode.insertBefore(swiperNav, swiper.nextSibling);
                }
            } else {
                // move .swiper-nav above .swiper for larger screens
                if (!swiper.previousElementSibling?.isEqualNode(swiperNav)) {
                    swiper.parentNode.insertBefore(swiperNav, swiper);
                }
            }
        };

        // Run on page load
        handleLayoutChange();

        // Add resize event listener
        window.addEventListener('resize', handleLayoutChange);
    }
});

// research carousel initialization (research impact page)
const researchSwiper = new Swiper(".research-carousel .swiper", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    grabCursor: "true",
    loop: true,
    speed: 250,
    parallax: true,
    watchSlidesProgress: true,
    centeredSlides: true,
    keyboard: {
        enabled: true,
    },
    breakpoints: {
        1000: {
            slidesPerView: 1.4,
            spaceBetween: 60,
        },
    },
    pagination: {
        el: ".swiper-pagination-2", // v4 carousel is .swiper-pagination to avoid conflicts
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        init: function() {
            if (location.hash == '#voices') {
                const targetEl = document.getElementById('voices');
                targetEl.scrollIntoView();
            }
        },
    }
});

// fade text effect (news-callout)
(function () {
    const typer = document.querySelector(".fade-text");
    if (!typer) return;

    const words = typer.getAttribute("data-words").split(',').map(w => w.trim());
    let wordIndex = 1;
    const fadeDuration = 500;
    const visibleDuration = 1500;
    let fadeTimeout = null;
    let isIntersecting = false;
    let isAnimating = false;

    function fade(from, to, duration, callback) {
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            typer.style.opacity = from + (to - from) * progress;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                callback?.();
            }
        }
        requestAnimationFrame(step);
    }

    function cycleNextWord() {
        if (!isIntersecting || isAnimating) return;
        isAnimating = true;
        fade(1, 0, fadeDuration, () => {
            typer.textContent = words[wordIndex];
            wordIndex = (wordIndex + 1) % words.length;
            fade(0, 1, fadeDuration, () => {
                isAnimating = false;

                fadeTimeout = setTimeout(cycleNextWord, visibleDuration);
            });
        });
    }

    function startCycle() {
        if (!fadeTimeout && !isAnimating) {
            fadeTimeout = setTimeout(cycleNextWord, visibleDuration);
        }
    }

    function stopCycle() {
        clearTimeout(fadeTimeout);
        fadeTimeout = null;
    }

    const observer = new IntersectionObserver(([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
            startCycle();
        } else {
            stopCycle();
        }
    }, {
        threshold: 0.1
    });

    typer.style.opacity = 1;

    observer.observe(typer);
})();

// news showcase initialization (home page)
const newsShowcaseSwiper = new Swiper(".news-showcase", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    autoHeight: true,
    //centeredSlides: true,
    grabCursor: "true",
    keyboard: {
        enabled: true
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
        },
    },
    loop: false,
    speed: 500,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
});

// priorities slider initialization (home page)
const prioritiesSwiper = new Swiper(".priorities-slider", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    autoHeight: true,
    //centeredSlides: true,
    grabCursor: "true",
    keyboard: {
        enabled: true
    },
    breakpoints: {
        1120: {
            slidesPerView: 4.4,
            slidesPerGroup: 4,
            spaceBetween: 20,
        },
        900: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 20,
        },
        700: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20,
        },
        480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
        },
    },
    loop: false,
    speed: 500,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
});

// Custom analytics: top level v9
newsShowcaseSwiper.on('realIndexChange', function () {
    // console.log('event: news_carousel_click');
    try {gtag('event', 'news_carousel_click');} catch(err) {}
});

prioritiesSwiper.on('realIndexChange', function () {
    // console.log('event: priority_carousel_click');
    try {gtag('event', 'priority_carousel_click');} catch(err) {}
});

timelineSwiper.on('realIndexChange', function () {
    // console.log('event: timeline_carousel_click');
    try {gtag('event', 'timeline_carousel_click');} catch(err) {}
});

researchSwiper.on('realIndexChange', function () {
    // console.log('event: research_carousel_click');
    try {gtag('event', 'research_carousel_click');} catch(err) {}
});

$(document).on('click', "#top-nav a", function(e){link(e, $(this), 'top_nav_click')});
$(document).on('click', "#mmenu a", function(e){
    try {gtag('event', 'mobile_nav_click', {'link_url': $(this).attr('href'), 'value': $(this).text()});} catch(err) {}
});
$(document).on('click', ".news-callout a, .news-showcase a", function(e){link(e, $(this), 'home_news_click')});
$(document).on('click', ".priorities-slider .swiper-slide a", function(e){link(e, $(this), 'home_priority_click')});
$(document).on('click', ".research-carousel .image-wrap a", function(e){link(e, $(this), 'research_carousel_image_click')});
$(document).on('click', "footer a", function(e){link(e, $(this), 'footer_click')});
$(document).on('click', ".jump-to a", function(e){link(e, $(this), 'jump_click')});
$(document).on('click', ".link-tiles a", function(e){link(e, $(this), 'link_tile_click')});
$(document).on('click', ".flip-card-wide a", function(e){link(e, $(this), 'flip_card_wide_click', $(this).find('div.cta').first().text())});
$(document).on('click', ".featured-events a", function(e){link(e, $(this), 'featured_event_click', $(this).find('h3').first().text())});
$(document).on('click', ".facts-icons .fact a", function(e){link(e, $(this), 'fact_icon_click')});
$(document).on('click', ".wysiwyg-background a:not(.button, .button-outline)", function(e){link(e, $(this), 'wysiwyg_bg_click')});
$(document).on('click', ".services-content a", function(e){link(e, $(this), 'role_service_click')});

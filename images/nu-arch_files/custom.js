// v4 custom js

$(document).ready(function () {

    // adds .responsive-table wrapper to tables
    $('table:not(.not-responsive)').each(function () {
        $(this).wrap('<div class="responsive-table"></div>');
    });

    // move .bottom-sidebar to end of .content
    $('.bottom-sidebar').appendTo('.content');
    
    // top navigation - if ul.basic-dropdown is used, add li.dropdown-relative parent class
    // this is to allow basic dropdowns to work alongside other dropdowns.
    $('.dropdown-basic').parent().addClass('dropdown-relative');
    
    // expand-collapse initialization
    new jQueryCollapse($(".expand-collapse"), {
        open: function () {
            this.slideDown(150);
        },
        close: function () {
            this.slideUp(150);
        }
    });
    // end expand-collapse

    $(".expand-collapse").bind("opened", function(e, section) {
        const value = section.$summary.text();
//         console.log('event: expander_open, value: ' + value);
        try {
            gtag('event', 'expander_open', {
              'value': value
            });
        } catch(err) {
            try {
                dataLayer.push({
                    'event': 'expander_open',
                    'value': value
                });
            } catch(err) {}
        }
    });

    $("a.button").click(function (e) {
        let url = $(this).attr('href');
        const value = $(this).text();
        if (!url.startsWith('http') || !url.startsWith('mailto')) {
            url = new URL(url, document.baseURI).href;
        }
//         console.log('event: button_click, url: ' + url + ', value: ' + value);
        try {
            gtag('event', 'button_click', {
                'value': value,
                'url': url
            });
        } catch (err) {
            try {
                dataLayer.push({
                    'event': 'button_click',
                    'value': value,
                    'url': url
                });
            } catch (err) {}
        }
    });
	
    // remove border on image anchors
    $('a img').parent().css('border', 'none');

    // scroll to top arrow
    $('footer').append('<a href="#top-bar" id="scrollup" aria-label="Return to the top of the page">Back to Top</a>');
    var amountScrolled = 200; // pixels scrolled before button appears
    $(window).scroll(function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('a#scrollup').fadeIn('slow');
        } else {
            $('a#scrollup').fadeOut('slow');
        }
    });
    
    // remove broken breadcrumb links ending in index with no file extension
    $('#breadcrumbs li a[href$="index"]').each(function () {
        $(this).parent().remove();
    });
    
    // initialize accordion tabs and set selected if hash matches panel
    $(".js-tabs").each(function (index) {
        let targetTab = 0;
        
        if (window.location.hash) {
            var hash = window.location.hash.substring(1);
            $(this).find('.js-tabs-panel').each(function (i) {
                if ($(this).attr('id') == hash) {
                    targetTab = i;
                }
            });
        }
        
        new AccordionTabs(this, {
            breakpoint: 640,
            tabsAllowed: true,
            selectedTab: targetTab,
            startCollapsed: true
        });
    });

    // watch tab controls and update hash
    $(".js-tabs-trigger, .js-accordion-trigger").click(function () {
        try {
            gtag('event', 'tab_click', {
              'value': $(this).text()
            });
        } catch (err) {
            try {
                dataLayer.push({
                    'event': 'tab_click',
                    'value': $(this).text()
                });
            } catch (err) {}
        }
        var targetid = $(this).attr('aria-controls');
        $(".js-tabs").each(function (index) {
            // Find open tab panels other than the one clicked and hide them
            $(this).find('.js-tabs-panel').each(function (i) {
                const tabPanel = $(this);
                const panelid = tabPanel.attr('id');
                if (panelid != targetid && tabPanel.hasClass('is-open')) {
                    closeTab(tabPanel, panelid);
                }
            });
        });
        window.location.hash = targetid;
    });
    
    function closeTab(tabPanel, panelid) {
        let tabTrigger = $('.js-tabs-trigger[aria-controls = "' + panelid + '"]');
        tabTrigger.removeClass('is-selected');
        tabTrigger.attr('aria-selected', false);
        tabTrigger.attr('tabindex', -1);
        let accordionTrigger = $('.js-accordion-trigger[aria-controls = "' + panelid + '"]');
        accordionTrigger.attr('aria-expanded', false);
        let panelContent = tabPanel.find('.tab-content');
        panelContent.attr('aria-hidden', true);
        panelContent.removeClass('is-open');
        panelContent.addClass('is-hidden');
        tabPanel.removeClass('is-open');
        tabPanel.addClass('is-hidden');
        tabPanel.attr('tabindex', -1);
    }
    
	// information popup box
	// minimize box on load
	$('.info-toggle').css('display', 'none');
	// toggle hide/show
	$(".info-box .header").click(function (e) {
		$('.info-toggle').slideToggle(function () {
			if ($(this).is(":visible")) {
				$(this).attr({'aria-hidden': 'false'});
			} else {
				$(this).attr({'aria-hidden': 'true'});
			}
		});
		e.preventDefault();
	});

    // Move image align classes to parent figure (if one exists)
    $('img[class^="horizontal-"], img[class^="vertical-"], img[class^="portrait-"]').each(function () {
        if ($(this).parent('figure').length > 0) {
            var cl = $(this).attr('class');
            $(this).removeClass().parent('figure').addClass(cl);
        }
    });
    
    // mmenu focus fix (ios/android) - crg
    const $body = $('body');
    const $closeButton = $('.mm-btn--close');
    const $burger = $('mm-burger');
    const $iconbarTop = $('.mm-iconbar__top');

    // move close button into iconbar
    $closeButton.prependTo($iconbarTop);

    // create a MutationObserver to detect body class changes
    const observer = new MutationObserver(function(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                // check for class on body
                if ($body.hasClass('mm-wrapper--opened')) {
                    // move focus to close button
                    $closeButton.focus();
                } else {
                    // remove focus from close button
                    $closeButton.blur();
                    // move focus to <mm-burger>
                    $burger.focus();
                }
            }
        }
    });
    // end mmenu focus fix
    
    // accessible #top-nav and #global-links dropdowns
    $("#top-nav, #global-links").each(function () {
        $(this).accessibleDropDown();
    });

    // obvserve for body changes
    observer.observe($body[0], { attributes: true });
    
}); // end ready event

// acccessible dropdowns (for #top-nav and #global-links)
$.fn.accessibleDropDown = function () {
    const el = $(this);
    $("a", el).focus(function () {
        $(this).parents("li").addClass("hover");
    }).blur(function () {
        $(this).parents("li").removeClass("hover");
    });
};

// jos animation initialization with default properties
JOS.init({
    animation: "fade",
    rootMargin: "10% 10% 10% 10%",
    once: true
});

// wrap youtube and vimeo iframes in .responsive-container
$(function () {
    $('iframe[src*="youtube.com"], iframe[src*="youtube-nocookie.com"], iframe[src*="vimeo.com"]').wrap('<div class="responsive-container"></div>');
});

// org chart (a11y-toggle)
function collapse(toggle) {
    var collapsibleBox = document.getElementById(toggle.getAttribute('data-a11y-toggle'));
    collapsibleBox.setAttribute('aria-hidden', true);
    toggle.setAttribute('aria-expanded', false);
}

function collapseAll(event) {
    toggles
        .filter(function (t) {
            return t !== event.target;
        })
        .forEach(collapse);
}

var toggles = Array.prototype.slice.call(
    document.querySelectorAll('.connected-toggles [data-a11y-toggle]')
);

toggles.forEach(function (toggle) {
    toggle.addEventListener('click', collapseAll);
});

// swiper carousel initialization (full-width page)
const swiper = new Swiper(".carousel .swiper", {
    slidesPerView: 1.3,
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
        900: {
            slidesPerView: 2.3,
            spaceBetween: 40,
        },
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// swiper news slideshow (full-width news and events module)
const newsSwiper = new Swiper('.news-slideshow', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    grabCursor: "true",
    keyboard: {
        enabled: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

// swiper image slideshow initialization (standard page)
const swiper2 = new Swiper('.image-slideshow', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    grabCursor: "true",
    keyboard: {
        enabled: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

// masonry for photo gallery (photoswipe) layout
var $grid = $('.photo-gallery').imagesLoaded(function() {
    $grid.masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 10
    });
});

// Custom analytics: v4
swiper.on('realIndexChange', function () {
//     console.log('event: carousel_click');
    try {gtag('event', 'carousel_click');} catch(err) {
        try {dataLayer.push({'event': 'carousel_click'});} catch(err) {}
    }    
});

swiper2.on('realIndexChange', function () {
//     console.log('event: carousel_click');
    try {gtag('event', 'carousel_click');} catch(err) {
        try {dataLayer.push({'event': 'carousel_click'});} catch(err) {}
    }
});

newsSwiper.on('realIndexChange', function () {
//     console.log('event: news_carousel_click');
    try {gtag('event', 'news_carousel_click');} catch(err) {
        try {dataLayer.push({'event': 'news_carousel_click'});} catch(err) {}
    }
});

$(document).on('click', "#global-links a", function(e){link(e, $(this), 'global_click')});
$(document).on('click', "#quick-links a", function(e){link(e, $(this), 'quick_click')});
$(document).on('click', "#alert-box", function(e){link(e, $(this), 'alert_click')});
$(document).on('click', ".flip-cards a, .flip-cards-2 a, .flip-cards-3 a", function(e){link(e, $(this), 'flip_card_click', $(this).find('h3').first().text())});
$(document).on('click', ".carousel .text a", function(e){link(e, $(this), 'carousel_link_click')});
$(document).on('click', ".social-media-cards a", function(e){link(e, $(this), 'social_card_click')});
$(document).on('click', ".featured-tiles a", function(e){link(e, $(this), 'featured_tile_click')});
$(document).on('click', ".large-feature a:not(.button, .button-outline)", function(e){link(e, $(this), 'large_feature_click')});
$(document).on('click', ".news-list a", function(e){link(e, $(this), 'news_click')});
$(document).on('click', ".stats a", function(e){link(e, $(this), 'stat_click')});
$(document).on('click', ".alternate-photo-float a:not(.button, .button-outline)", function(e){link(e, $(this), 'alt_photo_click')});
$(document).on('click', ".feature-box a:not(.button, .button-outline)", function(e){link(e, $(this), 'feature_box_click')});
$(document).on('click', ".horizontal-sidebar a:not(.button, .button-outline)", function(e){link(e, $(this), 'horiz_sidebar_click')});
$(document).on('click', ".info-module a:not(.button, .button-outline)", function(e){link(e, $(this), 'info_module_click')});
$(document).on('click', ".horizontal-icons a", function(e){link(e, $(this), 'horiz_icon_click')});
$(document).on('click', ".cta-showcase a:not([href='#'])", function(e){link(e, $(this), 'cta_showcase_click')});

function link(e, obj, cat, value) {
    const url = obj.attr('href');
    const newtab = (obj.attr('target') === '_blank' || e.metaKey || e.ctrlKey);
    if (value == undefined) {
        value = obj.text();
    }
//     console.log('event: ' + cat + ', link_url: ' + url + ', value: ' + value);
    // Callbacks ensure event is registered before leaving page
    try {
        gtag('event', cat, {
            'link_url': url,
            'value': value,
            'event_callback': function() {
                if (!newtab) {
                    e.preventDefault();
                    document.location = url;
                }            
            }
        });
    } catch (err) {
        // If no GA4 gtag(), try pushing to GTM data layer
        // (requires setting up triggers and variables)
        try {
            dataLayer.push({
                'event': cat,
                'link_url': url,
                'value': value,
                'eventCallback': function() {
                    if (!newtab) {
                        e.preventDefault();
                        document.location = url;
                    }
                }
            });
        } catch (err) {}
    }

}
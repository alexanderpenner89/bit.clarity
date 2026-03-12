/* ============================================================
   bit.transfer — Clarity Theme / app.js
   ============================================================ */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initFadeAnimations();
        initNavScroll();
        initStaggeredCards();
        initGewerkeSearch();
        initDossierSearch();
        initDossierFilters();
        fixFooterLinks();
        initDossiersNavHighlight();
    });

    /* ----------------------------------------------------------
       FADE-UP (IntersectionObserver)
       Elements with .fade-up get .visible when they enter viewport.
       ---------------------------------------------------------- */
    function initFadeAnimations() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.fade-up').forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

        document.querySelectorAll('.fade-up').forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ----------------------------------------------------------
       NAVBAR SCROLL SHADOW
       Adds .scrolled class after the user scrolls past 10px.
       ---------------------------------------------------------- */
    function initNavScroll() {
        var header = document.getElementById('site-header');
        if (!header) return;

        function update() {
            header.classList.toggle('scrolled', window.scrollY > 10);
        }

        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ----------------------------------------------------------
       STAGGERED CARD ENTRY ANIMATION
       Feed items animate in sequence on page load.
       ---------------------------------------------------------- */
    function initStaggeredCards() {
        var cards = document.querySelectorAll('.posts-feed .feed-item');
        if (!cards.length) return;

        cards.forEach(function (card, i) {
            card.style.animationDelay = (0.04 + i * 0.06) + 's';
            card.style.animationFillMode = 'both';
            card.style.animationName = 'cardFadeUp';
            card.style.animationDuration = '.7s';
            card.style.animationTimingFunction = 'cubic-bezier(.16,1,.3,1)';
        });

        // Inject keyframe if not already present
        if (!document.getElementById('card-keyframe')) {
            var style = document.createElement('style');
            style.id = 'card-keyframe';
            style.textContent = '@keyframes cardFadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }';
            document.head.appendChild(style);
        }
    }

    /* ----------------------------------------------------------
       FOOTER LINKS — absolute URL normalization
       Ghost navigation items without a leading slash are treated
       as relative to the current page URL by the browser.
       This converts them to absolute root-relative paths.
       ---------------------------------------------------------- */
    function fixFooterLinks() {
        var links = document.querySelectorAll('.footer-nav a');
        links.forEach(function (a) {
            var href = a.getAttribute('href');
            if (!href) return;
            // Already absolute or anchor-only → leave as-is
            if (/^(https?:\/\/|\/|#|mailto:|tel:)/.test(href)) return;
            // Relative slug → prepend root slash
            a.setAttribute('href', '/' + href);
        });
    }

    /* ----------------------------------------------------------
       GEWERKE PAGE — live search
       Hides .gewerk-card elements that don't match input.
       ---------------------------------------------------------- */
    function initGewerkeSearch() {
        var input = document.getElementById('gewerke-search');
        var noResults = document.getElementById('gewerke-no-results');
        if (!input) return;

        input.addEventListener('input', function () {
            var q = input.value.toLowerCase().trim();
            var cards = document.querySelectorAll('#gewerke-grid .gewerk-card');
            var visible = 0;

            cards.forEach(function (card) {
                var name = (card.dataset.name || '').toLowerCase();
                var desc = (card.dataset.desc || '').toLowerCase();
                var match = !q || name.includes(q) || desc.includes(q);
                card.hidden = !match;
                if (match) visible++;
            });

            if (noResults) noResults.hidden = (visible > 0 || !q);
        });
    }

    /* ----------------------------------------------------------
       DOSSIERS PAGE — live search
       Filters .dossier-item elements by title/tag/excerpt.
       ---------------------------------------------------------- */
    function initDossierSearch() {
        var input = document.getElementById('dossiers-search');
        if (!input) return;

        input.addEventListener('input', function () {
            applyDossierFilters();
        });
    }

    /* ----------------------------------------------------------
       DOSSIERS PAGE — category filter pills
       ---------------------------------------------------------- */
    function initDossierFilters() {
        var container = document.getElementById('dossiers-filters');
        if (!container) return;

        container.addEventListener('click', function (e) {
            var btn = e.target.closest('.dossier-filter-pill');
            if (!btn) return;

            container.querySelectorAll('.dossier-filter-pill').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            applyDossierFilters();
        });
    }

    /* ----------------------------------------------------------
       NAV HIGHLIGHT — mark "Dossiers" active on homepage
       Ghost's {{link_class}} only matches exact URLs, so the
       root URL "/" won't activate the "/dossiers/" nav link.
       This manually adds the active class when on "/" or "/dossiers/".
       ---------------------------------------------------------- */
    function initDossiersNavHighlight() {
        var path = window.location.pathname;
        var isDossiers = path === '/' || path === '/dossiers/' || path.indexOf('/dossiers/page/') === 0;
        if (!isDossiers) return;

        var navLinks = document.querySelectorAll('.site-nav a');
        navLinks.forEach(function (a) {
            var href = (a.getAttribute('href') || '').replace(/\/$/, '');
            if (href === '/dossiers' || href.endsWith('/dossiers')) {
                a.classList.add('nav-current');
            }
        });
    }

    function applyDossierFilters() {
        var searchInput  = document.getElementById('dossiers-search');
        var filterActive = document.querySelector('.dossier-filter-pill.active');
        var noResults    = document.getElementById('dossiers-no-results');
        var featured     = document.getElementById('dossiers-featured');

        var q      = searchInput  ? searchInput.value.toLowerCase().trim() : '';
        var filter = filterActive ? filterActive.dataset.filter : '';

        var items = document.querySelectorAll('#dossiers-list .dossier-item');
        var visible = 0;

        items.forEach(function (item) {
            var title   = (item.dataset.title   || '').toLowerCase();
            var tags    = (item.dataset.tags    || '').toLowerCase();
            var excerpt = (item.dataset.excerpt || '').toLowerCase();

            var matchSearch = !q      || title.includes(q) || tags.includes(q) || excerpt.includes(q);
            var matchFilter = !filter || tags.includes(filter);

            var show = matchSearch && matchFilter;
            item.hidden = !show;
            if (show) visible++;
        });

        if (noResults) noResults.hidden = (visible > 0 || (!q && !filter));

        // Hide the featured block when a filter/search is active
        if (featured) {
            featured.hidden = !!(q || filter);
        }
    }

})();

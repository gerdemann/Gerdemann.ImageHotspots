/**
 * Fix the position of the content boxes if they overlap from the viewport
 */
const fixMovingOfHotspotImages = () => {
    const hotspots = document.querySelectorAll(".imagehotspot-hotspot");
    hotspots.forEach(hotspot => {
        /** @type {HTMLElement} */
        const contentBox = hotspot.querySelector('.imagehotspot-hotspot__content-collapse');
        if (contentBox) {
            const bounding = contentBox.getBoundingClientRect();
            const dataTransformX = parseInt(contentBox.dataset.transformX) || 0;

            // Check if the content-box is out of the viewport on the right side
            if (bounding.right + (parseInt(contentBox.dataset.transformX) || 0) > (window.innerWidth || document.documentElement.clientWidth)) {
                const hotspotContainer = contentBox.closest('.imagehotspot-container');
                const moving = Math.abs(bounding.left + dataTransformX + bounding.width - hotspotContainer.clientWidth) + 15;

                contentBox.style.transform = 'translateX(' + (-moving) + 'px)';
                contentBox.dataset.transformX = moving;
            }
            else {
                // Reset the transformation if the content can be shown normal
                if (bounding.right + dataTransformX < (window.innerWidth || document.documentElement.clientWidth)) {
                    contentBox.style.transform = '';
                    contentBox.dataset.transformX = '0';
                }
            }
        }
    });
}

/**
 * Trigger an event if the viewport is no longer resized
 */
const resizeEndEvent = () => {
    let resizeId;
    const resizeEndEvent = new Event('resizeend');

    window.addEventListener('resize', () => {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 500);
    }, false);

    const doneResizing = () => {
        window.dispatchEvent(resizeEndEvent);
    }
}

/**
 * Show the content box of a hotspot and hide all other
 *
 * @param e{Event}
 */
const selectHotspot = (e) => {
    /** @type {HTMLElement} **/
    const clickedHotspot = e.target.closest('.imagehotspot-hotspot');
    /** @type {HTMLElement} **/
    const container = clickedHotspot.closest('.imagehotspot-container');

    const hotspots = container.querySelectorAll(".imagehotspot-hotspot");
    hotspots.forEach(hotspot => {
        if (hotspot === clickedHotspot) {
            hotspot.classList.toggle("imagehotspot-hotspot--selected");
        } else {
            hotspot.classList.remove("imagehotspot-hotspot--selected");
        }
    });
}

/**
 * Hide all content boxes if no image hotspot was clicked
 *
 * @param e{Event}
 */
const closeImageHotspots = (e) => {
    /** @type {HTMLElement} **/
    const clickedHotspot = e.target.closest('.imagehotspot-hotspot');
    /** @type {HTMLElement} **/
    const container = e.target.closest('.imagehotspot-container');

    if (!clickedHotspot) {
        const hotspots = container.querySelectorAll(".imagehotspot-hotspot");
        hotspots.forEach(hotspot => {
            hotspot.classList.remove('imagehotspot-hotspot--selected');
        });
    }
};

const initImageHotspots = () => {
    const imageHotspotContainers = document.querySelectorAll('.imagehotspot-container');
    imageHotspotContainers.forEach((container) => {
        container.dataset.initialized = '1';
        container.addEventListener(('ontouchstart' in window ? 'touchstart' : 'click'), closeImageHotspots, false);
    });

    const hotspots = document.querySelectorAll(".imagehotspot-hotspot");
    hotspots.forEach(hotspot => {
        const button = hotspot.querySelector('.imagehotspot-hotspot__button');
        button.addEventListener(('ontouchstart' in window ? 'touchstart' : 'click'), selectHotspot, {passive: true});
    });

    fixMovingOfHotspotImages();
    window.addEventListener('resizeend', fixMovingOfHotspotImages, {passive: true});
};

(() => {
    resizeEndEvent();
    initImageHotspots();

    // Fix for the neos-backend if some changes were applied and the hotspots are not reinitialized
    if (document.querySelector('body.neos-backend')) {
        document.documentElement.addEventListener('click', (e) => {
            const imageHotspotContainer = document.querySelector('.imagehotspot-container');

            if (imageHotspotContainer) {
                if (imageHotspotContainer.dataset.initialized !== '1') {
                    initImageHotspots();

                    const clickedHotspot = e.target.closest('.imagehotspot-hotspot');
                    if (clickedHotspot) {
                        clickedHotspot.classList.add("imagehotspot-hotspot--selected");
                    }
                }
            }
        }, {passive: true});
    }
})();

const selectHotspot = (e) => {
    const clickedHotspot = e.target.parentElement.parentElement;
    const container = clickedHotspot.parentElement;

    const hotspots = container.querySelectorAll(".imagehotspot-hotspot");
    hotspots.forEach(hotspot => {
        if (hotspot === clickedHotspot) {
            hotspot.classList.toggle("imagehotspot-hotspot--selected");
        } else {
            hotspot.classList.remove("imagehotspot-hotspot--selected");
        }
    });
}

(() => {
    const buttons = document.querySelectorAll(".imagehotspot-hotspot__button img");
    buttons.forEach(button => {
        button.addEventListener(('ontouchstart' in window ? 'touchstart' : 'click'), selectHotspot);
    });
})();

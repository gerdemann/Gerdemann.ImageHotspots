const changer = {}
changer['Gerdemann.ImageHotspots:Content.Hotspot'] = (node, property) => {
    const {name, updated, previous} = property;
    /** type HTMLElement */
    const el = neos.guestFrame.findElementByNode(node);
    const hotspot = querySelectClosest(el, '.imagehotspot-hotspot')
    switch (name) {
        case 'top':
            hotspot.style.top = updated + '%';
            break;
        case 'left':
            hotspot.style.left = updated + '%';
            break;
    }
}

// call the changer defined for a node by nodeType
const updateNode = (node, property) => {
    if (typeof changer[node.nodeType] !== "undefined") {
        changer[node.nodeType](node, property);
    }
}

document.addEventListener('Neos.NodeCommit', (event) => {
    const {node, property} = event.detail;
    updateNode(node, property)
})

document.addEventListener('Neos.NodeDiscard', (event) => {
    const {node, properties} = event.detail;
    properties.forEach(property => {
        updateNode(node, property)
    })
})

const querySelectClosest = (element, selector) => {
    if (element.matches(selector)) {
        return element;
    }
    return element.querySelector(selector)
}

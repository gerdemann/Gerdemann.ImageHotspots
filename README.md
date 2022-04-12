# Gerdemann.ImageHotspots

[![Latest Stable Version](http://poser.pugx.org/gerdemann/imagehotspots/v)](https://packagist.org/packages/gerdemann/imagehotspots)
[![License](http://poser.pugx.org/gerdemann/imagehotspots/license)](https://packagist.org/packages/gerdemann/imagehotspots)

**Attention!** This package is currently in development.

**ToDos:**
* Add support for editable PopUp Content 
* Support for Neos 8

## Installation

You can install the package via composer:

```bash
composer require gerdemann/imagehotspots
```

## Demo

![](Docs/Images/HotspotDemo.gif)

## Disable automatic CSS and JS

```
prototype(Neos.Neos:Page).hotspotStyles >
prototype(Neos.Neos:Page).hotspotJavaScript >
prototype(Neos.Neos:Page).hotspotBackendJavaScript >
```

*Hint*: Then you have to add your own JavaScript and CSS, otherwise the plugin does not work.

## Change icon fallback

Just overwrite the `Gerdemann.ImageHotspots:Utility.IconFallback` fusion prototype.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

# V'Lille

Small [React](https://facebook.github.io/react/) POC app displaying a map with bike renting stations in Lille, France.

## Usage

Make sure [NPM](https://www.npmjs.org/) is installed and the app's directory is available through a web browser.

```
npm install -g gulp
npm install
gulp
```

Enjoy !

## Proxy

Since the API in use is forbidding cross-domain AJAX requests, a small PHP proxy is provided. You thus need to be able to process PHP files in the app's directory.

## Open data FTW

This app avoids any proprietary software to handle map generation, making use of the power trio :
- [OpenStreetMap](https://www.openstreetmap.org), a collaborative mapping database
- [Leaflet](http://leafletjs.com/), a JS map rendering library
- [Mapbox](https://www.mapbox.com/), a map tiles and styles provider

## Credits

- Code : [neemzy](https://github.com/neemzy)
- [This article](http://mouth.sigill.org/acces-aux-donnees-vlille/) for disclosing the API's existence

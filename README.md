# Vlille

Small [React](https://facebook.github.io/react/) POC app displaying a map with bike renting stations in Lille, France.

## Usage

Make sure [NPM](https://www.npmjs.org/) is installed and the app's directory is available through a web browser.

```
npm install -g gulp
npm install
gulp
```

The last command crafts assets in the `dist/` folder and starts a livereload server for development. Use the `--dist` option to output minified assets and avoid that last part. Enjoy !

## Proxy

Since the API in use is forbidding cross-domain AJAX requests, a small PHP proxy is provided. You thus need to be able to process PHP files in the app's directory.

## Open data FTW

This app avoids using proprietary software to handle the map generation. It makes use of the power trio :
- [OpenStreetMap](https://www.openstreetmap.org), a collaborative mapping database
- [Leaflet](http://leafletjs.com/), a JS map rendering library
- [Mapbox](https://www.mapbox.com/), a map tiles and styles provider
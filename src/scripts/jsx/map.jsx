var React = require('react'),
    leaflet = require('leaflet'),
    reqwest = require('reqwest'),
    xml2js = require('xml2js'),
    Promise = require('promise');

// Explicit Leaflet's image path
leaflet.Icon.Default.imagePath = 'dist/images/';

module.exports = React.createClass({
    /** @type string Map DOM element id */
    id: 'map',

    /**
     * Fetches stations from XML API
     *
     * @return Promise
     */
    fetchStations: function() {
        return new Promise(function (resolve, reject) {
            reqwest({
                url: this.props.url,
                method: 'get',

                error: function(err) {
                    reject(err);
                },

                success: function(response) {
                    resolve(response);
                }
            });
        }.bind(this));
    },

    /**
     * Parses stations data from XML
     *
     * @return Promise
     */
    parseStations: function(xml) {
        return new Promise(function (resolve, reject) {
            xml2js.parseString(xml, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    var state = {
                            stations: [],
                            lat: result.markers.$.center_lat,
                            lng: result.markers.$.center_lng,
                            zoom: result.markers.$.zoom_level
                        },
                        markers = result.markers.marker;

                    for (var i in markers) {
                        state.stations.push(markers[i].$);
                    }

                    resolve(state);
                }
            });
        });
    },

    /**
     * Fetches a station's details from XML API
     *
     * @return Promise
     */
    fetchDetails: function(id) {
        return new Promise(function (resolve, reject) {
            reqwest({
                url: this.props.url + this.props.details + id,
                method: 'get',

                error: function(err) {
                    reject(err);
                },

                success: function(response) {
                    resolve(response);
                }
            })
        }.bind(this));
    },

    /**
     * Parses a station's data from XML
     *
     * @return Promise
     */
    parseDetails: function(xml) {
        return new Promise(function (resolve, reject) {
            xml2js.parseString(xml, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    for (var key in result.station) {
                        if (result.station.hasOwnProperty(key)) {
                            result.station[key] = result.station[key].join('');
                        }
                    }

                    resolve(result.station);
                }
            });
        });
    },

    /**
     * Initializes Leaflet map and markers
     */
    initMap: function() {
        var map = leaflet.map(this.id).setView([this.state.lat, this.state.lng], this.state.zoom);

        leaflet.tileLayer('http://api.tiles.mapbox.com/v4/neemzy.k7557jp1/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmVlbXp5IiwiYSI6IjBmemlNdlkifQ.CVRlu_n5CmWD0dP0JwwOdg', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
        }).addTo(map);

        for (i in this.state.stations) {
            var marker = leaflet.marker(
                [this.state.stations[i].lat, this.state.stations[i].lng],
                { title: this.state.stations[i].name }
            );

            marker.id = this.state.stations[i].id;

            // Attach callback to fetch realtime data
            marker.on('click', function (event) {
                this.fetchDetails(event.target.id)
                    .then(
                        function (response) {
                            return this.parseDetails(response);
                        }.bind(this)
                    )
                    .then(
                        function (details) {
                            var content = [
                                '<b>Adresse :</b> ' + details.adress,
                                '<b>Vélos disponibles :</b> ' + details.bikes,
                                '<b>Emplacements libres :</b> ' + details.attachs,
                                '<b>Borne CB :</b> ' + ('AVEC_TPE' == details.paiement ? 'Oui' : 'Non'),
                                '<b>Active :</b> ' + (!parseInt(details.status) ? 'Oui' : 'Non'),
                                '<b>Dernière mise à jour :</b> ' + details.lastupd
                            ];

                            event.target.bindPopup('<h3>' + event.target.options.title + '</h3>' + content.join('<br />')).openPopup();
                        }
                    )
                    .catch(
                        function (err) {
                            console.error(err);
                        }
                    );
            }.bind(this));

            marker.addTo(map);
        }
    },

    /**
     * @return {Object}
     */
    getInitialState: function() {
        return {
            stations: [],
            lat: 0,
            lng: 0,
            zoom: 0
        };
    },

    componentWillMount: function() {
        this.fetchStations()
            .then(
                function (response) {
                    return this.parseStations(response);
                }.bind(this)
            )
            .then(
                function (state) {
                    this.setState(state);
                    this.initMap();
                }.bind(this)
            )
            .catch(
                function (err) {
                    console.error(err);
                }
            );
    },

    /**
     * @return {Object}
     */
    render: function() {
        return (
            <div className="map" id={this.id}></div>
        );
    }
});
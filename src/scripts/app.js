(function () {
    'use strict';

    var React = require('react'),
        Map = require('./jsx/map'),

        app = React.renderComponent(
            Map({
                url: window.location.href.replace(/\/$/, '') + '/proxy.php',
                details: '?id='
            }),

            document.getElementById('vlille')
        );
})();
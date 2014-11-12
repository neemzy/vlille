(function () {
    'use strict';

    var React = require('react'),
        Map = require('./jsx/map'),

        app = React.renderComponent(
            Map({
                url: 'http://localhost/vlille/proxy.php',
                details: '?id='
            }),

            document.getElementById('vlille')
        );
})();
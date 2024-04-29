import React, { Component } from 'react';
import './Map.js';

class Map extends Component {
    map = null;
    autocomplete = null;
    infowindow = null;
    marker = null;

    componentDidMount() {
        this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC8FNwCEJYyxe03lAL_EgFZ2z6WeXA1x1w&libraries=places&callback=initMap", () => {
            this.initMap();
        });
    }

    loadScript = (url, callback) => {
        let script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) {  //IE
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    initMap = () => {
        // Your map initialization code here
    };

    render() {
        return (
            <div className="pac-card" id="pac-card">
                <div>
                    <div id="title">Autocomplete search</div>
                    <div id="type-selector" className="pac-controls">
                        <input type="radio" name="type" id="changetype-all" defaultChecked />
                        <label htmlFor="changetype-all">All</label>

                        <input type="radio" name="type" id="changetype-establishment" />
                        <label htmlFor="changetype-establishment">Establishments</label>

                        <input type="radio" name="type" id="changetype-address" />
                        <label htmlFor="changetype-address">Addresses</label>

                        <input type="radio" name="type" id="changetype-geocode" />
                        <label htmlFor="changetype-geocode">Geocodes</label>

                        <input type="radio" name="type" id="changetype-cities" />
                        <label htmlFor="changetype-cities">Cities</label>

                        <input type="radio" name="type" id="changetype-regions" />
                        <label htmlFor="changetype-regions">Regions</label>
                    </div>
                    <br />
                    <div id="strict-bounds-selector" className="pac-controls">
                        <input type="checkbox" id="use-location-bias" defaultChecked />
                        <label htmlFor="use-location-bias">Bias to map viewport</label>

                        <input type="checkbox" id="use-strict-bounds" />
                        <label htmlFor="use-strict-bounds">Strict bounds</label>
                    </div>
                </div>
                <div id="pac-container">
                    <input id="pac-input" type="text" placeholder="Enter a location" />
                </div>
                <div id="map"></div>
                <div id="infowindow-content">
                    <span id="place-name" className="title"></span><br />
                    <span id="place-address"></span>
                </div>
            </div>
        );
    }
}

export default Map;
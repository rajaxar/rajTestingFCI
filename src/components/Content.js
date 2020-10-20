import ResourceMap from './ResourceMap.js';
import WelcomeOverlay from './WelcomeOverlay.js';
import React, { Component } from 'react';
import axios from 'axios';
import Overlay from './Overlay'
import SearchBar from './SearchBar.js';

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

export default class Content extends Component {

    constructor() {
        super();
        this.state = {
            'allPins': [],
            'filteredPins': [],
            'viewPins': [],
            'tagFiltersApplied': [],
            'searchFiltersApplied': [],
            'locationPermissionGranted': false
        }
        this.applySearchFilters = this.applySearchFilters.bind(this)
    }

    async componentDidMount() {
        const res = await axios.get('mrt.json')
        
        for (var i = 0; i < res.data.length; i++) {
            res.data[i]['tags'] = res.data[i]['tags'].split(/[;\n]/)
            for (var j=0; j<res.data[i]['tags'].length; j++) {
                res.data[i]['tags'][j] = res.data[i]['tags'][j].trim()
            }

        }

        this.setState({
            'allPins': res.data,
            'filteredPins': res.data,
            'viewPins': res.data
        })
    }

    setViewPins = (vPins) => {
        this.setState({
            'viewPins': vPins
        })
    }

    getCountByTag = (tagName) => {
        if (tagName === "All") {
            return this.state.viewPins.length;
        }
        var c = 0;
        for (var i=0; i<this.state.viewPins.length; i++) {
            if (this.state.viewPins[i].tags.indexOf(tagName) >= 0) {
                c++;
            }
        }
        return c;
    }

    toggleTagFilter = (tagName) => {
        var tfa
        if (tagName === "All") {
            tfa = []
        } else if (this.state.tagFiltersApplied.indexOf(tagName) >= 0) {
            tfa = this.state.tagFiltersApplied.filter(e => e !== tagName)
        } else {
            tfa = [...this.state.tagFiltersApplied]
            tfa.push(tagName)
        }
        this.setState({
            tagFiltersApplied:tfa
        }, () => this.applyFilters())
    }

    filterByTag = (tagName, exclusive=false) => {
        var tfa = []
        if (tagName === "All") {
        } else {
            if (!exclusive) {
                tfa = [...this.state.tagFiltersApplied]
            }
            tfa.push(tagName)
        }
        this.setState({
            tagFiltersApplied:tfa
        }, () => this.applyFilters())
    }

    filterBySearch = (searchText) => {
        this.setState({
            searchFiltersApplied:[searchText]
        }, () => this.applyFilters())
    }

    applyFilters = () => {
        this.applyTagFilters()
    }

    applySearchFilters = () => {
        var fps = this.state.filteredPins

        var searchInPin = (text, pin) => {
            var result = ( pin.description.toLowerCase().includes(searchText.toLowerCase()) || pin.name.toLowerCase().includes(searchText.toLowerCase()) )
            return result
        }

        if (this.state.searchFiltersApplied.length === 0) {
             console.log("no search text")
         } else {
            var searchText = this.state.searchFiltersApplied[0]
            console.log(searchText)
            fps = fps.filter( (e) => {return searchInPin(searchText, e)})
        }
        this.setState({
            filteredPins:fps
        })
    }

    applyTagFilters = () => {
        var fps = []
        if (this.state.tagFiltersApplied.length > 0) {
            for (var i=0; i<this.state.viewPins.length; i++) {
                for (var j=0; j<this.state.viewPins[i].tags.length; j++) {
                    if (this.state.tagFiltersApplied.indexOf(this.state.viewPins[i].tags[j]) >= 0) {
                        fps.push(this.state.viewPins[i])
                        break
                    }
                }
            }
        } else {
            fps = this.state.viewPins
        }
        this.setState({
            filteredPins:fps
        }, () => {this.applySearchFilters()})
    }

    locateUser = () => {
        this.setState({
            locationPermissionGranted:true
        });
    }

    render() {
        return [
            <Overlay
                key="theOverlay"
                locateUser={this.locateUser}
                locationPermissionGranted={this.state.locationPermissionGranted}
                filterByTag={this.filterByTag}
            />,
            <ResourceMap
                pins={this.state.filteredPins}
                key="theResourceMap"
                locationPermissionGranted={this.state.locationPermissionGranted}
            />,
            <SearchBar
                filterBySearch={this.filterBySearch.bind(this)}
                numberOfResults={this.state.filteredPins.length}
                filteredPins={this.state.filteredPins}
                viewPins={this.state.viewPins}
                tagFiltersApplied={this.state.tagFiltersApplied}
                filterByTag={this.filterByTag}
                setViewPins={this.setViewPins.bind(this)}
                toggleTagFilter={this.toggleTagFilter.bind(this)}
                getCountByTag={this.getCountByTag.bind(this)}
                />
        ]
    }
}
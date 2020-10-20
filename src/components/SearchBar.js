import React, { Component, createRef, Ref } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ReactHtmlParser from 'react-html-parser';
import {i, categories} from '../resources.js';
import ResourceLayersControl from './ResourceLayersControl'
import { Button, Row, Col, Collapse } from 'react-bootstrap';

export default class SearchBar extends Component {

  constructor() {
    super()
    this.state = {
      searchText:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    event.persist()
    let txt = event.target.value
    this.setState({
      searchText: txt
    })
    if (this.state.searchActive) {
      this.clearSearch()
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.filterBySearch(this.state.searchText)
    if (this.state.searchText != '') {
      this.setState({
        searchActive: true
      })
    }
  }

  clearSearch = () => {
    this.setState({
      searchActive: false
    })
    this.props.filterBySearch('')
  }

  cancelSearch = () => {
    this.clearSearch()
    this.setState({
      searchText:''
    })
  }

  render () {
    return [
      <Container className="p-0 d-flex justify-content-center" id="searchBar">
        <Col>
          {this.state.searchActive ?
            <Card className="p-2 pl-4 mb-3 rounded-pill shadow-lg">
              <Row className="searchDesc">
                  <Col className="col-8">
                    <Row className="expander">
                      <Col className="col-8 d-flex align-items-center">
                        <span className="searchResultText">Searching for {this.state.searchText}</span>
                      </Col>
                      <Col className="col-4 d-flex align-items-center">
                        <span className="searchResultText">{this.props.numberOfResults} results</span>
                      </Col>
                    </Row>
                    
                  </Col>
                  <Col className='d-flex justify-content-end align-items-center col-4'>
                    <Button className="btn-danger clearSearchButton rounded-pill" onClick={this.cancelSearch.bind(this)}>clear search</Button>
                  </Col>
              </Row>
            </Card>
            :
            ''
          }
              
          <Row className="d-flex justify-content-end">
            <Card className="rlcCard p-1 pl-2 pr-2 shadow-lg">
              <ResourceLayersControl
                      filteredPins={this.props.filteredPins}
                      viewPins={this.props.viewPins}
                      tagFiltersApplied={this.props.tagFiltersApplied}
                      filterByTag={this.props.filterByTag}
                      setViewPins={this.props.setViewPins.bind(this)}
                      toggleTagFilter={this.props.toggleTagFilter.bind(this)}
                      getCountByTag={this.props.getCountByTag.bind(this)}
                      key="theResourceLayersControl"
                      />
              </Card>
          </Row>
          <Row>
            <form className='expander shadow-lg'>
              <div class="input-group input-group-lg pl-0">
                  <input
                        class="form-control my-0 py-1 form-control searchInput"
                        type="text"
                        placeholder="What are you looking for?"
                        aria-label="Search"
                        onChange={this.handleChange} 
                        value={this.state.searchText} />
                  <div class="input-group-append">
                      <input type="submit" value="Search" className="searchButton btn btn-primary btn-lg" onClick={this.handleSubmit}></input>
                  </div>
              </div>
            </form>
          </Row>
        </Col>
        </Container>
    ];
  }
}

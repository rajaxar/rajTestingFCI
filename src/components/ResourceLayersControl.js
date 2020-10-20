import React, { Component, createRef, Ref } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ReactHtmlParser from 'react-html-parser';
import {i, categories} from '../resources.js';
import { Button, Row, Col, Collapse } from 'react-bootstrap';

export default class ResourceLayersControl extends Component {

  constructor() {
    super();
    this.state = {
      'open': false
    }
  }

  showCategories = (setting=true) => {
    this.setState({
      'open': setting
    })
  }

  makeTagEntry(name, extraTag='') {
    return (
      <div className={"row d-flex align-items-middle tagEntry "+extraTag} onClick={this.props.filterByTag.bind(this, name, true)} data-tag={name}>
          {ReactHtmlParser( ("<i class='material-icons' value="+{name}+">"+i[name].iconName+'</i>') )}
          <span data-tag={name}>{name} <span className='resourceCount' data-tag={name}>({this.props.getCountByTag(name)})</span></span>
      </div>
    )
  }

  render () {
    var entries
    if (this.props.tagFiltersApplied.length === 0) {
      entries = [this.makeTagEntry("All", 'selectedTag')];
    } else {
      entries = [this.makeTagEntry("All")];
    }
    for (var rCat in categories) {
      if (this.props.tagFiltersApplied.indexOf(rCat) >= 0) {
        entries.push(this.makeTagEntry(rCat, 'selectedTag'));
      } else {
        entries.push(this.makeTagEntry(rCat));
      }
    }
    return (
        <div className="rlcBar p-0">
          <Row>
            <Col className="d-flex align-items-center">
              <a href='#'
                onClick={()=>this.showCategories(!this.state.open)}
                className="ml-auto rlcCollapse d-flex align-items-center"
                aria-expanded={this.state.open}
                aria-controls="resourceCategories">
                <p className="filterResourcesBtn m-1">{
                    (this.props.tagFiltersApplied.length == 0 || this.props.tagFiltersApplied[0] == 'All') ?
                    'Filter by Category'
                    :
                    'Filtering to show only ' + this.props.tagFiltersApplied
                }</p><i className='material-icons collapseIcon'>
                  {
                  this.state.open ?
                  'expand_more'
                  :
                  'expand_less'
                  }</i>
              </a>
            </Col>
          </Row>
          <Collapse in={this.state.open}>
            <div id="resourceCategories">
              <div className="col">{entries}</div>
            </div>
          </Collapse>
        </div>

      );
  }
}

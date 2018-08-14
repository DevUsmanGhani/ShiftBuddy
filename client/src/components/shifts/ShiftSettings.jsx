import _ from 'lodash';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FormGroup, FormControl, Button, Label, Grid, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getInventorySettings, addInventoryItem, deleteInventoryItem } from '../../actions/shifts/shiftsActions';
class ShiftSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.addInventoryItem(this.props.match.params.id, this.state);
    this.setState({ name: '' });
  }
  
  componentDidMount() {
    const managerId = this.props.match.params.id;
    this.props.getInventorySettings(`/api/managers/${managerId}/settings/inventory`)
  }

  renderItems() {
    if (_.isEmpty(this.props.inventoryItems)) {
      return (
        <div className="center">
          <Button className="center" bsStyle="danger" disabled>There are no items added</Button>
        </div>
      );
    }
    else {
      return _.map(this.props.inventoryItems, inventoryItem => {
        if(inventoryItem) {
          return (
            <Grid key={inventoryItem._id + 'grid'}>
              <Row key={inventoryItem._id + 'row'} className="inventory-container"> 
                <Col
                  className="inventory-header"
                  xs={2} 
                  xsOffset={4}
                  key={inventoryItem._id + 'name'}
                >
                  {inventoryItem.name}
                </Col>
                <Col
                className="delete-button"
                xs={1} 
                key={inventoryItem._id + 'delete'} 
                onClick={() => this.props.deleteInventoryItem(inventoryItem._id)}
                > 
                  <FontAwesomeIcon icon="times" fixedWidth/>
                </Col> 
              </Row>
            </Grid> 
          )}
          else{
            return null;
          }   
        })
      }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3} >
            <form onSubmit={this.onSubmit}>
              <h2 className="form-header">Inventory Settings</h2>
              <hr/>  
              <Label>Item Name: </Label>
              <Row>   
                <Col md={10}>
                  <FormGroup controlId="name" >
                    <FormControl
                      type="text"
                      name="name"
                      required
                      value={this.state.name}
                      placeholder="Enter Item Name"
                      onChange={this.onChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
          
                <Col md={2}>
                  <span className="center">
                    <Button type="submit" bsSize="small" bsStyle="warning">Add</Button>
                  </span>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
        {this.renderItems()}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  inventoryItems: state.shiftsData.inventoryItems
})

export default connect(mapStateToProps, { getInventorySettings, addInventoryItem, deleteInventoryItem })(ShiftSettings);

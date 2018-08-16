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
        <div className="no-items-added center" bsStyle="danger">There are no items added</div>
      );
    }
    else {
      console.log(_.map(this.props.inventoryItems, inventoryItem => inventoryItem));
      return _.map(this.props.inventoryItems, inventoryItem => {
        if(inventoryItem) {
          return (
            <span className="inventory-item">
                <span
                  className="inventory-item-name"
                  key={inventoryItem._id + 'name'}
                >
                  <span>{inventoryItem.name}</span>
                </span>
                <span
                className="inventory-item-delete"
                key={inventoryItem._id + 'delete'} 
                onClick={() => this.props.deleteInventoryItem(inventoryItem._id)}
                >  
                  <FontAwesomeIcon icon="times" fixedWidth/>
                </span> 
          </span>
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
                <Col xs={10}>
                  <FormGroup controlId="name" >
                    <FormControl
                      autoFocus
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
                <Col xs={2}>
                  <span className="center">
                    <Button type="submit" bsSize="small" bsStyle="warning">Add</Button>
                  </span>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
        <Row>
          <Col className="inventory-items-container"   md={10} mdOffset={1}>
          {this.props.inventoryItems ? <h2 className="inventory-items-header">Items</h2> : ""}
          { this.renderItems()}
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  inventoryItems: state.shiftsData.inventoryItems
})

export default connect(mapStateToProps, { getInventorySettings, addInventoryItem, deleteInventoryItem })(ShiftSettings);

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FormGroup, FormControl, Button, Label, Grid, Row, Col } from "react-bootstrap"; 
import { getInventorySettings } from '../../actions/shifts/shiftsActions';
class ShiftSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemName: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ itemName: '' });
    //this.props.createEmployee(this.props.managerId, this.state, () => this.props.history.push(`/managers/${this.props.managerId}/employees`));
  }
  componentDidMount() {
    const managerId = this.props.match.params.id;
    this.props.getInventorySettings(`/api/managers/${managerId}`)
  }

  renderItems() {
    if (!this.props.shiftSettings.inventory.length) {
      return (
        <div className="center">There are no items added</div>
      );
    }
  }

  render() {
    console.log(this.props.shiftSettings.inventory);
    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3} >
            <form >
              <h2 className="form-header">Inventory Settings</h2>
              <hr/>  
              <Label>Item Name: </Label>
              <Row>   
                <Col md={10}>
                  <FormGroup controlId="itemName" >
                    <FormControl
                      type="text"
                      name="itemName"
                      required
                      value={this.state.itemName}
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
  shiftSettings: state.shiftsData.settings
})

export default connect(mapStateToProps, { getInventorySettings })(ShiftSettings);

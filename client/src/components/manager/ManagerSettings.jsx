import React from 'react';
import { Button } from "react-bootstrap"; 
import { Grid, Row, Col } from 'react-bootstrap';

const ManagerSettings = () => {
  return (
    <Grid>
      <Row>
        <Col md={6} mdOffset={3} >
          <form >
            <h2 className="form-header">Manager Settings</h2>
            <hr/>  
            <div className="center">
              <Button className="settings-button" bsSize="large" bsStyle="warning" href="settings/account">Account Settings</Button>
            </div>
            <div className="center">
              <Button className="settings-button" bsSize="large" bsStyle="warning" href="settings/inventory">Inventory Settings</Button>
            </div>
          </form>
        </Col>
      </Row>
    </Grid>
  )
}

export default ManagerSettings

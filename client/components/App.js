import React from 'react';
import { Grid, Col, Row} from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

export default class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} className="home_content">
            <p> I am an app, yay! </p>
          </Col>
        </Row>
      </Grid>
    )
  }

}

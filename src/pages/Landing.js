import React from 'react'
import { Row, Col, Container} from 'react-bootstrap'
import '../index.css'
import Budget from '../images/budgetchecker.jpg'

const Landing = () => {
  return (
    <Container className="py-2 pl-0 ml-0" fluid>
        <Row className="justify-content-center">
            <Col sm={12} md={4}>
                <img className="responsive" src={Budget} alt='finance' width='520px' height='500px'/>
            </Col>
        </Row>
    </Container>
  )
}

export default Landing
import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row} from 'react-bootstrap'
import notFound from '../images/error.svg'

const NotFound = () => {
    return (
            <Container className="pt-3" fluid>
                <Row className="justify-content-center">
                    <Col sm={12} md={4} lg={3}>
                        <img src={notFound} alt="error" fluid='true' height={300} width={300}/>
                        <div className="text-center">
                            <h4>Page Not Found <Link to="/add-category">Go Back</Link></h4>
                        </div>
                    </Col>
                </Row>
            </Container>
    )
}

export default NotFound
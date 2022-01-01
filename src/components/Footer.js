import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='footer text-center' py-3='true' style={{ fontSize: 15 }}>
                        Copyright &copy; 2022 | Built by John Abichuela
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer

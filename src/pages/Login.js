import { React, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router'
import UserContext from '../UserContext'
import { Form, Row, Col, Container, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        let isEmailNotEmpty = email !== '';
        let isPasswordNotEmpty= password !== '';
        
        if(isEmailNotEmpty && isPasswordNotEmpty){
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }
    }, [email, password]);

    const login = (e) => {
        e.preventDefault();

        fetch('https://backend-budgetchecker.herokuapp.com/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {

            if(data.access !== undefined){
                localStorage.setItem('access', data.access);
                setUser({access: data.access});

                Swal.fire({
                    icon: "success",
                    text: "You are now logged in."
                });
                navigate('/add-category')
            }
            else{
                Swal.fire({
                    title: "Oooppss!!!",
                    icon: "error",
                    text: "Something went wrong. Check your credentials"
                })
            }
        })
    }

    if(user.access !== null){
        return <Navigate to="/add-category"/>
    }


    return (
        <Container className="py-4" fluid>
            <Row className="justify-content-center">
                <Col sm={12} md={4}>
                    <h3 className="text-center">Login</h3>
                    <Form onSubmit={login}>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="py-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                        </Form.Group>
                        <Button className="btn-block" variant="secondary" type="submit" disabled={isDisabled}>Login</Button>
                    </Form>
                    <div className="text-center py-3">
                        No account?{' '}<Link to={'/register'}>Register</Link>  
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
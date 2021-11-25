// Base imports
import  React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router'
import UserContext from '../UserContext'
import { Form, Row, Col, Container, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] =  useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        let isNameNotEmpty = name !== '';
        let isEmailNotEmpty = email !== '';
        let isPasswordNotEmpty= password !== '';
        let isPasswordConfirmNotEmpty= passwordConfirm !== '';
        let isPasswordMatched= password === passwordConfirm;
        
        if(isNameNotEmpty && isEmailNotEmpty && isPasswordNotEmpty && isPasswordConfirmNotEmpty && isPasswordMatched){
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }
    }, [name, email, password, passwordConfirm]);

    const register = (e) => {
        e.preventDefault();

        fetch('https://backend-budgetchecker.herokuapp.com/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {

            if(data !== null){
                Swal.fire({
                    icon: "success",
                    text: "You are now successfully registered!"
                });
                navigate('/login')
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
        return <Navigate to="/login"/>
    }

    return (
        <Container className="py-4" fluid>
            <Row className="justify-content-center">
                <Col sm={12} md={4}>
                    <h3 className="text-center">Register</h3>
                    <Form onSubmit={register}>
                        <Form.Group>
                            <Form.Label>Complete Name</Form.Label>
                            <Form.Control placeholder="Enter your complete name" value={name} onChange={(e)=> setName(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="pt-2">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="pt-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="py-2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={passwordConfirm} onChange={(e)=> setPasswordConfirm(e.target.value)} required/>
                        </Form.Group>
                        <Button className="btn-block" variant="secondary" type="submit" disabled={isDisabled}>Register</Button>
                    </Form>
                    <div className="text-center py-3">
                        Already have an account?{' '}<Link to={'/login'}>Login</Link>  
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Register
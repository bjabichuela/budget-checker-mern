import  React, { useState, useContext } from 'react'
import { useNavigate, Navigate } from 'react-router'
import UserContext from '../UserContext'
import { Form, Row, Col, Container, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import Tabs from '../components/Tabs'

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryType, setCategoryType] = useState('');    
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const addCategory = (e) => {
        e.preventDefault();

        fetch('https://backend-budgetchecker.herokuapp.com/users/add-category', {
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.access}`
            },
            body: JSON.stringify({
                categoryName: categoryName,
                categoryType: categoryType
            })
        })
        .then(res => res.json())
        .then(data => {

            if(user.access !== null){
                Swal.fire({
                    icon: "success",
                    text: "Successfully added!"
                });
                navigate('/add-category')
                setCategoryName('');
                setCategoryType('');
            }
            else{
                navigate('/login')
            }
        })
    }

    if(user.access === null){
        return <Navigate to="/login"/>;
    }

    return (
        <Container className="py-2" fluid>
            <div>
                <Tabs/>
            </div>
            <Row className="justify-content-center">
                <Col sm={6} md={4}>
                    <Form className="pt-3 mt-1" onSubmit={addCategory}>
                        <Form.Group className="px-4">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control type="text" value={categoryName} onChange={(e)=> setCategoryName(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="pt-2 pb-3 px-4">
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select" value={categoryType} onChange={(e)=> setCategoryType(e.target.value)} required>
                                <option></option>
                                <option>Income</option>
                                <option>Expense</option>
                            </Form.Control>
                        </Form.Group>
                        <div className="pb-4 px-4">
                        <Button className="btn-block" variant="secondary" type="submit">Add Category</Button>
                    </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddCategory
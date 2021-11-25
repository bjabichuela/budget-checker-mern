import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Navigate, useNavigate } from 'react-router'
import UserContext from '../UserContext'
import { Form, Row, Col, Container, Button } from 'react-bootstrap'
import Tabs from '../components/Tabs'
import Swal from 'sweetalert2'

const AddEntry = () => {
    const [categoryType, setCategoryType] = useState('');
    const [category, setCategory] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');   
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const addEntry = (e) => {
        e.preventDefault();

        fetch('https://backend-budgetchecker.herokuapp.com/users/add-entry', {
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.access}`
            },
            body: JSON.stringify({
                description: description,
                categoryName: category,
                categoryType: categoryType,
                amount: amount
            })
        })
        .then(res => res.json())
        .then(data => {

            if(user.access !== null){
                Swal.fire({
                    icon: "success",
                    text: "Successfully added!"
                });
                navigate('/add-entry')
                setCategoryType('');
                setCategory('');
                setDescription('');
                setAmount('');
            }
            else{
                navigate('/login')
            }
        });       
    }

    const getCategories = useCallback(() => {

        if(categoryType === ''){
            return setCategory([]);
        }
        else{
             if(categoryType === 'Income'){
                fetch('https://backend-budgetchecker.herokuapp.com/users/get-categories/Income', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.access}`                       
                    }
                })
                .then(res => res.json())
                .then(data => {
                setCategory(data);
                })
            }
            else{
                fetch('https://backend-budgetchecker.herokuapp.com/users/get-categories/Expense', {
                    method: 'GET',
                    headers: {                                                      
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.access}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                setCategory(data);
                })
            }
        }
    },[categoryType, user]) 

    useEffect(() => {
        getCategories()
    }, [getCategories])

    const categories = category.map((category)=> {
        return (<option key={category._id}>{category}</option>)})


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
                    <Form className="pt-3 mt-1" onSubmit={addEntry}>
                        <Form.Group className="px-4">
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select" value={categoryType} onChange={(e)=> setCategoryType(e.target.value)} required>
                                <option></option>
                                <option>Income</option>
                                <option>Expense</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="pt-2 px-4">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={newCategoryName} onChange={(e)=> setNewCategoryName(e.target.value)} required>
                                {categories}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="pt-2 px-4">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text"  value={description} onChange={(e)=> setDescription(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="pt-2 pb-2 px-4">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" value={amount} onChange={(e)=> setAmount(e.target.value)} required/>
                        </Form.Group>
                        <div className="pb-4 px-4">
                            <Button className="btn-block" variant="secondary" type="submit">Add Entry</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddEntry
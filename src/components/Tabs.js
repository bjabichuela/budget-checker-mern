import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import '../index.css'

const Tabs = () => {
  return (
    <div className="pt-1 pb-3 mb-2">
      <Nav className="justify-content-center" variant="tabs">
        <Nav.Link as={NavLink} to="/add-category" eventKey="add-category">Add Category</Nav.Link>
        <Nav.Link as={NavLink} to="/add-entry" eventKey="add-entry">Add Entry</Nav.Link>
        <Nav.Link as={NavLink} to="/view-income" eventKey="view-income">Income Entries</Nav.Link>
        <Nav.Link as={NavLink} to="/view-expense" eventKey="view-expense">Expense Entries</Nav.Link>
      </Nav>
    </div>
  )
}

export default Tabs

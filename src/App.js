// Base imports
import  React, { useState } from 'react'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import UserContext from './UserContext'

// App components
import AppNavBar from './components/AppNavBar'
import Footer from './components/Footer'

// Page components
import Login from './pages/Login'
import Register from './pages/Register'
import AddEntry from './pages/AddEntry'
import AddCategory from './pages/AddCategory'
import ViewExpense from './pages/ViewExpense'
import ViewIncome from './pages/ViewIncome'
import NotFound from './pages/NotFound'
import Landing from './pages/Landing'



const App = () => {
  const [user, setUser] = useState({access: localStorage.getItem('access')});
  const unsetUser = () => {
      localStorage.clear(); 
      setUser({access: null});
  }

  return (
    <UserContext.Provider value={{user, setUser, unsetUser}}>
      <BrowserRouter>
        <AppNavBar user={user}/>
        <main className='py-3'>
        <Routes>
          <Route exact path="/" element={<Landing />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/add-entry" element={<AddEntry />}/>
          <Route exact path="/add-category" element={<AddCategory />}/>
          <Route exact path="/view-expense" element={<ViewExpense />}/>
          <Route exact path="/view-income" element={<ViewIncome />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </UserContext.Provider>
  )
}

export default App
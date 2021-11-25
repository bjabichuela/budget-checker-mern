import  React, { useState, useContext, useEffect } from 'react'
import { Navigate } from 'react-router'
import UserContext from '../UserContext'
import MaterialTable from 'material-table'
import tableIcons from '../components/IconProvider'
import Spinner from 'react-bootstrap/Spinner'
import Tabs from '../components/Tabs'


const ViewExpense = () => {
    const [expense, setExpense] = useState([]);
    const {user} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const columns = [
        {title: 'Date & Time', field: 'added',  align: 'center'},
        {title: 'Description', field: 'description',  align: 'center'},
        {title: 'Category', field: 'categoryType', align: 'right'},
        {title: 'Amount', field: 'amount', align: 'center'}
    ]
    

    useEffect(()=> {
        fetch('https://backend-budgetchecker.herokuapp.com/users/get-expense-entries', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.access}`
            }
        })
        .then(res => res.json())
        .then(data => 
        setExpense(data));
        setLoading(true);    
    }, [user])


    if(user.access === null){
        return <Navigate to="/login"/>;
    }

    return (

        <div className='view-expense pt-3 px-3'>
            <div>
                <Tabs/>
            </div>
        {loading ? true : <Spinner animation="border" />}
                <MaterialTable
                    editable ={{
                        onRowUpdate: (newRow, oldRow) => new Promise ((resolve, reject) => {
                            const updatedExpense=[...expense]
                            updatedExpense[oldRow.expense.id]=newRow
                            setExpense(updatedExpense);
                            console.log(newRow, oldRow);
                            setTimeout(()=> resolve(), 500)
                        }),
                        onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                            const updatedExpense=[...expense]
                            updatedExpense.splice(selectedRow.expense.id,1)
                            setExpense(updatedExpense);
                            setTimeout(()=> resolve(), 1000)
                        }) 
                    }}
                    title=''
                    icons={tableIcons}
                    data={expense}
                    columns={columns}
                    options={{paginationPosition: 'bottom', exportButton: true, addRowPosition: 'first', actionsColumnIndex: -1,
                            selection: true, showSelectAllCheckbox: false, showTextRowsSelected: false}}
                />
        </div>
    )
}

export default ViewExpense
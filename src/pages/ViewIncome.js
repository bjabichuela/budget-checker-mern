import  React, { useState, useContext, useEffect } from 'react'
import { Navigate } from 'react-router'
import UserContext from '../UserContext'
import MaterialTable from 'material-table'
import tableIcons from '../components/IconProvider'
import Spinner from 'react-bootstrap/Spinner'
import Tabs from '../components/Tabs'

const ViewIncome = () => {
    const [income, setIncome] = useState([]);
    const {user} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const columns = [
        {title: 'Date & Time', field: 'added',  align: 'center'},
        {title: 'Description', field: 'description',  align: 'center'},
        {title: 'Category', field: 'categoryType', align: 'right'},
        {title: 'Amount', field: 'amount', align: 'center'}
    ]

    useEffect(() => {
 
        fetch('https://backend-budgetchecker.herokuapp.com/users/get-income-entries', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.access}`
            }
        })
        .then(res => res.json())
        .then(data => 
        setIncome(data));
        setLoading(true);        
    }, [user])

    if(user.access === null){
        return <Navigate to="/login"/>;
    }

    return (
        <div className='view-income pt-3 px-3'>
            <div>
                <Tabs/>
            </div>
        {loading ? true : <Spinner animation="border" />}
                <MaterialTable
                    editable ={{
                        onRowUpdate: (newRow, oldRow) => new Promise ((resolve, reject) => {
                            const updatedIncome=[...income]
                            updatedIncome[oldRow.income.id]=newRow
                            setIncome(updatedIncome);
                            console.log(newRow, oldRow);
                            setTimeout(()=> resolve(), 500)
                        }),
                        onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                            const updatedIncome=[...income]
                            updatedIncome.splice(selectedRow.income.id,1)
                            setIncome(updatedIncome);
                            setTimeout(()=> resolve(), 1000)
                        }) 
                    }}
                    title=''
                    icons={tableIcons}
                    data={income}
                    columns={columns}
                    options={{paginationPosition: 'bottom', exportButton: true, addRowPosition: 'first', actionsColumnIndex: -1,
                            selection: true, showSelectAllCheckbox: false, showTextRowsSelected: false}}
                />
        </div>
    )
}

export default ViewIncome
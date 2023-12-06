import React from 'react'
import { deleteItem, fetchData } from '../helper'
import { redirect, useLoaderData } from 'react-router-dom'
import ExpenseItem from '../components/ExpenseItem'
import Table from '../components/Table'
import { toast } from 'react-toastify'


export const expensesLoader = () => {
    const expenses = fetchData("expenses")
    return { expenses }
}

// action
export async function expensesAction({ request }) {
    const data = await request.formData()
    const { _action, ...values } = Object.fromEntries(data)

    if (_action === "deleteExpense") {
        try {
            // throw new Error("Success")
            deleteItem({ key: "expenses", id: values.expenseId })
            return toast.success("Expense Deleted")
        } catch (error) {
            throw new Error("There was a problem deleting your Expense")
        }
    }
    return redirect("/expenses")
}

const ExpensePage = () => {
    const { expenses } = useLoaderData()

    return (
        <div className="grid-lg">
            <h2>All Expenses</h2>
            {expenses && expenses.length > 0 ? (
                <div className="grid-sm">
                    <h2>Recent Expenses <small>No of Expenses: {expenses.length}</small></h2>
                    <Table expenses={expenses} />
                </div>
            ) : <h3>No expenses</h3>
            }
        </div>
    )
}

export default ExpensePage
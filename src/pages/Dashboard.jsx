// RRD import
import { Link, useLoaderData } from 'react-router-dom'

//library
import { toast } from 'react-toastify'

// components
import Intro from '../components/Intro'
import BudgetForm from '../components/BudgetForm'
import ExpenseForm from '../components/ExpenseForm'
import BudgetItem from '../components/BudgetItem'
import Table from '../components/Table'

//helper functions
import { createBudget, createExpense, deleteItem, fetchData, waait } from '../helper'

// loader
export function dashboardLoader() {
    const userName = fetchData("userName")
    const budgets = fetchData("budgets")
    const expenses = fetchData("expenses")

    return { userName, budgets, expenses }
}

// action
export async function dashboardAction({ request }) {
    await waait()
    const data = await request.formData()
    const { _action, ...values } = Object.fromEntries(data)
    console.log(_action);

    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome, ${values.userName}`)
        } catch (error) {
            throw new Error("There was a problem creating your account")
        }
    }

    if (_action === "createBudget") {
        try {
            // throw new Error("Success")
            createBudget({ name: values.newBudget, amount: values.newBudgetAmount })
            return toast.success("Budget Created")
        } catch (error) {
            throw new Error("There was a problem creating your budget")
        }
    }

    if (_action === "createExpense") {
        try {
            // throw new Error("Success")
            createExpense({ name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget })
            return toast.success(`Expense Created, ${values.newExpense}`)
        } catch (error) {
            throw new Error("There was a problem creating your Expense")
        }
    }

    if (_action === "deleteExpense") {
        try {
            // throw new Error("Success")
            deleteItem({ key: "expenses", id: values.expenseId })
            return toast.success("Expense Deleted")
        } catch (error) {
            throw new Error("There was a problem deleting your Expense")
        }
    }


}

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData()
    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h3>Welcome Back, <span className="accent">
                        {userName}
                    </span></h3>
                    <div className="grid-sm">
                        {
                            budgets && budgets.length > 0 ?
                                (
                                    <div className="grid-lg">
                                        <div className="flex-lg">
                                            <BudgetForm />
                                            <ExpenseForm budgets={budgets} />
                                        </div>
                                        <h2>Existing Budgets</h2>
                                        <div className="budgets">
                                            {
                                                budgets.map((budget) => (
                                                    <BudgetItem key={budget.id} budget={budget} />
                                                ))
                                            }
                                        </div>
                                        {
                                            expenses && expenses.length > 0
                                            && (
                                                <div className="grid-md">
                                                    <h2>Recent Expenses</h2>
                                                    <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 6)} />
                                                    {expenses.length > 6 && (
                                                        <Link
                                                            to="expenses"
                                                            className='btn btn--dark'
                                                        >
                                                            View all Expenses
                                                        </Link>
                                                    )}
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                                : (
                                    <div className="grid-sm">
                                        <p>Personal budgeting is the secret to financial freedom</p>
                                        <p>Create a budget to get started</p>
                                        <BudgetForm />
                                    </div>

                                )
                        }

                    </div>
                </div>
            ) : (<Intro />)}
        </>
    )
}

export default Dashboard
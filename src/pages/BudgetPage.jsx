// RRD imports
import { useLoaderData } from 'react-router-dom'

// components
import BudgetItem from '../components/BudgetItem'
import ExpenseForm from '../components/ExpenseForm'
import Table from '../components/Table'

// library
import { toast } from 'react-toastify'

// helper
import { createExpense, deleteItem, getAllMatchingItems } from '../helper'

// loader
export async function budgetLoader({ params }) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id
    })[0]

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    })

    if (!budget) {
        throw new Error("The budget you're trying to access doesn't exist!")
    }

    return { budget, expenses }
}

// action
export async function budgetAction({ request }) {
    const data = await request.formData()
    const { _action, ...values } = Object.fromEntries(data)

    if (_action === "createExpense") {
        try {
            createExpense({ name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget })
            return toast.success(`Expense ${values.newExpense} created`)
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

const BudgetPage = () => {
    const { budget, expenses } = useLoaderData()
    return (
        <div
            className="grid-lg"
            style={{
                "--accent": budget.color
            }}
        >
            <h1 className="h2">
                <span className="accent">{budget.name} </span>
                Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true} />
                <ExpenseForm budgets={[budget]} />
            </div>
            {expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2>
                        <span className="accent">{budget.name} </span>
                        Expenses
                    </h2>
                    <Table expenses={expenses} showBudget={false} />
                </div>
            )}
        </div>
    )
}

export default BudgetPage
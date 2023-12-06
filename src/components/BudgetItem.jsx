// RRD import
import { Form, Link } from 'react-router-dom'

// library
import { TrashIcon } from '@heroicons/react/24/solid'

// helper
import { calculateSpentByBudget, formatCurrency, formatPercentage } from '../helper'

const BudgetItem = ({ budget, showDelete = false }) => {
    const { id, name, amount, color } = budget
    const spent = calculateSpentByBudget(id)

    return (
        <div
            className="budget"
            style={{
                "--accent": color
            }}
        >
            <div className="progess-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} budgeted</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spend</small>
                <small>{formatCurrency(amount - spent)} remaining</small>
            </div>
            {
                showDelete ? (
                    <div className="flex-sm">
                        <Form
                            method="post"
                            action="delete"
                            onSubmit={(event) => {
                                if (!confirm("Are you sure you want to permenantly delete this budget?")) {
                                    event.preventDefault();
                                }
                            }}
                        >
                            <button type="submit" className="btn">
                                <span>Delete Budget</span>
                                <TrashIcon width={20} />
                            </button>
                        </Form>
                    </div>
                ) : (
                    <div className="flex-sm">
                        <Link
                            to={`/budget/${id}`}
                            className='btn'
                        >
                            <span>View Details</span>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default BudgetItem
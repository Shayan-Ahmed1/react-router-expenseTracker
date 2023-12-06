import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

// Library 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// layout
import Main, { mainLoader } from './layout/main';

// actions
import logoutAction from './actions/logout';

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import ExpensePage, { expensesAction, expensesLoader } from './pages/ExpensePage';
import Error from './pages/Error';
import BudgetPage, { budgetAction, budgetLoader } from './pages/BudgetPage';
import { deleteBudget } from './actions/deleteBudget';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          }
        ]
      },
      {
        path: "expenses",
        element: <ExpensePage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: "/logout",
        action: logoutAction,
      }
    ]
  }
])

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
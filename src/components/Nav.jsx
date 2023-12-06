// RRD Imports
import { Form, NavLink } from 'react-router-dom'

// library
import { TrashIcon } from "@heroicons/react/24/solid";

// assets
import logomark from '../assets/logomark.svg'

const Nav = ({ userName }) => {
    return (
        <nav
            style={{
                background: "skyblue",
            }}
        >
            <NavLink
                to="/"
                aria-label="Go to home"
            >
                <img src={logomark} alt="" height={30} />
                <span>Budget Buddy</span>
            </NavLink>
            {
                userName && (
                    <Form
                        method="post"
                        action="/logout"
                        onSubmit={(event) => {
                            if (!confirm("Delete user and all data?")) {
                                event.preventDefault()
                            }
                        }}
                    >
                        <button type="submit" className="btn btn--primary">
                            <span>Log Out</span>
                            <TrashIcon width={20} />
                        </button>
                    </Form>
                )
            }
        </nav>
    )
}

export default Nav
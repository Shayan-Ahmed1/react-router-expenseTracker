import React from 'react'
// RRD component
import { Form } from "react-router-dom";

// library
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration.jpg";

const Intro = () => {
    return (
        <div className="intro">
            <div>
                <h1
                    style={{ fontSize: 40 }}
                ><span className="accent">Budget Buddy</span> | Take Control of Your Money</h1>
                <p>Personal Budgeting is the secret to financial freedom. Start you journey today!</p>
                <Form method="post">
                    <input
                        type="text"
                        name="userName"
                        placeholder="What's your name?"
                        required
                        aria-label='Your Name' autoComplete='given-name'
                    />
                    <input type="hidden" name="_action" value="newUser" />
                    <button type="submit" className='btn btn--dark'>
                        <span>Create Account</span>
                        <UserPlusIcon width={20} />
                    </button>
                </Form>
            </div>
            <img src={illustration} alt="Person with Money" width={600} />
        </div>
    )
}

export default Intro
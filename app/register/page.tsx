"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"
import FormInput from "./FormInput"

const RegisterForm = () => {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: { username: "", name: "", password: "", passwordConfirmation: ""}
  })

  return (
      <div>
        <h2>Create new User</h2>
        {state.errors.userExist? <div data-testid="username-error" style={{ color: "red", marginBottom: "10px" }}>{state.errors.userExist}</div> : ""}
        <form action={formAction}>

          <FormInput state={state} type="text" id="username" name="username" label="Username"/>          
          <FormInput state={state} type="text" id="name" name="name" label="Name"/>
          <FormInput state={state} type="password" id="password" name="password" label="Password"/>
          <FormInput state={state} type="password" id="passwordConfirm" name="passwordConfirmation" label="Confirm Password"/>

          <button className="btn" type="submit" data-testid="register-button">Create</button>
        </form>
      </div>
    )
}

export default RegisterForm
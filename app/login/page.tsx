"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useNotification } from "../components/NotificationContext"


export default function LoginPage() {
  const { showNotification  } = useNotification()
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get("username")

    const result = await signIn("credentials", {
      username: username,
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
      showNotification("Invalid username or password", "error")
    } else {
      showNotification(`${username} just logged in`)
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">

        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-1">Username</label>
        <input id="username" className={`inputText ${error? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-blue-500"}`} type="text" name="username" required />
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-1">Password</label>
        <input id="password" className={`inputText ${error? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-blue-500"}`} type="password" name="password" required /> 

        </div>
        <button data-testid="login-button" className="btn" type="submit">Login</button>
      </form>
    </div>
  )
}
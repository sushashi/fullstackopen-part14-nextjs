"use client"

import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="fixed w-full rounded-md bg-blue-800 text-white px-6 py-3 flex items-center gap-4">
      <NavLink href="/">home</NavLink>
      <NavLink href="/blogs">blogs</NavLink>
      <NavLink href="/users">users</NavLink>
      { session ? (
        <>
          <NavLink href="/blogs/new">create new blog</NavLink>
          {" | "}
          <NavLink href="/me">me</NavLink>
          {" | "}
          <em>{session.user?.name} <span className="text-xs">logged in</span></em>{" "}
          <button className="btn text-sm"
          onClick={() => signOut()}>
            logout</button>
        </>
      ) : (
        <>
          <NavLink href="/login">login</NavLink>
          {" | "}
          <NavLink href="/register">register</NavLink>
        </>
      )}
    </nav>
  )
}
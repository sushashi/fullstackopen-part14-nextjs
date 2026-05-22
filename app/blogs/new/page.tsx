"use client"

import { useActionState, useEffect } from "react"
import { createBlog } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"
import { useRouter } from "next/navigation"
import BlogFromInput from "./BlogFormInput"

const NewBlog = () => {
  
  const [state, formAction] = useActionState(createBlog, { 
    errors: {},
    values: { title: "", author: "", url: "" },
    success: false
  })

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created!")
      router.push("/blogs")
    }
  },[state, showNotification, router])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction}>
        <BlogFromInput state={state} type="text" id="title" name="title" label="Title"/>
        <BlogFromInput state={state} type="text" id="author" name="author" label="Author"/>
        <BlogFromInput state={state} type="text" id="url" name="url" label="URL"/>
        <button className="btn" type="submit" data-testid="create-blog-button">Create</button>
      </form>
    </div>
  )
}

export default NewBlog
"use server"

import { addBlog, increaseLike } from "../services/blogs"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const createBlog = async (formData: FormData) => {
    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const url = formData.get("url") as string
    await addBlog(title, author, url)
    revalidatePath("/blogs")
    redirect("/blogs")
}

export const increaseBlogLike = async (formData: FormData) => {
    const id = Number(formData.get('id'))
    await increaseLike(id)
    revalidatePath(`/blogs/${id}`)
    revalidatePath('/blogs')
}

export const useFilter = async (formData: FormData) => {
    const filter = formData.get('filter') as string
    redirect(`/blogs?filter=${filter}`)
}
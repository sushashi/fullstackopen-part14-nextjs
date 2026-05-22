"use server"

import { addBlog, increaseLike } from "../services/blogs"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createBlog = async (
    prevState: { 
        errors: Record<string, string>,
        values: {title: string, author: string, url: string},
        success?: boolean
    },
    formData: FormData
) => {

    const session = await auth()
    if (!session){
        redirect("/login")
    }

    const errors: Record<string, string> = {}
    const title = formData.get("title") as string
    if (!title || title.length < 5) {
        errors.title = "Title must be at leat 5 charecters long"
    }
    const author = formData.get("author") as string
    if (!author || author.length < 5) {
        errors.author = "Author must be at leat 5 characters long"
    }
    const url = formData.get("url") as string
    if (!url || url.length < 5) {
        errors.url = "URL must be at least 5 characters long"
    }
    if (Object.keys(errors).length > 0) return { errors, values: { title, author, url } , success: false}

    await addBlog(title, author, url)
    
    revalidatePath("/blogs")
    return { errors, values: { title, author, url }, success: true}
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
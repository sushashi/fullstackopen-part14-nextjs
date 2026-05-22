"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { addUser, updateToken, addReadingList, updateRead} from "../services/users"
import { getCurrentUser } from "../services/session"
import { revalidatePath } from "next/cache"

export const registerUser = async (
    prevState: { 
        errors: Record<string, string>, 
        values: {username: string, name: string, password: string, passwordConfirmation: string} 
    },
    formData: FormData
) => {
    
    const errors: Record<string, string> = {}
    const username = formData.get("username") as string
    if (!username || username.length < 4) {
        errors.username = "Username must be at least 4 characters long"
    }
    const name = formData.get("name") as string
    if (!name || name.length < 4) {
        errors.name = "Name must be at least 4 characters long"
    }
    const password = formData.get("password") as string
    if (!password || password.length < 4){
        errors.password = "Password must be at least 4 characters long"
    }
    const passwordConfirmation = formData.get("passwordConfirmation") as string
    if (!passwordConfirmation || password !== passwordConfirmation) {
        errors.passwordConfirmation = "Password confirmation doesn't match password"
    }

    if (Object.keys(errors).length > 0) {
        return { errors, values: { username, name, password, passwordConfirmation }}
    }

    const passwordHash = await bcrypt.hash(password, 10)
    try {
        await addUser(username, name, passwordHash)
    } catch (error: unknown) {
        if (error instanceof Error) {
            errors.userExist = "Username already exist, pick another one"
            return { errors, values: { username, name, password, passwordConfirmation } }
        }
    }
    revalidatePath("/users")
    redirect("/login")
}

export const generateToken = async (username: string) => {
    await updateToken(username)   
    revalidatePath("/me")
}

export const addToReadingList = async (formData: FormData) => {
    const blogId = Number(formData.get("id"))
    const user = await getCurrentUser()
    const userId = user!.id
    await addReadingList(blogId, userId)
    revalidatePath(`/blogs/${Number(blogId)}`)
}

export const markAsRead = async (FormData: FormData) => {
    const readingListId = Number(FormData.get("rl_id"))
    await updateRead(readingListId)
    revalidatePath("/me")
}
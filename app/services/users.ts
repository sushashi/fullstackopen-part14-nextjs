import { db } from "../../db"
import { eq } from "drizzle-orm"
import { users, readingList } from "@/db/schema"

export const getUsers = async () => {
    return db.query.users.findMany()
}

export const getUserByUsername = async (username: string) => {
    return db.query.users.findFirst({ 
        where: eq(users.username, username) 
    })
}

export const getUserWithBlogs = async (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username),
        with: { blogs: true }
    })
}

export const addUser = async (username: string, name: string, passwordHash: string) => {
    await db.insert(users).values({username, name, passwordHash})
}

export const updateToken = async(username: string) => {
    await db.update(users).set({ token: crypto.randomUUID() }).where(eq(users.username, username))
}

export const getUserWithBlogsByToken = async (token: string) => {
    return db.query.users.findFirst({
        columns: { id: true, username: true, name: true },
        where: eq(users.token, token),
        with: { blogs: true }
    })
}

export const addReadingList = async (blogId: number, userId: number) => {
    await db.insert(readingList).values({ userId, blogId })
}

export const getReadingListByUser = async (username: string) => {
    const user = await getUserByUsername(username)

    return db.query.readingList.findMany({
        where: eq(readingList.userId, user!.id),
        with: { blogs: true}
    })
}

export const updateRead = async(readingListId: number) => {
    return db.update(readingList).set({ read: true }).where(eq(readingList.id, readingListId))
}
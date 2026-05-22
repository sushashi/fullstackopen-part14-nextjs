import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs, readingList } from "../../db/schema"
import { getCurrentUser } from "./session"

export const getBlogs = async () => {
    return db.query.blogs.findMany()
}

export const getBlogById = (id: number) => {
    return db.query.blogs.findFirst({
        where: eq(blogs.id, id)
    })
}

export const addBlog = async (title:string, author:string, url:string) => {
    const user = await getCurrentUser()
    if(!user) {
        throw new Error("Not logged in")
    }
    const [newBlog] = await db.insert(blogs).values({title, author, url, userId: user.id}).returning()
    await db.insert(readingList).values({ userId: user.id, blogId: newBlog.id })
}

export const increaseLike = async (id: number) => {
    const blog = await getBlogById(id)
    if (blog) {
        await db.update(blogs).set({ likes: blog.likes + 1}).where(eq(blogs.id, id))
    }
}
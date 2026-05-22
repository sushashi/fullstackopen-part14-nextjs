import { db } from "@/db";
import { blogs, users, readingList } from "@/db/schema";

export const deleteEverything = async () => {
    await db.delete(readingList)
    await db.delete(blogs)
    await db.delete(users)
}
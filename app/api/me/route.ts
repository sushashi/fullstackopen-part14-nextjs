import { NextResponse, NextRequest} from "next/server";
import { getUserWithBlogsByToken } from "@/app/services/users";

export const GET = async ( req: NextRequest ) => {
    const authorisationHeader = req.headers.get('authorization')

    if (!authorisationHeader || !authorisationHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 })
    }

    const token = authorisationHeader.split(' ')[1]
    const blogs = await getUserWithBlogsByToken(token)
    if (!blogs) {
        return NextResponse.json({ error: "Invalid token"}, { status: 401 })
    }

    return NextResponse.json(blogs)
}
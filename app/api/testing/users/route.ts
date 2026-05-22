import { NextRequest, NextResponse } from "next/server";
import { addUser } from "@/app/services/users";
import bcrypt from "bcryptjs";

export const POST = async ( req: NextRequest ) => {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }

    try {
        const body = await req.json()
        const {username, name, password} = body
        const passwordHash = await bcrypt.hash(password, 10)
        await addUser(username, name, passwordHash)
    
        return NextResponse.json({ username, name }, { status: 201 })
    } catch {
        return NextResponse.json({ error: "Internal server error"}, {status: 500})
    }
}
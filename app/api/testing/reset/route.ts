import { NextResponse } from "next/server";
import { deleteEverything } from "@/app/services/testing";

export const DELETE = async () => {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }
    await deleteEverything()
    return NextResponse.json({ message: "App successfully reset" }, { status: 200 })
}
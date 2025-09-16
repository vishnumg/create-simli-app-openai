import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "app", "prompt.md");
        const content = await fs.readFile(filePath, "utf-8");
        return new NextResponse(content, {
            status: 200,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-store",
            },
        });
    } catch (err: any) {
        return NextResponse.json({ error: `Failed to load prompt: ${err?.message || err}` }, { status: 500 });
    }
}

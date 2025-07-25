import { NextRequest, NextResponse } from "next/server"
import { getSession, updateSession } from "./app/lib";
// import { redirect } from "next/navigation";

const MS_PER_MIN = 60000;
const INTERVAL_BETWEEN_REQS_IN_MINS = 10;

export default async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    if(req.nextUrl.pathname.startsWith("/destination")){
        if(req.cookies.get("request-success")?.value === "true"){
            res.cookies.set("req-time", new Date().toISOString())
            console.log("cookcies set")
        } 
    }
    if(req.nextUrl.pathname.startsWith("/areas")){
        
        if(req.body === null){
            if((req.cookies.get('req-time'))){
                const timeString = req.cookies.get("req-time")?.value;
                const msPassed: number = Date.now() - Date.parse(timeString||"");
                if(msPassed < MS_PER_MIN * INTERVAL_BETWEEN_REQS_IN_MINS){
                    console.log("redirected");
                    return NextResponse.redirect(new URL("/cooldown", req.url));
                }
            }
        }
    }
    if(req.nextUrl.pathname.startsWith("/admin")){
        if(req.nextUrl.pathname.startsWith("/admin/credentials") || req.nextUrl.pathname.startsWith("/admin/unauthorized")){
            return res;
        }
        const session = await getSession();
        // check validity here
        // console.log(session);
        if(session?.user?.name !== "Admin"){
            console.log("redirected in middle ware");
            return NextResponse.redirect(new URL("/admin/unauthorized", req.url));
        }
        // return await updateSession(req);
    }

    return res;
}

export const config = {
    matcher: ["/areas/(.*)", "/destination/(.*)", "/admin/(.*)"]
}
import { NextRequest, NextResponse } from "next/server"

const MS_PER_MIN = 60000;
const INTERVAL_BETWEEN_REQS_IN_MINS = 10;

export default async function middleware(req: NextRequest) {
    const res = NextResponse.next();

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
        } else {
            // res.cookies.set("req-time", new Date().toISOString())
            // console.log("cookcies set")
        }
    }
    return res;
}

export const config = {
    matcher: ["/areas/(.*)", "/destination/(.*)"]
}
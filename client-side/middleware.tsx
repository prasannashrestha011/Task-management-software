import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const authToken = req.cookies.get('authToken'); // Accessing cookie using req.cookies.get
    
        if (!authToken){
            console.log('token not found')
            return NextResponse.redirect(new URL('/login',req.url))
        }
    
    
    return NextResponse.next(); // Proceed to the next middleware or handler
}
export const config={
    matcher:['/taskmanagement','/']
}

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"

const AUTH_ROUTS=["/login","/register"]
const PUBLIC_ROUTES=["/","/news","/login","/register"]

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;    // jekhane ami jete chacci
    // access token 
    const accessToken=request.cookies.get("accessToken")?.value;
    // decoded accessToken 
    const decodedToken =accessToken? jwt.decode(accessToken) as JwtPayload : null;
    // set role 
    let userRole=null;
    if(decodedToken){
        userRole=decodedToken.role;
    }
     // role based redirect
    if(accessToken && AUTH_ROUTS.includes(path)){
        if(userRole=="user"){

             return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        else if(userRole=="admin"){

             return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }
       else if(userRole=="author"){

             return NextResponse.redirect(new URL("/author-dashboard", request.url));
        }
       else{

             return NextResponse.redirect(new URL("/", request.url));
        }
        
        

    }

    //  akhane dekbo user ki public route a jete chacc naki private route a 
    const isPublic=PUBLIC_ROUTES.some((route)=>{
      return  route==path || path.startsWith(route+"/")
    })
    // public na hole mane protected . tai take login a pathiye daw
    if(!accessToken && !isPublic){
         return NextResponse.redirect(new URL("/login", request.url));
        
    }



    // abar user er role onyjaye take route a dukte dibo 
    if(accessToken && path.startsWith("/dashboard") && userRole !=="user"){
         return NextResponse.redirect(new URL("/", request.url));

    } else if (accessToken && path.startsWith("/admin-dashboard")&& userRole!=="admin"){
         return NextResponse.redirect(new URL("/", request.url));
    } else if (accessToken && path.startsWith("/author-dashboard")&& userRole!=="author"){
         return NextResponse.redirect(new URL("/", request.url));
    }



    
//   return NextResponse.redirect(new URL("/home", request.url));
return NextResponse.next()
}



export const config = {
  matcher: [
    // "/dashboard/:path*",
    // "/admin-dashboard/:path*"

    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};

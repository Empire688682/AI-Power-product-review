import { NextResponse } from "next/server";

const LogoutUser = async (req) =>{
   if(req.method === "GET"){
    try {
        const res = NextResponse.json({success:true, message:"User logout"}, {status:200});
        res.cookies.delete("AIToken");
        return res
    } catch (error) {
        console.log("ERROR:", error);
        return NextResponse.json({success:false, message:"Unable to logout user"}, {status:500})
    }
   }
};

export async function GET(req){
    return LogoutUser(req);
}


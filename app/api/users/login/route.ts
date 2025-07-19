import connect from "@/dbconfig/db";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        //create token data 
        const tokenData = {
            id :user._id,
            username :user.username ,
            email : user.email
        }
         //create token 
            const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn :"1d"})
            
            const response = NextResponse.json({ message: 'Login successful', user }, { status: 200 }); // Here you would typically create a session or token for the user
            
            response.cookies.set("token",token,{
                httpOnly: true,
            })
            return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
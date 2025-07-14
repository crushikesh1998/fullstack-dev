import connect from "@/dbconfig/db";
import  User from '@/models/userModel';
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect()

export async function  POST(request :NextRequest){
    try {
         const reqBody = await request.json()
         const {username,email,password} = reqBody
         if(!username || !email || !password){
            console.log('Please fill all the fields');
         }
         User.findOne({email}).then(async (user) => {
            if(user){
                return NextResponse.json({error : 'User already exists'},{status : 400})
            }
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new User({
                username,
                email,
                password : hashedPassword
            })
            const savedUser = await newUser.save()
            return NextResponse.json({message : 'User created successfully', 
                success : true,
                savedUser
            },{status : 201})
        }
        ).catch((error) => {
            console.log('Error finding user:', error);
            return NextResponse.json({error : 'Internal server error'},{status : 500})
        })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        return NextResponse.json({ error : error.message},{status : 500}) 
        
    }
}
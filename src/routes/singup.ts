import express from 'express'
import { z } from 'zod'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const router = express.Router()

const signupSchema = z.object({
    username: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

router.post("/", async (req, res)=>{

    const { success } = signupSchema.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message: "Invalid inputs"
        })
    }
    try{
        await prisma.user.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        })
        res.json({
            message: "User created successfully"
        })
    }catch(err){
        console.log("some error occured")
        return
    }
})

export default router
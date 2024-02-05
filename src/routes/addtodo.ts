import express from 'express'
import { z } from 'zod'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const router = express.Router()

const todoSchema = z.object({
    title: z.string(),
    description: z.string(),
    userId: z.number()
})

router.post("/", async (req, res)=>{

    const { success } = todoSchema.safeParse(req.body)
    
    if(!success){
        return res.status(411).json({
            message: "Invalid inputs"
        })
    }

    try{
        await prisma.todo.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                userId: req.body.userId
            }
        })

        res.json({message: "Todo added successfully"})
    }catch(err){
        res.send("some error occured")
    }

})

export default router
import express from 'express'
import { z } from 'zod'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const router = express.Router()

const getSchema = z.object({
    id: z.number()
})

router.get("/", async (req, res)=>{

    const { success } = getSchema.safeParse(req.body)

    if(!success){
        return res.send("Invalid inputs")
    }

    try{
        const result = await prisma.todo.findMany({
            where: {
                userId: req.body.id
            }
        })

        res.json({
            todos: result
        })
    }catch(err){
        res.send("some error occured")
    }
})

export default router
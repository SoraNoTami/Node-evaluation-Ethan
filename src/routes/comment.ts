import { Request, RequestHandler, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
import db from "../db";

const app = Router()


app.get('/comments', async (req, res) => {
  const comments = await db.comment.findMany({
    where: {
      userId: req.user.id
    }
  })
  return res.status(200).json(comments)
})

app.get(
  '/comment/:uuid',
  async (req, res) => {
    try {
      const comment = await db.comment.findFirstOrThrow({
        where: {
          id: req.params.uuid,
          userId: req.user.id
        }
      })
      return res.status(200).json(comment)
    } catch(e) {
      return res.status(400).json({ message: 'Not found' })
    }
  }
)


app.post(
  '/post/:uuid/comment/create',
  async (req: Request, res: Response) => {
    try {
      validationResult(req).throw()
      const createdcomment = await db.comment.create({
        data: {
          content: req.body.content,
          postId: req.params.uuid,
          userId: req.user.id
        }
      })

      return res.status(200).json(createdcomment)
    } catch(e) {
      console.log(e)
      return res.status(400).json({error: e || 'Cannot create comment'})
    }
})

app.put('/comment/:uuid', async (req, res) => {
  try {
    validationResult(req).throw()
    const updatedcomment = await db.comment.update({
      where: {
        id: req.params?.uuid,
      },
      data: {
        content: req.body.content
      }
    })
  
    return res.status(200).json(updatedcomment)
  } catch(e) {
    return res.status(400).json({message: e || 'Error while updating'})
  }
})

app.delete('/comment/:uuid', async (req, res) => {
  const comment = await db.comment.findFirst({
    where: {
      id: req.params.uuid,
    }
  })
  if(!(comment?.userId == req.user.id)){
    return res.status(400).json({error: 'This not your comment, you can only delete one of your comment '})
  }else {
    try {
      await db.comment.delete({
        where: {
          id: req.params.uuid
        }
      })
      return res.status(200).json({message: `Succesfully deleted ${req.params.uuid}`})
    } catch(e) {
      return res.status(400).json({message: e || 'Error while deleting'})
    }
  }
})

export default app
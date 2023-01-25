import { Request, RequestHandler, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
import db from "../db";

const app = Router()


app.get('/posts', async (req, res) => {
  const posts = await db.post.findMany({
    where: {
      userId: req.user.id
    }
  })
  return res.status(200).json(posts)
})

app.get(
  '/post/:uuid',
  async (req, res) => {
    try {
      const post = await db.post.findFirstOrThrow({
        where: {
          id: req.params.uuid,
          userId: req.user.id
        },
        include: {
          comments: true
        }
      })

      return res.status(200).json(post)
    } catch(e) {
      return res.status(400).json({ message: 'Not found' })
    }
  }
)


app.post(
  '/post',
  body('title').exists().isString().notEmpty(),
  async (req: Request, res: Response) => {
    try {
      validationResult(req).throw()
      const createdPost = await db.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          userId: req.user.id
        }
      })

      return res.status(200).json(createdPost)
    } catch(e) {
      console.log(e)
      return res.status(400).json({error: e || 'Cannot create Post'})
    }
})

app.put('/post/:uuid', body('name').exists().isString().notEmpty(), async (req, res) => {
  try {
    validationResult(req).throw()
    const updatedTodoList = await db.post.update({
      where: {
        id: req.params?.uuid,
      },
      data: {
        title: req.body.title
      }
    })
  
    return res.status(200).json(updatedTodoList)
  } catch(e) {
    return res.status(400).json({message: e || 'Error while updating'})
  }
})

app.delete('/post/:uuid', async (req, res) => {
  const post = await db.post.findFirst({
    where: {
      id: req.params.uuid,
    }
  })

  if(!(post?.userId == req.user.id)){
    return res.status(400).json({error: 'This not your Post, you can only delete one of your Post '})
  }else {
    try {
      await db.post.delete({
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
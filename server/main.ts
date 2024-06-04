import 'dotenv/config'
import initMongooose from './db/connection'
import express from 'express'
import BlogPostModel from './db/models/blog.model'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World')
  BlogPostModel.find({}).then((data) => {
    console.log(data)
  })
})

// INIT SERVER
initMongooose().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
})


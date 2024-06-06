import 'dotenv/config'
import { initMongodb } from './providers/mongodb'


initMongodb().catch((err) => {
    console.error(err)
  })
import mongoose from 'mongoose';

export default async function initMongooose() {
  try {
    mongoose.connection
      .on('error', err => {
        console.error(err);
      })
      .on('open', err => {
        console.log(`DB connected`);
      })

    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error) {
    console.error(error);
  }
}
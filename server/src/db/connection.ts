import mongoose from "mongoose";

async function initMongoose() {
  try {
    mongoose.connection
      .on("error", (err) => {
        console.log(err);
      })
      .on("open", () => {
        console.log("DB connected");
      });
    await mongoose.connect(process.env.MONGO_URI!);

    // await mongoose.connect(env.MONGODB_URI, {
    //   dbName: env.MONGODB_DATABASE_NAME,
    // });
    
  } catch (error) {
    console.error(error);
  }
}

export default initMongoose;

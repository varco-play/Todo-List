import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(
      "mongodb+srv://privetchel2007:133500Sar.@todolist.unqjxn4.mongodb.net/?retryWrites=true&w=majority"
    ).then(() => console.log("connected successfully"))
  } catch (error) {
    console.log(error.message);
  }
}


export default dbConnect;
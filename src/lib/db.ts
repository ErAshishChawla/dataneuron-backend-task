import mongoose from "mongoose";

import "dotenv/config";

export async function connectDB() {
  return mongoose.connect(process.env.DB_URI!, {
    dbName: process.env.DB_NAME,
  });
}

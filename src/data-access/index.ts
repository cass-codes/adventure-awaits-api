import { connect, disconnect } from "mongoose";

export async function connectToDb(uri: string) {
  try {
    await connect(uri);
    console.log("Connected to the database");
  } catch (e) {
    console.error(e);
  }
}

export async function disconnectFromDb() {
  await disconnect();
}

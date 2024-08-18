import * as mongodb from "mongodb";
import { Fellowshipmember } from "./fellowshipmember";

export const collections: {
    fellowshipmembers?: mongodb.Collection<Fellowshipmember>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
    const db = client.db("TeamDB");
    collections.fellowshipmembers = db.collection<Fellowshipmember>("fellowshipmembers");
    console.log(`Successfully connected to database: ${db.databaseName}`);
}

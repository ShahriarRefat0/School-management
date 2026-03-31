import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'school_management';

if (!uri) {
  throw new Error('MONGODB_URI is not set in environment variables');
}

type GlobalWithMongo = typeof globalThis & {
  __mongoClientPromise?: Promise<MongoClient>;
};

const globalWithMongo = globalThis as GlobalWithMongo;

const clientPromise =
  globalWithMongo.__mongoClientPromise ||
  new MongoClient(uri, {
    maxPoolSize: 10,
  }).connect();

if (process.env.NODE_ENV !== 'production') {
  globalWithMongo.__mongoClientPromise = clientPromise;
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}

export async function getCollection(collectionName: string) {
  const db = await getDb();
  return db.collection(collectionName);
}

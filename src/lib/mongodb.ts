import { MongoClient } from 'mongodb';

type GlobalWithMongo = typeof globalThis & {
  __mongoClientPromise?: Promise<MongoClient>;
};

const globalWithMongo = globalThis as GlobalWithMongo;

async function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment variables');
  }

  if (globalWithMongo.__mongoClientPromise) {
    return globalWithMongo.__mongoClientPromise;
  }

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
  });
  
  const promise = client.connect();

  if (process.env.NODE_ENV !== 'production') {
    globalWithMongo.__mongoClientPromise = promise;
  }

  return promise;
}

export async function getDb() {
  const dbName = process.env.MONGODB_DB || 'school_management';
  const client = await getClientPromise();
  return client.db(dbName);
}

export async function getCollection(collectionName: string) {
  const db = await getDb();
  return db.collection(collectionName);
}

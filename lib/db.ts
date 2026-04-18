import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cache;
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to your environment variables.');
  }

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    // In serverless functions, keep one shared connection promise per runtime.
    cache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

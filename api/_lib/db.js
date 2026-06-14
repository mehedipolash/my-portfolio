import { MongoClient } from 'mongodb'

// Cached connection across serverless invocations (Vercel reuses the process).
let cached = global._mongo
if (!cached) cached = global._mongo = { client: null, promise: null }

export async function getDb() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set')

  if (!cached.promise) {
    cached.promise = MongoClient.connect(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 8000,
    }).then((client) => {
      cached.client = client
      return client
    })
  }
  const client = await cached.promise
  return client.db(process.env.MONGODB_DB || 'portfolio')
}

// Collections used by the app.
export const COLLECTIONS = {
  content: 'content', // single doc: experience, projects, skills, profile overrides
  badges: 'badges', // cached Credly badges
}

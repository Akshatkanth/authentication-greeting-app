import dbConnect from '@/lib/dbConnect'; 

export default async function handler(req, res) {
  await dbConnect(); // Connect to MongoDB

  // your API logic here
}

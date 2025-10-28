import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    return Response.json({ message: 'MongoDB Connected with Mongoose!' });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
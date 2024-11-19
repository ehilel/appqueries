import { NextResponse } from "next/server";
import { connectDatabase, getAllDocuments, insertDocument, deleteDocument, updateDocument } from '../../../services/mongo'

export async function GET(request: Request){
    const client = await connectDatabase();
    const cars = await getAllDocuments(client, 'cars');
    client.close();

    return NextResponse.json(cars);
}

export async function POST(request: Request) {
    const client = await connectDatabase();
    const newCar = await request.json();
    const car = await insertDocument(client, 'cars', newCar);
    client.close();
  
    return NextResponse.json(car);
  }

export async function DELETE(request: Request){
  const client = await connectDatabase();
  const { id } = await request.json();
  const car = await deleteDocument(client, 'cars', id);
  client.close();

  return NextResponse.json(car);
}

export async function PUT(request: Request) {
  const client = await connectDatabase();
  const body = await request.json();
  const result = await client.db('db01').collection('cars').updateOne({ _id: body._id }, { $set: body });
  return NextResponse.json(result);
}





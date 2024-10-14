import { NextRequest, NextResponse } from 'next/server';
import DataService from '@/lib/data-service';

const BlogService = DataService('blogs');

export async function GET(req: NextRequest) {
  const entities = await BlogService.get();
  return NextResponse.json(entities);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newEntity = await BlogService.create(data);
  return NextResponse.json(newEntity);
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const data = await req.json();
  if (id) {
    await BlogService.update(id, data);
    return NextResponse.json({ message: 'Article updated' });
  } else {
    return NextResponse.json(
      { message: 'Article ID is required' },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (id) {
    await BlogService.deleteOne(id);
    return NextResponse.json({ message: 'Article deleted' });
  } else {
    return NextResponse.json(
      { message: 'Article ID is required' },
      { status: 400 }
    );
  }
}

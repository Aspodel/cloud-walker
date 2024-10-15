import { NextRequest, NextResponse } from 'next/server';
import DataService from '@/lib/data-service';
import { IBlog } from '@/types';

const BlogService = DataService<IBlog>('blogs');

export async function GET() {
  try {
    const entities = await BlogService.get();
    return NextResponse.json(entities);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newEntity = await BlogService.create(data);
    return NextResponse.json(newEntity);
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const data = await req.json();
  try {
    if (id) {
      await BlogService.update(id, data);
      return NextResponse.json({ message: 'Article updated' });
    } else {
      return NextResponse.json(
        { message: 'Article ID is required' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  try {
    if (id) {
      await BlogService.deleteOne(id);
      return NextResponse.json({ message: 'Article deleted' });
    } else {
      return NextResponse.json(
        { message: 'Article ID is required' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

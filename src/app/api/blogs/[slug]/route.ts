import { NextRequest, NextResponse } from 'next/server';
import DataService from '@/lib/data-service';

const BlogService = DataService('blogs');

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split('/').pop();

  console.log(`Received slug: ${slug}`);

  if (!slug) {
    return NextResponse.json({ error: 'Slug is missing' }, { status: 400 });
  }

  const entity = await BlogService.getBySlug(slug);

  if (!entity) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json(entity);
}

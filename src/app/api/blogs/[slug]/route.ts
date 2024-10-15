import { NextRequest, NextResponse } from 'next/server';
import DataService from '@/lib/data-service';
const BlogService = DataService('blogs');

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const slug = req.nextUrl.pathname.split('/').pop();
    if (!slug) {
      console.error('Slug is missing');
      return NextResponse.json({ error: 'Slug is missing' }, { status: 400 });
    }
    console.log(`Received slug: ${slug}`);
    const entity = await BlogService.getBySlug(slug);
    if (!entity) {
      console.error(`Blog not found for slug: ${slug}`);
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(entity);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

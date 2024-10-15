import BlogList from '@/components/ui/blog-list';
import { IBlog } from '@/types';
import { getBaseUrl } from '@/utils';

async function getBlogs() {
  const res = await fetch(`${getBaseUrl()}/api/blogs`, { cache: 'no-store' });
  const blogs: IBlog[] = await res.json();

  return blogs;
}

export default async function HomePage() {
  const blogs = await getBlogs();
  return <BlogList blogs={blogs} />;
}

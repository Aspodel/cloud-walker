import BlogList from '@/components/ui/blog-list';
import { IBlog } from '@/types';
import { getBaseUrl } from '@/utils';

export default async function HomePage() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });
  const blogs: IBlog[] = await res.json();

  return <BlogList blogs={blogs} />;
}

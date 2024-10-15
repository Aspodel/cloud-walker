import BlogList from '@/components/ui/blog-list';
import DataService from '@/lib/data-service';
import { IBlog } from '@/types';

export default async function HomePage() {
  const BlogService = DataService<IBlog>('blogs');
  const blogs = await BlogService.get();

  return <BlogList blogs={blogs} />;
}

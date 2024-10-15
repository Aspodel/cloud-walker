import BlogDetail from '@/components/ui/blog-detail';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBaseUrl } from '@/utils';
import { IBlog } from '@/types';
import DataService from '@/lib/data-service';

interface BlogPageProps {
  params: { slug: string };
}

async function getBlog(slug: string): Promise<IBlog> {
  const BlogService = DataService<IBlog>('blogs');
  const blog = await BlogService.getBySlug(slug);
  if (!blog) {
    throw notFound();
  }
  return blog;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const blog = await getBlog(params.slug);
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      type: 'article',
      title: blog.title,
      description: blog.description,
      url: `${getBaseUrl()}/blogs/${blog.slug}`,
      images: [
        {
          url: blog.imageUrl || '/default-image.jpg',
          width: 800,
          height: 600,
          alt: blog.title,
        },
      ],
    },
  };
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const blog = await getBlog(params.slug);
  return (
    <div className='flex justify-center pb-20 pt-10 md:pb-40 md:pt-20'>
      <div className='w-full max-w-4xl'>
        <BlogDetail blog={blog} />
      </div>
    </div>
  );
};

export default BlogPage;

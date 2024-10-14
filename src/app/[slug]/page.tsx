import BlogDetail from '@/components/ui/blog-detail';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBaseUrl } from '@/utils';
import { IBlog } from '@/types';

interface BlogPageProps {
  params: { slug: string };
}

async function fetchBlog(slug: string): Promise<IBlog> {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, {
      cache: 'no-cache',
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Failed to fetch blog:', errorText);
      notFound();
    }
    return res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    notFound();
  }
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const blog = await fetchBlog(params.slug);
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

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await fetchBlog(params.slug);
  return (
    <div className='flex justify-center pb-20 pt-10 md:pb-40 md:pt-20'>
      <div className='w-full max-w-4xl'>
        <BlogDetail blog={blog} />
      </div>
    </div>
  );
}

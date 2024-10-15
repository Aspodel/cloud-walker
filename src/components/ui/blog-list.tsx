import Link from 'next/link';
import Image from 'next/image';
import { IBlog } from '@/types';

interface BlogListProps {
  blogs: IBlog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  blogs = blogs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const featuredBlog = blogs.shift();
  return (
    <section className='m-auto flex flex-col space-y-16 px-4 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20'>
      <div className='flex flex-col lg:flex-row lg:space-x-16'>
        <Link
          href={`/${featuredBlog!.slug}`}
          className='flex flex-col space-y-4 lg:flex-row lg:space-x-16 lg:space-y-0'
        >
          <div className='w-full lg:w-1/2'>
            <Image
              src={featuredBlog!.imageUrl}
              alt={featuredBlog!.title}
              width={600}
              height={550}
              className='h-auto w-full rounded-xl object-cover'
            />
          </div>
          <div className='flex w-full flex-col justify-between space-y-4 lg:w-1/2 xl:space-y-0 xl:py-6'>
            <p className='font-medium text-gray-500'>
              {new Date(featuredBlog!.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <h1 className='ellipsis-2-lines text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl'>
              {featuredBlog!.title}
            </h1>
            <p className='ellipsis-3-lines text-lg font-medium text-gray-500 sm:text-xl'>
              {featuredBlog!.description}
            </p>
            <div className='flex space-x-2'>
              {featuredBlog &&
                featuredBlog.tags.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-full bg-blue-500 px-3 py-1 text-sm font-bold text-white'
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </Link>
      </div>
      <h2 className='text-2xl font-bold sm:text-3xl'>Latest Blogs</h2>
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/${blog.slug}`}>
            <div className='flex flex-col space-y-4'>
              <div className='w-full'>
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  width={300}
                  height={250}
                  className='h-auto w-full rounded-xl object-cover'
                />
              </div>
              <p className='text-sm font-medium text-gray-500'>
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <h3 className='ellipsis-2-lines text-xl font-bold'>
                {blog.title}
              </h3>
              <p className='ellipsis-3-lines text-sm text-gray-500 sm:text-base'>
                {blog.description}
              </p>
              <div className='flex space-x-2'>
                {blog &&
                  blog.tags &&
                  blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full bg-blue-500 px-3 py-1 text-sm font-bold text-white'
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogList;

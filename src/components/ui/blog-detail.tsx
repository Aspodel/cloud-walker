import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/tokyo-night-dark.css';
import Image from 'next/image';
import { IBlog } from '@/types';

interface BlogDetailProps {
  blog: IBlog;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog }) => {
  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <article className='prose max-w-none dark:prose-invert md:prose-lg lg:prose-xl prose-a:text-blue-500 hover:prose-a:no-underline prose-pre:bg-[#1a1b26] prose-img:w-full'>
      <div className='mb-8 flex justify-center space-x-2'>
        {blog.tags.map((tag: string) => (
          <span
            key={tag}
            className='rounded-full bg-blue-500 px-3 py-1 text-sm font-bold text-white'
          >
            {tag}
          </span>
        ))}

        <span className='px-3 py-1 text-sm font-medium text-gray-400'>
          {new Date(blog.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>
      <h1 className='mb-4 text-balance text-center text-4xl md:text-5xl lg:text-6xl'>
        {blog.title}
      </h1>
      <p className='font-medium text-gray-500'>{blog.description}</p>
      <Image
        src={blog.imageUrl}
        alt={blog.title}
        width={800}
        height={600}
        className='rounded-xl'
      />
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {blog.content}
      </ReactMarkdown>
    </article>
  );
};

export default BlogDetail;

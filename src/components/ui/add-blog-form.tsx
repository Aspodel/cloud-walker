import React from 'react';
import Button from '@/components/shared/button';
import MarkdownEditor from '@/components/shared/markdown-editor';
import { IBlog } from '@/types';

interface AddBlogFormProps {
  blog: IBlog;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onEditorChange: (newContent: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const AddBlogForm: React.FC<AddBlogFormProps> = ({
  blog,
  onInputChange,
  onEditorChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col space-y-8'>
      <h1 className='text-center text-2xl font-bold lg:text-4xl'>
        Add New Blog
      </h1>
      <input
        type='text'
        name='title'
        placeholder='Title'
        className='rounded-lg border border-gray-300 bg-background p-2 text-xl font-bold text-foreground text-gray-500 transition-colors'
        value={blog.title}
        onChange={onInputChange}
      />
      <textarea
        name='description'
        placeholder='Description'
        className='h-24 w-full resize-none rounded-lg border border-gray-300 bg-background p-2 font-medium text-foreground text-gray-500 transition-colors'
        value={blog.description}
        onChange={onInputChange}
      />
      <input
        type='text'
        name='imageUrl'
        placeholder='Image URL'
        className='rounded-lg border border-gray-300 bg-background p-2 font-medium text-foreground text-gray-500 transition-colors'
        value={blog.imageUrl}
        onChange={onInputChange}
      />
      <input
        type='text'
        name='tags'
        placeholder='Tags (comma separated)'
        className='rounded-lg border border-gray-300 bg-background p-2 font-medium text-foreground text-gray-500 transition-colors'
        value={blog.tags?.join(', ') ?? ''}
        onChange={(e) =>
          onInputChange({
            ...e,
            target: {
              ...e.target,
              value: e.target.value
                .split(',')
                .map((tag) => tag.trim())
                .join(', '),
            },
          })
        }
      />
      <MarkdownEditor content={blog.content} onContentChange={onEditorChange} />
      <div className='ml-auto'>
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  );
};

export default AddBlogForm;

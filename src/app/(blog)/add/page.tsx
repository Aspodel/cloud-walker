'use client';
import React, { useState, useEffect } from 'react';
import { IBlog } from '@/types';
import AddBlogForm from '@/components/ui/add-blog-form';

const AddBlog: React.FC = () => {
  const [blog, setBlog] = useState<IBlog>({
    title: '',
    slug: '',
    description: '',
    createdAt: '',
    content: '',
    imageUrl: '',
    tags: [],
  });
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleEditorChange = (newContent: string) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      content: newContent,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const blogToSave = {
      ...blog,
      slug: blog.title.toLowerCase().replace(/ /g, '-'),
      createdAt: new Date().toISOString(),
    };

    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogToSave),
    });

    if (response.ok) {
      setNotification('Article created successfully!');
    } else {
      setNotification('Failed to create article! Please try again.');
      console.error('Failed to create article');
    }
  };

  return (
    <div>
      {notification && (
        <div
          className={`fixed left-0 right-0 top-0 z-10 py-6 text-center text-white ${
            notification.includes('successfully')
              ? 'bg-green-500'
              : 'bg-red-500'
          }`}
        >
          {notification}
        </div>
      )}
      <AddBlogForm
        blog={blog}
        onInputChange={handleInputChange}
        onEditorChange={handleEditorChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddBlog;

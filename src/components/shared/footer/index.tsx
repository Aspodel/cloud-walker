import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='flex justify-center py-2'>
      <p className='text-sm font-medium text-gray-400'>
        &copy; {new Date().getFullYear()} Aspodel. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

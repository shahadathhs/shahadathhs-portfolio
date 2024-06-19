import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className='text-center p-4 text-2xl'>
        Your requested content is loading....
      </p>
      <span className="loading loading-dots loading-lg"></span>
      <span className="loading loading-dots loading-lg"></span>
      <span className="loading loading-dots loading-lg"></span>
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
};

export default Loading;
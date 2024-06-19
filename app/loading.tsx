import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className='text-center p-4 text-2xl'>
        Your requested content is loading....
      </p>
      <div>
        <span className="loading loading-dots loading-lg"></span>
        <span className="loading loading-dots loading-lg"></span>
        <span className="loading loading-dots loading-lg"></span>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
};

export default Loading;
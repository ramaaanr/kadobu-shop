import React from 'react';
import { MoonLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <MoonLoader color="#6424b2" size={80} />
    </div>
  );
};

export default Loading;

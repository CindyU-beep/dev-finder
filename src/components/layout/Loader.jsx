import loader from './assets/loader.gif';

import React from 'react';

function Loader() {
  return (
    <div className="w-120">
      <img
        src={loader}
        alt="Loading..."
        className="text-center mx-auto"
        width={800}
      />
    </div>
  );
}

export default Loader;

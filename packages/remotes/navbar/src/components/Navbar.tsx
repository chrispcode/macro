import React, { useState } from 'react';

function Navbar() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count is now: {count}</h1>
      <button onClick={() => setCount(count + 1)}> Up </button>
    </div>
  );
}

export default Navbar;
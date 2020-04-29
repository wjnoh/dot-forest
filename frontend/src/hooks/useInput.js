import React, { useState } from 'react';

function useInput({ type, className, placeholder, required }) {
  const [value, setValue] = useState('');
  const input = <input
    type={type}
    className={className}
    onChange={e => setValue(e.target.value)} 
    placeholder={placeholder}
    required={required}
  />;

  return [value, input];
}

export default useInput;

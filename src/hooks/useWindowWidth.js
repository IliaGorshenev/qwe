import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  let stateVariant = undefined;

  const [width, setWidth] = useState(stateVariant);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

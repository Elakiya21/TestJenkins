import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const SlidingWrapper = ({ children, location }) => {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSlideIn(true);
    }, 1000);
    return () => setSlideIn(false); // Reset on unmount
  }, [location.pathname]); // Trigger animation on path change

  return (
    <div className={`page ${slideIn ? 'slide-in' : ''}`}>
      {children}
    </div>
  );
};

export default withRouter(SlidingWrapper);

import React, { useEffect, useState } from 'react';

const Incrementation = ({ duration, toValue, fromValue, delimiter, children }) => {
  const [currentValue, setCurrentValue] = useState(fromValue);

  useEffect(() => {
    let startTime;

    const incrementValue = (timestamp) => {
      const progress = Math.min(1, (timestamp - startTime) / duration);
      const newValue = Math.floor(progress * (toValue - fromValue) + fromValue);
      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(incrementValue);
      }
    };

    startTime = null;
    requestAnimationFrame(function (timestamp) {
      startTime = timestamp || new Date().getTime();
      incrementValue(startTime);
    });
  }, [duration, toValue, fromValue]);

  return (
    <h1 className='contentimpactcolor'>{currentValue.toLocaleString() + delimiter}</h1>
  );
};

export default Incrementation;

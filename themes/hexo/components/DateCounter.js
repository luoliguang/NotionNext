import React, { useState, useEffect } from 'react';

const DateCounter = ({ startDate, futureDate }) => {
  const [daysSinceStart, setDaysSinceStart] = useState(0);
  const [daysUntilFuture, setDaysUntilFuture] = useState(0);

  useEffect(() => {
    const start = new Date(startDate);
    const future = new Date(futureDate);

    const updateCounter = () => {
      const now = new Date();
      const durationSinceStart = now - start;
      const durationUntilFuture = future - now;

      setDaysSinceStart(Math.floor(durationSinceStart / (1000 * 60 * 60 * 24)));
      setDaysUntilFuture(Math.floor(durationUntilFuture / (1000 * 60 * 60 * 24)));
    };

    updateCounter();
    const timer = setInterval(updateCounter, 1000 * 60 * 60 * 24); // 每天更新一次

    return () => clearInterval(timer);
  }, [startDate, futureDate]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        <h3 className="mb-2">网站运行时间</h3>
        <p className="text-2xl">{daysSinceStart} 天</p>
      </div>
      <div className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        <h3 className="mb-2">距离 {futureDate} 还有</h3>
        <p className="text-2xl">{daysUntilFuture} 天</p>
      </div>
    </div>
  );
};

export default DateCounter;

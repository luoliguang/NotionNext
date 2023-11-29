import React, { useState, useEffect } from 'react';

const formatDateDifference = (startDate, endDate) => {
  const diff = endDate - startDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
};

const DateCounter = ({ startDate, holidayName, holidayDate }) => {
  const [siteRuntime, setSiteRuntime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [daysUntilHoliday, setDaysUntilHoliday] = useState(0);

  useEffect(() => {
    const start = new Date(startDate);
    const holiday = new Date(holidayDate);

    const updateCounter = () => {
      const now = new Date();
      setSiteRuntime(formatDateDifference(start, now));
      setDaysUntilHoliday(formatDateDifference(now, holiday).days);
    };

    updateCounter();
    const timer = setInterval(updateCounter, 1000); // 每秒更新一次

    return () => clearInterval(timer);
  }, [startDate, holidayDate]);

  return (
    <div className="flex flex-col items-start justify-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        <h3 className="mb-2">网站运行时间</h3>
        <p className="text-xl">{siteRuntime.days}天 {siteRuntime.hours}小时 {siteRuntime.minutes}分钟 {siteRuntime.seconds}秒</p>
      </div>
      <div className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        <h3 className="mb-2">距离{holidayName}还有</h3>
        <p className="text-xl">{daysUntilHoliday} 天</p>
      </div>
    </div>
  );
};

export default DateCounter;

import React from 'react';
import CONFIG from 'themes/hexo/config'; // 导入CONFIG

const DateCounter = () => {
  // 从CONFIG中提取所需的值
  const { SITE_START_DATE, HOLIDAY_NAME, HOLIDAY_DATE } = CONFIG;

  // 组件的其余部分...
  import React, { useState, useEffect } from 'react';

const formatDateDifference = (startDate, endDate) => {
  let diff = endDate.getTime() - startDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);

  // 将小时、分钟和秒转换为双位数格式
  const formatDoubleDigit = (num) => num.toString().padStart(2, '0');

  return { 
    days, 
    hours: formatDoubleDigit(hours), 
    minutes: formatDoubleDigit(minutes), 
    seconds: formatDoubleDigit(seconds) 
  };
};

const DateCounter = ({ startDate, holidayName, holidayDate }) => {
  const [siteRuntime, setSiteRuntime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [holidayCountdown, setHolidayCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const start = new Date(startDate);
    const holiday = new Date(holidayDate);

    const updateCounter = () => {
      const now = new Date();
      setSiteRuntime(formatDateDifference(start, now));
      setHolidayCountdown(formatDateDifference(now, holiday));
    };

    updateCounter();
    const timer = setInterval(updateCounter, 1000); // 每秒更新一次

    return () => clearInterval(timer);
  }, [startDate, holidayDate]);

  return (
    <div className="flex flex-col items-start justify-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        <h3 className="mb-2">网站已经运行</h3>
        <p className="text-xl">{siteRuntime.days}天 {siteRuntime.hours}小时 {siteRuntime.minutes}分钟 {siteRuntime.seconds}秒</p>
      </div>
      <div className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        <h3 className="mb-2">距离{holidayName}还有</h3>
        <p className="text-xl">{holidayCountdown.days}天 {holidayCountdown.hours}小时 {holidayCountdown.minutes}分钟 {holidayCountdown.seconds}秒</p>
      </div>
    </div>
  );
};

export default DateCounter;

};

export default DateCounter;

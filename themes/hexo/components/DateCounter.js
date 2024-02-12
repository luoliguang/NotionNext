import React, { useState, useEffect } from 'react';
import CONFIG from 'themes/hexo/config'; // 导入CONFIG

const formatDateDifference = (startDate, endDate) => {
  let diff = endDate.getTime() - startDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);

  const formatDoubleDigit = (num) => num.toString().padStart(2, '0');

  return {
    days,
    hours: formatDoubleDigit(hours),
    minutes: formatDoubleDigit(minutes),
    seconds: formatDoubleDigit(seconds),
  };
};

const DateCounter = () => {
  const { SITE_START_DATE, HOLIDAY_NAME, HOLIDAY_DATE,SITE_START_LOVE } = CONFIG;
  const [siteRuntime, setSiteRuntime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [holidayCountdown, setHolidayCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [startLove, setStartLove] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 }); //love

  useEffect(() => {
    const start = new Date(SITE_START_DATE);
    const holiday = new Date(HOLIDAY_DATE);
    const startLove = new Date(SITE_START_LOVE); //love

    const updateCounter = () => {
      const now = new Date();
      setSiteRuntime(formatDateDifference(start, now));
      setHolidayCountdown(formatDateDifference(now, holiday));
      setStartLove(formatDateDifference(startLove, now)); //love
      
    };

    updateCounter();
    const timer = setInterval(updateCounter, 1000); // 每秒更新一次

    return () => clearInterval(timer);
  }, []);

  /*
        <div className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        <h3 className="mb-2"><i class="fa-solid fa-clock"></i> 距离{HOLIDAY_NAME}还有</h3>
        <p className="text-xl">{holidayCountdown.days}天 {holidayCountdown.hours}小时 {holidayCountdown.minutes}分钟 {holidayCountdown.seconds}秒</p>
      </div>
  */
  return (
    <div className="flex flex-col items-start justify-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        <h3 className="mb-2"><i class="fa-solid fa-person-running"></i> 网站已经运行</h3>
        <p className="text-xl">{siteRuntime.days}天 {siteRuntime.hours}小时 {siteRuntime.minutes}分钟 {siteRuntime.seconds}秒</p>
      </div>

      <div className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        <h3 className="mb-2"><i class="fa-solid fa-people-pulling"></i> ALREADY IN LOVE</h3>
        <p className="text-xl">{startLove.days}天 {startLove.hours}小时 {startLove.minutes}分钟 {startLove.seconds}秒</p>
      </div>
    </div>
  );
};

export default DateCounter;


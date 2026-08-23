"use client";

import { useEffect, useState } from "react";

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const ONE_HOUR_MS = 60 * 60 * 1000;
const ONE_DAY_MS = 24 * ONE_HOUR_MS;

function getRegistrationDate(now = Date.now()) {
  // 한국시간 00:00~00:59에는 전날을 표시하고, 01:00부터 당일로 전환합니다.
  const effectiveTime = new Date(now - ONE_HOUR_MS);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(effectiveTime);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${value("year")}.${value("month")}.${value("day")}`;
}

function millisecondsUntilNextKstOne(now = Date.now()) {
  const kstNow = new Date(now + KST_OFFSET_MS);
  let nextBoundary = Date.UTC(
    kstNow.getUTCFullYear(),
    kstNow.getUTCMonth(),
    kstNow.getUTCDate(),
    1,
    0,
    0,
    50,
  );

  if (nextBoundary <= kstNow.getTime()) {
    nextBoundary += ONE_DAY_MS;
  }

  return Math.max(1000, nextBoundary - kstNow.getTime());
}

export default function DailyRegistrationDate() {
  const [date, setDate] = useState(() => getRegistrationDate());

  useEffect(() => {
    let timer: number;

    const scheduleNextUpdate = () => {
      timer = window.setTimeout(() => {
        setDate(getRegistrationDate());
        scheduleNextUpdate();
      }, millisecondsUntilNextKstOne());
    };

    scheduleNextUpdate();
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <time
      className="serviceRegistrationDate"
      dateTime={date.replaceAll(".", "-")}
      suppressHydrationWarning
    >
      등록일 {date}
    </time>
  );
}

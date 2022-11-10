import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";

import Watch from "foundations/w/clock/watch";

import * as Tone from "tone";

const getRandom = (a, b) => Math.random() * (b - a) + a;

//put 0 in front of numbers to match digit
const formatNumber = (n, digit = 2) => ("0".repeat(digit) + Math.floor(n)).slice(-digit);

export default function Pyramid() {
  const [century, setCentury] = useState(Math.ceil(new Date().getFullYear() / 100));
  const [year, setYear] = useState(new Date().getFullYear() % 100);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [second, setSecond] = useState(new Date().getSeconds());

  //states
  const [cycleState, setCycleState] = useState(0);
  const [randomnessStep, setRandomnessStep] = useState(1);

  //changing: 0 = second, 1 = minute, 2 = hour, 3 = day, 4 = month, 5 = year, 6 = century
  const [changing, setChanging] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [randomnessStep, cycleState]);

  //basic time adjust logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (second >= 60) {
      setSecond(0);
      setMinute((m) => m + 1);
      if (changing === 0) {
        setCycleState((c) => c + 1);
      }
    } else if (second < 0) {
      setSecond(59);
      setMinute((m) => m - 1);
    }
  }, [second, changing]);

  useEffect(() => {
    if (minute >= 60) {
      setMinute(0);
      setHour((h) => h + 1);
      setCycleState((c) => c + 1);
    } else if (minute < 0) {
      setMinute(59);
      setHour((h) => h - 1);
    }
  }, [minute]);

  useEffect(() => {
    if (hour >= 24) {
      setHour(0);
      setDay((d) => d + 1);
      setCycleState((c) => c + 1);
    } else if (hour < 0) {
      setHour(23);
      setDay((d) => d - 1);
    }
  }, [hour]);

  useEffect(() => {
    if (day > 31) {
      setDay(1);
      setMonth((m) => m + 1);
      setCycleState((c) => c + 1);
    } else if (day < 1) {
      setDay(31);
      setMonth((m) => m - 1);
    }
  }, [day]);

  useEffect(() => {
    if (month > 12) {
      setMonth(1);
      setYear((y) => y + 1);
      setCycleState((c) => c + 1);
    } else if (month < 1) {
      setMonth(12);
      setYear((y) => y - 1);
    }
  }, [month]);

  useEffect(() => {
    if (year > 99) {
      setYear(0);
      setCentury((c) => c + 1);
      setCycleState((c) => c + 1);
    } else if (year < 0) {
      setYear(99);
      setCentury((c) => c - 1);
    }
  }, [year]);

  //on key press w
  const [showTime, setShowTime] = useState(0);

  const handleKeyDown = (e) => {
    if (e.code === "KeyW") {
      if (randomnessStep < 60) {
        setSecond((s) => s + randomnessStep);
      } else if (randomnessStep > 60 && randomnessStep < 3600) {
        setChanging(1);
        setMinute((m) => m + randomnessStep / 60);
      } else if (randomnessStep > 3600 && randomnessStep < 86400) {
        setChanging(2);
        setHour((h) => h + randomnessStep / 3600);
      } else if (randomnessStep > 86400 && randomnessStep < 2592000) {
        setChanging(3);
        setDay((d) => d + randomnessStep / 86400);
      } else if (randomnessStep > 2592000 && randomnessStep < 31104000) {
        setChanging(4);
        setMonth((m) => m + randomnessStep / 2592000);
      } else if (randomnessStep > 31104000 && randomnessStep < 3110400000) {
        setChanging(5);
        setYear((y) => y + randomnessStep / 31104000);
      } else if (randomnessStep > 3110400000) {
        setChanging(6);
        setCentury((c) => c + randomnessStep / 3110400000);
      }
      if (Math.random() < 0.9) {
        setShowTime((t) => (t + 1) % 12);
      }
    }
  };

  useEffect(() => {
    if (cycleState >= 1) {
      setRandomnessStep((s) => s * 2.1);
    }
  }, [cycleState]);

  return (
    <S.Container>
      {showTime >= 6 && (
        <S.SingleTime>
          {changing >= 3 && (
            <>
              <S.Box highlighted={changing === 6}>
                {formatNumber(century)}
                <S.Unit>CC</S.Unit>
              </S.Box>
              <DotSets />
              <S.Box highlighted={changing === 5}>
                {formatNumber(year)}
                <S.Unit>YY</S.Unit>
              </S.Box>
              <DotSets />
              <S.Box highlighted={changing === 4}>
                {formatNumber(month)}
                <S.Unit>MM</S.Unit>
              </S.Box>
              <DotSets />
              <S.Box highlighted={changing === 3}>
                {formatNumber(day)}
                <S.Unit>DD</S.Unit>
              </S.Box>
              <DotSets />
            </>
          )}
          <S.Box highlighted={changing === 2}>
            {formatNumber(hour)}
            <S.Unit>HH</S.Unit>
          </S.Box>
          <DotSets />
          <S.Box highlighted={changing === 1}>
            {formatNumber(minute)}
            <S.Unit>MM</S.Unit>
          </S.Box>
          <DotSets />
          <S.Box highlighted={changing === 0}>
            {formatNumber(second)}
            <S.Unit>SS</S.Unit>
          </S.Box>
        </S.SingleTime>
      )}
      {showTime < 7 && <Watch hour={hour} minute={minute} second={second} day={day} month={month} year={year} century={century} changing={changing} showTime={showTime} cycleState={cycleState} />}
    </S.Container>
  );
}

function DotSets() {
  return (
    <S.Dots>
      <S.Dot />
      <S.Dot />
    </S.Dots>
  );
}

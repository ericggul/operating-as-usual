import * as S from "./styles";
import useResize from "utils/hooks/useResize";
import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";

import Watch from "foundations/w/clock/watch";

import * as Tone from "tone";

const getRandom = (a, b) => Math.random() * (b - a) + a;
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//put 0 in front of numbers to match digit
const formatNumber = (n, digit = 2) => ("0".repeat(digit) + Math.floor(n)).slice(-digit);
const TIME_UNITS = ["C", "Y", "M", "D", "H", "M", "S"];

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
  const [step, setStep] = useState(1);
  const [randomnessParty, setRandomnessParty] = useState(false);
  const [extinction, setExtinction] = useState(false);

  //changing: 0 = second, 1 = minute, 2 = hour, 3 = day, 4 = month, 5 = year, 6 = century
  const [changing, setChanging] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [step, cycleState, randomnessParty, extinction]);

  //basic time adjust logic
  useEffect(() => {
    if (!randomnessParty) {
      const interval = setInterval(() => {
        setSecond((s) => s + 1);
        try {
          const synth = new Tone.MembraneSynth().toDestination();
          const now = Tone.now();
          synth.triggerAttackRelease("D2", "8n", now + 0.1);
        } catch (e) {
          console.log(e);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [randomnessParty]);

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
    if (changing >= 5 && year >= 80) {
      setRandomnessParty(true);
    }
  }, [changing, year]);

  //on key press w
  const [showTime, setShowTime] = useState(0);

  const handleKeyDown = (e) => {
    Tone.start();

    const synth = new Tone.MembraneSynth().toDestination();
    const now = Tone.now();

    if (e.code === "KeyW") {
      if (!randomnessParty) {
        if (step === 0) {
          setChanging(5);
          setYear((y) => y + 1);
        } else if (step > 0 && step < 60) {
          synth.triggerAttackRelease("C2", "8n", now + 0.1);
          setSecond((s) => s + step);
        } else if (step > 60 && step < 3600) {
          synth.triggerAttackRelease("C2", "8n", now + 0.1);
          setChanging(1);
          setMinute((m) => m + step / 60);
        } else if (step > 3600 && step < 86400) {
          synth.triggerAttackRelease("C3", "8n", now + 0.1);
          setChanging(2);
          setHour((h) => h + step / 3600);
        } else if (step > 86400 && step < 2592000) {
          synth.triggerAttackRelease("C4", "8n", now + 0.1);
          setChanging(3);
          setDay((d) => d + step / 86400);
        } else if (step > 2592000 && step < 31104000) {
          synth.triggerAttackRelease("C5", "8n", now + 0.1);
          setChanging(4);
          setMonth((m) => m + step / 2592000);
        } else if (step > 31104000) {
          setStep(0);
          setChanging(5);
          setYear((y) => y + 1);
        }
        if (Math.random() < 0.9) {
          setShowTime((t) => (t + 1) % 12);
        }
      } else if (randomnessParty && !extinction) {
        setSecond((s) => s + 11);
        setMinute((m) => m + 11);
        setHour((h) => h + 5);
        setDay((d) => d + 2);
        setMonth((m) => m + 1);
        unitOrderShuffle();
      }
    }
  };

  useEffect(() => {
    if (cycleState >= 1) {
      if (step > 0 && step < 60) {
        setStep((s) => s * 2.8);
      } else if (step < 3600) {
        setStep((s) => s * 2.3);
      } else if (step < 86400) {
        setStep((s) => s * 1.6);
      } else if (step < 31104000) {
        setStep((s) => s * 1.5);
      }
    }
  }, [cycleState]);

  //time unit
  const [unitOrder, setUnitOrder] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [shuffleStack, setShuffleStack] = useState(0);
  function unitOrderShuffle() {
    setShuffleStack((s) => s + 1);
  }

  useEffect(() => {
    if (shuffleStack >= 6) {
      setShuffleStack(0);
      const newOrder = unitOrder.sort(() => Math.random() - 0.5);
      setUnitOrder(newOrder);
    }
  }, [shuffleStack]);

  useEffect(() => {
    if (cycleState >= 60 && randomnessParty) {
      setExtinction(true);
    }
  }, [cycleState, randomnessParty]);

  const audioRef = useRef();
  const [gameOver, setGameOver] = useState(false);
  useEffect(() => {
    if (extinction) {
      const osc = new Tone.Oscillator(1000, "sine").toDestination();
      osc.start().stop("+5");
      const timeout = setTimeout(() => setGameOver(true), 5000);
      return () => clearTimeout(timeout);
    }
  }, [extinction]);

  useEffect(() => {
    if (audioRef && audioRef.current && gameOver) {
      audioRef.current.play();
    }
  }, [gameOver, audioRef]);

  return (
    <>
      <S.Container extinction={extinction}>
        {(showTime >= 6 || changing >= 5) && (
          <>
            {new Array(cycleState >= 45 ? 7 : 1).fill(0).map((_, i) => (
              <S.SingleTime key={i}>
                {changing >= 3 && (
                  <>
                    <S.Box highlighted={changing === 6} extinctions={extinction}>
                      {formatNumber(century)}
                      <S.Unit>
                        {TIME_UNITS[unitOrder[0]]}
                        {TIME_UNITS[unitOrder[0]]}
                      </S.Unit>
                    </S.Box>
                    <DotSets />
                    <S.Box highlighted={changing === 5} extinctions={extinction}>
                      {formatNumber(year)}
                      <S.Unit>
                        {TIME_UNITS[unitOrder[1]]}
                        {TIME_UNITS[unitOrder[1]]}
                      </S.Unit>
                    </S.Box>
                    <DotSets />
                    <S.Box highlighted={changing === 4} extinctions={extinction}>
                      {formatNumber(month)}
                      <S.Unit>
                        {TIME_UNITS[unitOrder[2]]}
                        {TIME_UNITS[unitOrder[2]]}
                      </S.Unit>
                    </S.Box>
                    <DotSets />
                    <S.Box highlighted={changing === 3} extinctions={extinction}>
                      {formatNumber(day)}
                      <S.Unit>
                        {TIME_UNITS[unitOrder[3]]}
                        {TIME_UNITS[unitOrder[3]]}
                      </S.Unit>
                    </S.Box>
                    <DotSets />
                  </>
                )}
                <S.Box highlighted={changing === 2} extinctions={extinction}>
                  {formatNumber(hour)}
                  <S.Unit>
                    {TIME_UNITS[unitOrder[4]]}
                    {TIME_UNITS[unitOrder[4]]}
                  </S.Unit>
                </S.Box>
                <DotSets />
                <S.Box highlighted={changing === 1} extinctions={extinction}>
                  {formatNumber(minute)}
                  <S.Unit>
                    {TIME_UNITS[unitOrder[5]]}
                    {TIME_UNITS[unitOrder[5]]}
                  </S.Unit>
                </S.Box>
                <DotSets />
                <S.Box highlighted={changing === 0} extinctions={extinction}>
                  {formatNumber(second)}
                  <S.Unit>
                    {TIME_UNITS[unitOrder[6]]}
                    {TIME_UNITS[unitOrder[6]]}
                  </S.Unit>
                </S.Box>
              </S.SingleTime>
            ))}
          </>
        )}
        {(showTime < 7 || changing >= 5) && (
          <Watch hour={hour} minute={minute} second={second} day={day} month={month} year={year} century={century} changing={changing} showTime={showTime} cycleState={cycleState} />
        )}
        <audio id="audio" src={"/assets/sound/mario.flac"} ref={audioRef} />
      </S.Container>
      {gameOver && <S.Hole />}
    </>
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

import { useEffect, useState } from "react";
import * as S from "./styles";

//put 0 in front of numbers to match digit
const formatNumber = (n, digit = 2) => ("0".repeat(digit) + Math.floor(n)).slice(-digit);

export default function Watch({ hour, minute, second, day, month, year, century, changing, cycleState }) {
  const [megaClockCount, setMegaClockCount] = useState(0);

  //mgaclock state
  useEffect(() => {
    if (changing === 5) {
      if (year >= 50 && megaClockCount === 0) {
        setMegaClockCount(1);
      } else if (year >= 60 && megaClockCount === 1) {
        setMegaClockCount(2);
      } else if (year >= 70 && megaClockCount === 2) {
        setMegaClockCount(3);
      } else if (year >= 80 && megaClockCount === 3) {
        setMegaClockCount(4);
      } else if (year >= 90 && megaClockCount === 4) {
        setMegaClockCount(5);
      }
    }
  }, [year, changing]);

  return (
    <S.WatchContainer scaleLevel={Math.max(0, Math.floor((cycleState - 32) / 3) / 3)}>
      {changing >= 2 && (
        <S.Clock changing={changing}>
          <S.Hour rotation={(cycleState * (changing === 2) + (hour + (minute * 1) / 60) / 12) * 360} changing={changing} />
          <S.Minute rotation={(cycleState * (changing === 1) + (minute + (second * 1) / 60) / 60) * 360} changing={changing} />
          <S.Center />
          {changing >= 3 && (
            <S.SemiClockContainer>
              <S.SemiClock>
                <S.Day rotation={((day + (hour * 1) / 24) / 31) * 360} changing={changing} />
                <S.SemiCenter />
                <S.SemiText>{formatNumber(day)}</S.SemiText>
              </S.SemiClock>
              {changing >= 4 && (
                <S.SemiClock>
                  <S.Day rotation={((month + (day * 1) / 31 + (hour * 1) / 744) / 12) * 360} changing={changing} />
                  <S.SemiCenter />
                  <S.SemiText>{formatNumber(month)}</S.SemiText>
                </S.SemiClock>
              )}
            </S.SemiClockContainer>
          )}
          {changing >= 5 && (
            <>
              <S.MegaClock width={35}>
                <S.Year rotation={(year / 100) * 360} changing={changing} />
              </S.MegaClock>
              {new Array(megaClockCount).fill(0).map((_, i) => (
                <S.MegaClock width={40 + i * 5} key={i} />
              ))}
            </>
          )}
        </S.Clock>
      )}

      <S.Clock changing={changing}>
        <S.Hour rotation={(cycleState * (changing === 2) + (hour + (minute * 1) / 60) / 12) * 360} changing={changing} />
        <S.Minute rotation={(cycleState * (changing === 1) + (minute + (second * 1) / 60) / 60) * 360} changing={changing} />
        {changing < 1 && <S.Second rotation={(cycleState * (changing === 0) + second / 60) * 360} />}
        <S.Center changing={changing} />
        {changing >= 3 && (
          <S.SemiClockContainer>
            <S.SemiClock>
              <S.Day rotation={((day + (hour * 1) / 24) / 31) * 360} changing={changing} />
              <S.SemiCenter />
              <S.SemiText>{formatNumber(day)}</S.SemiText>
            </S.SemiClock>
            {changing >= 4 && (
              <S.SemiClock>
                <S.Day rotation={((month + (day * 1) / 31 + (hour * 1) / 744) / 12) * 360} changing={changing} />
                <S.SemiCenter />
                <S.SemiText>{formatNumber(month)}</S.SemiText>
              </S.SemiClock>
            )}
          </S.SemiClockContainer>
        )}
        {changing >= 5 && (
          <>
            <S.MegaClock width={35}>
              <S.Year rotation={(year / 100) * 360} changing={changing} />
            </S.MegaClock>

            {new Array(megaClockCount).fill(0).map((_, i) => (
              <S.MegaClock width={40 + i * 5} key={i} />
            ))}
          </>
        )}
      </S.Clock>

      {changing >= 2 && (
        <S.Clock changing={changing}>
          <S.Hour rotation={(cycleState * (changing === 2) + (hour + (minute * 1) / 60) / 12) * 360} changing={changing} />
          <S.Minute rotation={(cycleState * (changing === 1) + (minute + (second * 1) / 60) / 60) * 360} changing={changing} />
          <S.Center />
          {changing >= 3 && (
            <S.SemiClockContainer>
              <S.SemiClock>
                <S.Day rotation={((day + (hour * 1) / 24) / 31) * 360} changing={changing} />
                <S.SemiCenter />
                <S.SemiText>{formatNumber(day)}</S.SemiText>
              </S.SemiClock>
              {changing >= 4 && (
                <S.SemiClock>
                  <S.Day rotation={((month + (day * 1) / 31 + (hour * 1) / 744) / 12) * 360} changing={changing} />
                  <S.SemiCenter />
                  <S.SemiText>{formatNumber(month)}</S.SemiText>
                </S.SemiClock>
              )}
            </S.SemiClockContainer>
          )}
          {changing >= 5 && (
            <>
              <S.MegaClock width={35}>
                <S.Year rotation={(year / 100) * 360} changing={changing} />
              </S.MegaClock>

              {new Array(megaClockCount).fill(0).map((_, i) => (
                <S.MegaClock width={40 + i * 5} key={i} />
              ))}
            </>
          )}
        </S.Clock>
      )}
    </S.WatchContainer>
  );
}

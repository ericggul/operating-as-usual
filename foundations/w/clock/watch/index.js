import * as S from "./styles";

export default function Watch({ hour, minute, second, day, month, year, century, changing, cycleState }) {
  return (
    <S.WatchContainer>
      {changing >= 2 && (
        <S.Clock changing={changing}>
          <S.Hour rotation={(cycleState * (changing === 2) + (hour + (minute * 1) / 60 + (second * 1) / 3600) / 12) * 360} changing={changing} />
          <S.Minute rotation={(cycleState * (changing === 1) + (minute + (second * 1) / 60) / 60) * 360} changing={changing} />
          <S.Center />
          {changing >= 3 && (
            <S.SemiClockContainer>
              <S.SemiClock>
                <S.Day rotation={((day + (hour * 1) / 24 + (minute * 1) / 1440 + (second * 1) / 86400) / 31) * 360} changing={changing} />
                <S.SemiCenter />
              </S.SemiClock>
              {changing >= 4 && (
                <S.SemiClock>
                  <S.Day rotation={((month + (day * 1) / 31 + (hour * 1) / 744 + (minute * 1) / 44640 + (second * 1) / 2678400) / 12) * 360} changing={changing} />
                  <S.SemiCenter />
                </S.SemiClock>
              )}
            </S.SemiClockContainer>
          )}
          {changing >= 5 && (
            <>
              <S.MegaClock width={35}>
                <S.Year rotation={((year + (month * 1) / 12 + (day * 1) / 365 + (hour * 1) / 8760 + (minute * 1) / 525600 + (second * 1) / 31536000) / 100) * 360} changing={changing} />
              </S.MegaClock>
              {new Array(Math.max(0, Math.floor(((cycleState - 30) * 100 + year - 5) / 80))).fill(0).map((_, i) => (
                <S.MegaClock width={40 + i * 5} key={i} />
              ))}
            </>
          )}
        </S.Clock>
      )}

      <S.Clock changing={changing}>
        <S.Hour rotation={(cycleState * (changing === 2) + (hour + (minute * 1) / 60 + (second * 1) / 3600) / 12) * 360} changing={changing} />
        <S.Minute rotation={(cycleState * (changing === 1) + (minute + (second * 1) / 60) / 60) * 360} changing={changing} />
        {changing < 1 && <S.Second rotation={(cycleState * (changing === 0) + second / 60) * 360} />}
        <S.Center changing={changing} />
        {changing >= 3 && (
          <S.SemiClockContainer>
            <S.SemiClock>
              <S.Day rotation={((day + (hour * 1) / 24 + (minute * 1) / 1440 + (second * 1) / 86400) / 31) * 360} changing={changing} />
              <S.SemiCenter />
            </S.SemiClock>
            {changing >= 4 && (
              <S.SemiClock>
                <S.Day rotation={((month + (day * 1) / 31 + (hour * 1) / 744 + (minute * 1) / 44640 + (second * 1) / 2678400) / 12) * 360} changing={changing} />
                <S.SemiCenter />
              </S.SemiClock>
            )}
          </S.SemiClockContainer>
        )}
        {changing >= 5 && (
          <>
            <S.MegaClock width={35}>
              <S.Year rotation={((year + (month * 1) / 12 + (day * 1) / 365 + (hour * 1) / 8760 + (minute * 1) / 525600 + (second * 1) / 31536000) / 100) * 360} changing={changing} />
            </S.MegaClock>

            {new Array(Math.max(0, Math.floor(((cycleState - 30) * 100 + year - 5) / 80))).fill(0).map((_, i) => (
              <S.MegaClock width={40 + i * 5} key={i} />
            ))}
          </>
        )}
      </S.Clock>

      {changing >= 2 && (
        <S.Clock changing={changing}>
          <S.Hour rotation={(cycleState * (changing === 2) + (hour + (minute * 1) / 60 + (second * 1) / 3600) / 12) * 360} changing={changing} />
          <S.Minute rotation={(cycleState * (changing === 1) + (minute + (second * 1) / 60) / 60) * 360} changing={changing} />
          <S.Center />
          {changing >= 3 && (
            <S.SemiClockContainer>
              <S.SemiClock>
                <S.Day rotation={((day + (hour * 1) / 24 + (minute * 1) / 1440 + (second * 1) / 86400) / 31) * 360} changing={changing} />
                <S.SemiCenter />
              </S.SemiClock>
              {changing >= 4 && (
                <S.SemiClock>
                  <S.Day rotation={((month + (day * 1) / 31 + (hour * 1) / 744 + (minute * 1) / 44640 + (second * 1) / 2678400) / 12) * 360} changing={changing} />
                  <S.SemiCenter />
                </S.SemiClock>
              )}
            </S.SemiClockContainer>
          )}
          {changing >= 5 && (
            <>
              <S.MegaClock width={35}>
                <S.Year rotation={((year + (month * 1) / 12 + (day * 1) / 365 + (hour * 1) / 8760 + (minute * 1) / 525600 + (second * 1) / 31536000) / 100) * 360} changing={changing} />
              </S.MegaClock>

              {new Array(Math.max(0, Math.floor(((cycleState - 30) * 100 + year - 5) / 80))).fill(0).map((_, i) => (
                <S.MegaClock width={40 + i * 5} key={i} />
              ))}
            </>
          )}
        </S.Clock>
      )}
    </S.WatchContainer>
  );
}

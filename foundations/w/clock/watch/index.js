import * as S from "./styles";

export default function Watch({ hour, minute, second, day, month, year, century, changing }) {
  return (
    <S.WatchContainer>
      {changing === 2 && (
        <S.Clock changing={changing}>
          <S.Hour rotation={((hour + (minute * 1) / 60 + (second * 1) / 3600) / 12) * 360} changing={changing} />
          <S.Minute rotation={((minute + (second * 1) / 60) / 60) * 360} changing={changing} />
          <S.Center />
        </S.Clock>
      )}

      <S.Clock changing={changing}>
        <S.Hour rotation={((hour + (minute * 1) / 60 + (second * 1) / 3600) / 12) * 360} changing={changing} />
        <S.Minute rotation={((minute + (second * 1) / 60) / 60) * 360} changing={changing} />
        {changing < 2 && <S.Second rotation={(second / 60) * 360} />}
        <S.Center />
      </S.Clock>

      {changing === 2 && (
        <S.Clock changing={changing}>
          <S.Hour rotation={((hour + (minute * 1) / 60 + (second * 1) / 3600) / 12) * 360} changing={changing} />
          <S.Minute rotation={((minute + (second * 1) / 60) / 60) * 360} changing={changing} />
          <S.Center />
        </S.Clock>
      )}
    </S.WatchContainer>
  );
}

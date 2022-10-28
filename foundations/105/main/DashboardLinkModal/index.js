import * as S from "./styles";
import Link from "next/link";

export default function DashboardLinkModal({ order }) {
  return (
    <S.Container onClick={(e) => e.stopPropagation()}>
      <S.Inner>
        <S.Text>Congrats! Now checkout the archive to view your progress!</S.Text>
        <Link href={{ pathname: "/105/archive", query: { order } }}>
          <a target="_blank" rel="noopener noreferrer">
            <S.Button>Go to Archive</S.Button>
          </a>
        </Link>
      </S.Inner>
    </S.Container>
  );
}

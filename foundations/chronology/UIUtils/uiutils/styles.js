import styled from "styled-components";

export const UtilsContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  ${({ theme }) => theme.windowWidth < 768 && "left: 0;"}
  ${({ theme }) => theme.windowWidth > 768 && "right: 3rem;"}
  ${({ theme }) => theme.windowWidth < 768 && "margin: auto;"}
  width: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${({ theme }) => theme.windowWidth < 768 && "width: 100%;"}
  ${({ theme }) => theme.windowWidth < 768 && "flex-direction: row;"}


  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: appear 1s backwards;
`;

export const RealTimeModal = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 1rem;

  ${({ theme }) => theme.windowWidth < 768 && "width: calc(50vw - 6rem);"}
  ${({ theme }) => theme.windowWidth < 768 && "margin: 1rem 0;"}
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.8rem 0;
`;

export const El = styled.div`
  cursor: pointer;
  width: 2rem;
  height: 1rem;
  padding: 0.3rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0);
  z-index: 100;
  ${(props) => props.selected && `border: 1px solid white;`}
  ${(props) => props.selected && `color: white;`}
`;

export const ResetPosition = styled.div`
  width: 12rem;
  color: white;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
  cursor: pointer;

  ${({ theme }) => theme.windowWidth < 768 && "width: calc(50vw - 6rem);"}
`;

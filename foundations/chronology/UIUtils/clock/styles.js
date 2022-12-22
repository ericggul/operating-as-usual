import styled from "styled-components";

export const ClockElement = styled.div`
  position: relative;
  width: 12rem;
  height: 15rem;
`;

export const Large = styled.div`
  position: absolute;
  width: 0.25rem;
  height: 3rem;
  background: linear-gradient(#fff, rgba(0, 0, 0, 0));

  transform: translateX(-50%) translateY(-50%)
    rotate(${(props) => props.angle}deg);
  top: ${(props) => props.top}rem;
  left: ${(props) => props.left}rem;

  cursor: pointer;
  ${(props) => props.current && `background: #fff;`}
  ${(props) =>
    props.current && `box-shadow: 0 0 1rem #fff, 0 0 2rem #fff, 0 0 3rem #fff;`}
`;

export const Small = styled.div`
  position: absolute;
  width: 0.125rem;
  height: 2rem;

  background: linear-gradient(#fff, rgba(0, 0, 0, 0));
  ${(props) => props.current && `background: #fff;`}
  ${(props) =>
    props.current &&
    `box-shadow: 0 0 .5rem #fff, 0 0 1rem #fff, 0 0 2rem #fff;`}

  transform: translateX(-50%) translateY(-50%)
    rotate(${(props) => props.angle}deg);
  top: ${(props) => props.top}rem;
  left: ${(props) => props.left}rem;

  cursor: pointer;
`;

export const Text = styled.div`
  position: absolute;

  font-size: 1rem;
  font-weight: bold;

  transform: translateX(-50%) translateY(-50%);
  top: ${(props) => props.top}rem;
  left: ${(props) => props.left}rem;

  opacity: 0;
  opacity: ${(props) => props.show && "1"};
  cursor: pointer;
  color: white;

  transition: opacity 0.3s;

  display: flex;
  align-items: center;
  justify-contetn: center;
  padding: 2rem;
`;

export const Hour = styled.div`
  position: absolute;
  width: 0.25rem;
  height: 2.25rem;
  background: linear-gradient(#fff, rgba(0, 0, 0, 0));

  transform: translateX(-50%) translateY(-50%)
    rotate(${(props) => props.angle}deg);
  top: ${(props) => props.top}rem;
  left: ${(props) => props.left}rem;

  cursor: pointer;

  border-radius: 0.125rem;
`;

export const Min = styled.div`
  position: absolute;
  width: 0.25rem;
  height: 3.25rem;
  background: linear-gradient(#fff, rgba(0, 0, 0, 0));

  transform: translateX(-50%) translateY(-50%)
    rotate(${(props) => props.angle}deg);
  top: ${(props) => props.top}rem;
  left: ${(props) => props.left}rem;

  cursor: pointer;
  border-radius: 0.125rem;
`;

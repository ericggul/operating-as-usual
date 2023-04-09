import * as S from "./styles";
import { useState, useEffect } from "react";

const CHAT_DATA = [
  {
    name: "Freya",
    profilePic: "/assets/images/unity/profile_1.jpg",
    time: "15:30",
    message:
      "Hi, I am Freya. I am a student at the University of Toronto. I am looking for a roommate to share a room with me. I am a very clean person and I am looking for someone who is also clean.",
  },
  {
    name: "Carrie",
    profilePic: "/assets/images/unity/profile_2.jpg",
    time: "15:30",
    message: "Hi, I am Carrie. I am a student at the University of Toronto. I am looking for a roommate to share a room with me.",
  },
  {
    name: "Freya",
    profilePic: "/assets/images/unity/profile_1.jpg",
    time: "15:32",
    message: "Sounds good. I am interested in your room. When can we meet up to see the room?",
  },
  {
    name: "Carrie",
    profilePic: "/assets/images/unity/profile_2.jpg",
    time: "15:33",
    message: "By the way, I am a very clean person. I am looking for someone who is also clean. I am looking for someone who is also a student.",
  },
  {
    name: "Freya",
    profilePic: "/assets/images/unity/profile_1.jpg",
    time: "15:34",
    message: "Awesome",
  },
  {
    name: "Freya",
    profilePic: "/assets/images/unity/profile_1.jpg",
    time: "15:35",
    message: "I am free tomorrow at 2pm. How about you?",
  },
  {
    name: "Carrie",
    profilePic: "/assets/images/unity/profile_2.jpg",
    time: "15:36",
    message: "Yes, I am free tomorrow at 2pm. Where should we meet?",
  },
  {
    name: "Freya",
    profilePic: "/assets/images/unity/profile_1.jpg",
    time: "15:37",
    message: "How about the Starbucks at the University of Toronto?",
  },
  {
    name: "Carrie",
    profilePic: "/assets/images/unity/profile_2.jpg",
    time: "15:38",
    message: "Sounds good.",
  },
  {
    name: "Carrie",
    profilePic: "/assets/images/unity/profile_2.jpg",
    time: "15:39",
    message: "See you tomorrow at 2pm.",
  },
];

export default function Component() {
  return (
    <S.Wrapper>
      <S.MobileContainer>
        {CHAT_DATA.map((chat, i) => (
          <SingleChat
            isLeft={chat.name === "Freya" ? true : false}
            chat={chat}
            key={i}
            isFirstChat={i - 1 < 0 || chat.name !== CHAT_DATA[i - 1]?.name}
            isLastChat={i + 1 > CHAT_DATA.length || chat.name !== CHAT_DATA[i + 1]?.name}
          />
        ))}
      </S.MobileContainer>
    </S.Wrapper>
  );
}

function SingleChat({ chat, isLeft, isFirstChat, isLastChat }) {
  return (
    <S.SingleChat isLeft={isLeft} isFirstChat={isFirstChat} isLastChat={isLastChat}>
      <S.ProfilePic>
        <img src={chat.profilePic} />
      </S.ProfilePic>
      <S.ChatRight isLeft={isLeft}>
        {isFirstChat && <S.ChatName>{chat.name}</S.ChatName>}
        <S.ChatMessage>{chat.message}</S.ChatMessage>
        {isLastChat && <S.ChatTime isLeft={isLeft}>{chat.time}</S.ChatTime>}
      </S.ChatRight>
    </S.SingleChat>
  );
}

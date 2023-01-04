import * as S from "./styles";
import { useEffect, useState } from "react";

import axios from "axios";

export default function MetaMask() {
  useEffect(() => {
    connectWallet();
  }, []);

  const [account, setAccount] = useState("");

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");

      const ethereum = window.ethereum;
      let accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log(accounts);
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Account:", account);
        setAccount(account);
      } else {
        console.log("No authorized account found");
      }
    }
  }

  async function makePayment(buyer, seller, amount) {
    let res = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: buyer,
          to: seller,
          value: amount,
        },
      ],
    });

    console.log(res);
  }

  return <S.Container></S.Container>;
}

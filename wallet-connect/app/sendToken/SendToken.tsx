"use client";

import { useState } from "react";
import { ethers } from "ethers";

export default function SendTOken() {
  const [reciever, setReciever] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const sendToken = async (reciever:string, amount:string) => {

    if (typeof window !== 'undefined' && (window as any).ethereum ) {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();

        const tx = await signer.sendTransaction({
          to: reciever,
          value: ethers.parseEther(amount)
        });
        alert("Transaction is successful");
        await tx.wait();
      } catch(error) {
        console.log("Error: ", error);
        alert("Transaction failed");
      }
    } else {
      alert("Install Metamask!")
    }
  };

  return (
    <form
      className="flex flex-col p-4 border border-gray-300"
      onSubmit={(e) => {
        e.preventDefault();
        sendToken(reciever, amount);
      }}
    >
      <label htmlFor="address">Place reciever address</label>
      <input
        className="border border-black w-96"
        onChange={(e) => setReciever(e.target.value)}
        type="text"
        name="address"
        id="address"
        placeholder="Reciever's Address"
      />
      <label htmlFor="amount">Place transaction amount</label>
      <input
        className="border border-black mb-4 "
        onChange={(e) => setAmount(e.target.value)}
        type="text"
        name="amount"
        id="amount"
        placeholder="Transaction amount"
      />
      <div className="flex">
        <button
          className="mx-auto max-w-48 border border-red-500 bg-red-500 text-white"
          type="submit">
          Send tokens
        </button>
      </div>
    </form>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Web3 from 'web3';
import SendTOken from '../sendToken/SendToken';
import SendToken from '../sendToken/SendToken';

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      setWeb3(new Web3((window as any).ethereum));
      console.log(web3);
    }
  }, []);

  const connectWallet = async () => {
    if (web3) {
      try {
        const accounts: string[] = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          console.log(account);
          await getBalance(accounts[0]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Install metamask!');
    }
  };

  const getBalance = async (accountAddress: string) => {
    if (web3) {
      const accountBalanceWei = await web3.eth.getBalance(accountAddress);
      const accountBalanceEth = web3.utils.fromWei(accountBalanceWei, 'ether');
      setBalance(accountBalanceEth);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {account ? (
        <>
          <p className="text-2xl font-bold">Your account: {account}</p>
          <p className="text-2xl font-bold">Your balance: {balance} ETH</p>
          <SendToken/>
        </>
      ) : (
        <>
          <h1>Try to connect your wallet!</h1>
          <button
            className="mx-auto max-w-48 border border-blue-500 bg-blue-500 text-white"
            onClick={connectWallet}
          >
            Connect wallet
          </button>
        </>
      )}
    </div>
  );
}

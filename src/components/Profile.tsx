"use client";
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';

interface ProfileProps {
  isVisible: boolean;
}

export default function Profile({ isVisible }: ProfileProps) {
  const { publicKey, disconnect } = useWallet();
  const [showSettings, setShowSettings] = useState(false);

  if (!isVisible) return null;

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('複製失敗:', err);
    }
  };

  return (
    <div className="px-4 py-6 pb-24">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl text-white">👤</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">我的錢包</h2>
        {publicKey && (
          <div className="flex items-center justify-center space-x-2">
            <p className="text-gray-600 font-mono">
              {shortenAddress(publicKey.toBase58())}
            </p>
            <button
              onClick={() => copyToClipboard(publicKey.toBase58())}
              className="text-red-600 hover:text-red-700"
            >
              📋
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">錢包統計</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <div className="text-2xl mb-1">💸</div>
            <p className="text-2xl font-bold text-red-600">12</p>
            <p className="text-gray-600 text-sm">已發送</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl mb-1">🧧</div>
            <p className="text-2xl font-bold text-green-600">8</p>
            <p className="text-gray-600 text-sm">已領取</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">總收益</span>
            <span className="text-2xl font-bold text-green-600">+0.85 SOL</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">⚙️</span>
            <span className="font-medium text-gray-800">設定</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="text-xl">📋</span>
            <span className="font-medium text-gray-800">交易記錄</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="text-xl">❓</span>
            <span className="font-medium text-gray-800">幫助中心</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="text-xl">📞</span>
            <span className="font-medium text-gray-800">聯絡我們</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button
          onClick={disconnect}
          className="w-full flex items-center justify-center p-4 bg-red-100 text-red-600 rounded-xl font-medium mt-6"
        >
          <span className="text-xl mr-2">🚪</span>
          斷開錢包連接
        </button>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">設定</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">通知</p>
                  <p className="text-gray-500 text-sm">接收紅包提醒</p>
                </div>
                <div className="w-12 h-6 bg-red-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">音效</p>
                  <p className="text-gray-500 text-sm">紅包音效提示</p>
                </div>
                <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">自動領取</p>
                  <p className="text-gray-500 text-sm">自動領取紅包</p>
                </div>
                <div className="w-12 h-6 bg-red-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="font-medium text-gray-800 mb-2">網絡設定</p>
                <select className="w-full p-3 border border-gray-200 rounded-lg">
                  <option>Mainnet</option>
                  <option>Devnet</option>
                  <option>Testnet</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl mt-6"
            >
              儲存設定
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
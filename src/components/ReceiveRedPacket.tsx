"use client";
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface ReceiveRedPacketProps {
  onClose: () => void;
}

export default function ReceiveRedPacket({ onClose }: ReceiveRedPacketProps) {
  const { publicKey } = useWallet();
  const [redPacketCode, setRedPacketCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleReceive = async () => {
    if (!publicKey || !redPacketCode) return;

    setIsLoading(true);
    try {
      setTimeout(() => {
        setIsLoading(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('領取失敗:', error);
      setIsLoading(false);
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setRedPacketCode('RPK123456789');
      setIsScanning(false);
    }, 3000);
  };

  if (isScanning) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md mx-4 rounded-3xl p-6 text-center">
          <div className="mb-6">
            <div className="w-64 h-64 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <div className="w-48 h-48 border-4 border-red-500 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 border-2 border-red-500 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-scan"></div>
                <div className="absolute inset-4 flex items-center justify-center">
                  <span className="text-4xl">📱</span>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">掃描 QR Code</h3>
            <p className="text-gray-600">請將紅包 QR Code 對準掃描框</p>
          </div>
          
          <button
            onClick={() => setIsScanning(false)}
            className="w-full bg-gray-500 text-white font-semibold py-3 rounded-xl"
          >
            取消掃描
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">領紅包</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <span className="text-2xl">×</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🧧</div>
            <p className="text-gray-600">掃描或輸入紅包代碼</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={startScan}
              className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl"
            >
              <div className="text-3xl mb-2">📷</div>
              <div className="font-semibold">掃描</div>
              <div className="text-red-100 text-sm">QR Code</div>
            </button>
            
            <button
              onClick={() => document.getElementById('redPacketInput')?.focus()}
              className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl"
            >
              <div className="text-3xl mb-2">⌨️</div>
              <div className="font-semibold">輸入</div>
              <div className="text-orange-100 text-sm">代碼</div>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              紅包代碼
            </label>
            <input
              id="redPacketInput"
              type="text"
              value={redPacketCode}
              onChange={(e) => setRedPacketCode(e.target.value.toUpperCase())}
              placeholder="輸入紅包代碼"
              className="w-full p-4 text-center text-lg font-mono border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
              maxLength={20}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600">ℹ️</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">如何領取紅包？</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>掃描朋友分享的 QR Code</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>或者輸入紅包代碼</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>確認領取即可獲得 SOL</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleReceive}
            disabled={!redPacketCode || isLoading}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>領取中...</span>
              </div>
            ) : (
              '開啟紅包 🎉'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
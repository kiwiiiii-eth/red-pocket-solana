"use client";
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from "react";
import SendRedPacket from '@/components/SendRedPacket';
import ReceiveRedPacket from '@/components/ReceiveRedPacket';
import RedPacketHistory from '@/components/RedPacketHistory';
import Profile from '@/components/Profile';

const WalletMultiButton = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState('home');
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-orange-500 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🧧</div>
          <h1 className="text-3xl font-bold text-white mb-2">紅包 DApp</h1>
          <p className="text-red-100 text-lg">在 Solana 區塊鏈上發送和接收紅包</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 w-full max-w-sm">
          <WalletMultiButton className="w-full bg-white text-red-600 hover:bg-red-50 font-semibold py-4 px-6 rounded-2xl transition-all duration-200" />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-red-100 text-sm mb-4">支援的錢包</p>
          <div className="flex space-x-4 justify-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white text-xs">👻</span>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white text-xs">🔥</span>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white text-xs">🎒</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-500 px-4 py-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🧧</div>
            <div>
              <h1 className="text-xl font-bold">紅包錢包</h1>
              <p className="text-red-100 text-sm">餘額: 0.00 SOL</p>
            </div>
          </div>
          <WalletMultiButton className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-xl" />
        </div>
      </div>

      {activeTab === 'home' && (
        <div className="px-4 py-6 pb-24">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => setShowSendModal(true)}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg active:scale-95 transition-transform"
            >
              <div className="text-3xl mb-2">💸</div>
              <div className="font-semibold">發紅包</div>
              <div className="text-red-100 text-sm">發送給朋友</div>
            </button>
            
            <button 
              onClick={() => setShowReceiveModal(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg active:scale-95 transition-transform"
            >
              <div className="text-3xl mb-2">🧧</div>
              <div className="font-semibold">領紅包</div>
              <div className="text-orange-100 text-sm">領取紅包</div>
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">最近的紅包</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600">🧧</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">新年紅包</p>
                    <p className="text-gray-500 text-sm">2 小時前</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">+0.1 SOL</p>
                  <p className="text-gray-500 text-sm">已領取</p>
                </div>
              </div>
              
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📝</div>
                <p>暫無更多紅包記錄</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <RedPacketHistory isVisible={activeTab === 'history'} />
      <Profile isVisible={activeTab === 'profile'} />

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex-1 py-4 flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-red-600' : 'text-gray-400'}`}
          >
            <span className="text-xl">🏠</span>
            <span className="text-xs">首頁</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-4 flex flex-col items-center space-y-1 ${activeTab === 'history' ? 'text-red-600' : 'text-gray-400'}`}
          >
            <span className="text-xl">📋</span>
            <span className="text-xs">記錄</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-4 flex flex-col items-center space-y-1 ${activeTab === 'profile' ? 'text-red-600' : 'text-gray-400'}`}
          >
            <span className="text-xl">👤</span>
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>

      {showSendModal && (
        <SendRedPacket onClose={() => setShowSendModal(false)} />
      )}
      
      {showReceiveModal && (
        <ReceiveRedPacket onClose={() => setShowReceiveModal(false)} />
      )}
    </div>
  );
}
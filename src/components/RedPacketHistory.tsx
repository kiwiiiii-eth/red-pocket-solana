"use client";
import { useState } from 'react';

interface RedPacket {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  message: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'expired';
  recipients?: number;
  claimed?: number;
}

interface RedPacketHistoryProps {
  isVisible: boolean;
}

export default function RedPacketHistory({ isVisible }: RedPacketHistoryProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'sent' | 'received'>('all');

  const mockData: RedPacket[] = [
    {
      id: 'rp001',
      type: 'sent',
      amount: 0.5,
      message: '新年快樂！',
      timestamp: '2024-01-15 14:30',
      status: 'completed',
      recipients: 5,
      claimed: 3
    },
    {
      id: 'rp002',
      type: 'received',
      amount: 0.1,
      message: '恭喜發財',
      timestamp: '2024-01-14 16:45',
      status: 'completed'
    },
    {
      id: 'rp003',
      type: 'sent',
      amount: 1.0,
      message: '生日快樂！',
      timestamp: '2024-01-13 12:20',
      status: 'pending',
      recipients: 10,
      claimed: 7
    },
    {
      id: 'rp004',
      type: 'received',
      amount: 0.05,
      message: '謝謝幫忙',
      timestamp: '2024-01-12 18:15',
      status: 'completed'
    }
  ];

  const filteredData = mockData.filter(item => 
    activeFilter === 'all' || item.type === activeFilter
  );

  if (!isVisible) return null;

  return (
    <div className="px-4 py-6 pb-24">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">紅包記錄</h2>
        
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setActiveFilter('sent')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'sent'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            已發送
          </button>
          <button
            onClick={() => setActiveFilter('received')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'received'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            已領取
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredData.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  item.type === 'sent' 
                    ? 'bg-red-100' 
                    : 'bg-green-100'
                }`}>
                  <span className="text-xl">
                    {item.type === 'sent' ? '💸' : '🧧'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {item.type === 'sent' ? '發送紅包' : '領取紅包'}
                  </p>
                  <p className="text-gray-500 text-sm">{item.timestamp}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-bold text-lg ${
                  item.type === 'sent' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {item.type === 'sent' ? '-' : '+'}{item.amount} SOL
                </p>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-xs text-gray-500">
                    {item.status === 'completed' ? '已完成' :
                     item.status === 'pending' ? '進行中' : '已過期'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-gray-700 text-sm mb-2">&ldquo;{item.message}&rdquo;</p>
              
              {item.type === 'sent' && (
                <div className="flex justify-between text-xs text-gray-500">
                  <span>總共 {item.recipients} 個紅包</span>
                  <span>已領取 {item.claimed}/{item.recipients}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2 mt-3">
              <button className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                查看詳情
              </button>
              {item.type === 'sent' && item.status === 'pending' && (
                <button className="flex-1 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium">
                  分享紅包
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">暫無記錄</h3>
          <p className="text-gray-500">
            {activeFilter === 'sent' ? '還沒有發送過紅包' :
             activeFilter === 'received' ? '還沒有領取過紅包' :
             '開始使用紅包功能吧！'}
          </p>
        </div>
      )}
    </div>
  );
}
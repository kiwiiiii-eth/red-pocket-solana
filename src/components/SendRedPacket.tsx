"use client";
import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface SendRedPacketProps {
  onClose: () => void;
}

export default function SendRedPacket({ onClose }: SendRedPacketProps) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [redPacketType, setRedPacketType] = useState<'single' | 'multiple'>('single');
  const [recipientCount, setRecipientCount] = useState('1');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!publicKey || !amount) return;

    setIsLoading(true);
    try {
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      
      console.log('紅包發送成功:', signature);
      onClose();
    } catch (error) {
      console.error('發送失敗:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">發紅包</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <span className="text-2xl">×</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🧧</div>
            <p className="text-gray-600">恭喜發財，大吉大利</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              紅包類型
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRedPacketType('single')}
                className={`p-4 rounded-xl border-2 ${
                  redPacketType === 'single'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">🎯</div>
                <div className="font-medium">普通紅包</div>
                <div className="text-xs">指定金額</div>
              </button>
              <button
                onClick={() => setRedPacketType('multiple')}
                className={`p-4 rounded-xl border-2 ${
                  redPacketType === 'multiple'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">🎲</div>
                <div className="font-medium">拼手氣</div>
                <div className="text-xs">隨機金額</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              金額 (SOL)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full p-4 text-2xl font-bold text-center border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                step="0.001"
                min="0"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                SOL
              </div>
            </div>
          </div>

          {redPacketType === 'multiple' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                紅包個數
              </label>
              <input
                type="number"
                value={recipientCount}
                onChange={(e) => setRecipientCount(e.target.value)}
                placeholder="1"
                className="w-full p-4 text-center border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                min="1"
                max="100"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              祝福語
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="恭喜發財，新年快樂！"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none resize-none"
              rows={3}
              maxLength={100}
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {message.length}/100
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">總金額</span>
              <span className="font-bold text-red-600">{amount || '0.00'} SOL</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">手續費</span>
              <span className="text-gray-600">~0.00001 SOL</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center">
              <span className="font-medium">需要支付</span>
              <span className="font-bold text-lg text-red-600">
                {amount ? (parseFloat(amount) + 0.00001).toFixed(5) : '0.00001'} SOL
              </span>
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={!amount || isLoading}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>發送中...</span>
              </div>
            ) : (
              '塞錢進紅包 💰'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
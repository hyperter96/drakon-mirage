"use client";

import { useState } from 'react';

interface CookieSettingsProps {
  accepted: boolean | null;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}

export default function CookieSettings({ accepted, onAccept, onDecline, onClose }: CookieSettingsProps) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(accepted === true);
  const [preferenceEnabled, setPreferenceEnabled] = useState(accepted === true);
  
  const handleSaveSettings = () => {
    if (analyticsEnabled || preferenceEnabled) {
      onAccept();
    } else {
      onDecline();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Cookie 设置</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="关闭"
            >
              ✕
            </button>
          </div>
          
          <p className="text-gray-600 mb-6 text-sm">
            您可以选择启用或禁用不同类型的cookies。必要的cookies用于网站基本功能，无法禁用。
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium">必要</h4>
                  <p className="text-xs text-gray-500">这些cookie对网站功能至关重要，无法禁用</p>
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded">
                  必须
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium">分析</h4>
                  <p className="text-xs text-gray-500">帮助我们了解用户如何使用网站，改进用户体验</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium">偏好设置</h4>
                  <p className="text-xs text-gray-500">允许网站记住您的偏好和设置</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={preferenceEnabled}
                    onChange={(e) => setPreferenceEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onDecline}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              拒绝全部
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              接受全部
            </button>
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
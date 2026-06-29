import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", isDangerous = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#1e1f26] border border-[#464554] rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative">
        <button onClick={onCancel} className="absolute top-4 right-4 text-[#908fa0] hover:text-white">
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDangerous ? 'bg-red-500/20 text-red-400' : 'bg-[#6366f1]/20 text-[#6366f1]'}`}>
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-heading font-bold text-white">{title}</h3>
        </div>

        <p className="text-xs text-[#908fa0] leading-relaxed">{message}</p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#908fa0] hover:text-white hover:bg-[#282a31] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-glow transition-all ${
              isDangerous ? 'bg-red-600 hover:bg-red-500' : 'bg-[#6366f1] hover:bg-[#8083ff]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

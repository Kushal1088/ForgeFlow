import React from 'react';
import { LogOut, LogIn, AlertCircle, ShieldCheck } from 'lucide-react';

export const AuthConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Session Action", 
  message = "Are you sure you want to proceed?",
  actionType = "logout" // "logout" | "login"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn select-none">
      <div className="bg-[#1e1f26] border border-[#6366f1]/60 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-glow relative text-center">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-glow ${
          actionType === 'logout' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-gradient-to-br from-[#6366f1] to-[#8083ff] text-white'
        }`}>
          {actionType === 'logout' ? <LogOut className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-heading font-bold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-[#908fa0] leading-relaxed">{message}</p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 bg-[#12131a] hover:bg-[#282a31] text-[#e2e1eb] border border-[#464554]/60 py-2.5 rounded-xl text-xs font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold text-white shadow-glow transition-all ${
              actionType === 'logout' ? 'bg-red-600 hover:bg-red-500' : 'bg-[#6366f1] hover:bg-[#8083ff]'
            }`}
          >
            {actionType === 'logout' ? 'Confirm Logout' : 'Confirm Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

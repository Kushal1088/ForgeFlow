import React from 'react';
import { Command, X } from 'lucide-react';

export const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + K / ⌘K', desc: 'Open Command Palette' },
    { key: 'Ctrl + S / ⌘S', desc: 'Save Active Workflow Canvas' },
    { key: 'Ctrl + C / ⌘C', desc: 'Copy Selected Node in Builder' },
    { key: 'Ctrl + V / ⌘V', desc: 'Paste Node in Canvas' },
    { key: 'Delete / Backspace', desc: 'Delete Selected Graph Node' },
    { key: 'Escape', desc: 'Close Overlay Modals / Deselect' },
  ];

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#1e1f26] border border-[#464554] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#908fa0] hover:text-white">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#6366f1]/20 text-[#6366f1] flex items-center justify-center">
            <Command className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-heading font-bold text-white">Platform Keyboard Shortcuts</h3>
            <p className="text-xs text-[#908fa0]">Boost productivity across ForgeFlow workflows.</p>
          </div>
        </div>

        <div className="space-y-2 pt-2 divide-y divide-[#464554]/30">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[#e2e1eb] font-medium">{s.desc}</span>
              <kbd className="bg-[#12131a] text-[#c0c1ff] border border-[#464554]/60 px-2 py-1 rounded font-mono text-[10px] shadow-inner">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

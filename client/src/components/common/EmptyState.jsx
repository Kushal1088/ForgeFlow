import React from 'react';
import { Layers } from 'lucide-react';

export const EmptyState = ({ title = "No data found", description = "No items match your query.", icon: Icon = Layers, action }) => {
  return (
    <div className="p-12 text-center bg-[#1e1f26]/40 border border-dashed border-[#464554]/50 rounded-2xl space-y-3 max-w-lg mx-auto my-6">
      <div className="w-10 h-10 rounded-xl bg-[#12131a] border border-[#464554]/40 text-[#908fa0] flex items-center justify-center mx-auto">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-bold text-white">{title}</h3>
      <p className="text-xs text-[#908fa0] leading-relaxed">{description}</p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};

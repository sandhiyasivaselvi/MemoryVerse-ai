import React from 'react';

const DashboardCard = ({ title, count, icon: Icon, colorClass = 'bg-primary-500', iconColor = 'text-white' }) => {
  return (
    <div className="glass-card glass-card-hover p-6 rounded-2xl flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-display font-bold text-slate-800">{count}</h3>
      </div>

      <div className={`p-3.5 rounded-xl ${colorClass} ${iconColor} shadow-md`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default DashboardCard;

import React, { useState } from 'react';
import { Lock, Shield, KeyRound, CheckCircle, ChefHat, UserCheck } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const { loginWithPin, setIsAdminOpen } = useRestaurant();
  const [pin, setPin] = useState('');
  const [selectedRole, setSelectedRole] = useState<'General Manager' | 'Kitchen Lead' | 'Floor Manager'>('General Manager');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const staffNames: Record<string, string> = {
      'General Manager': 'David Mwangi (Manager)',
      'Kitchen Lead': 'Chef Peter Njoroge (Head Cook)',
      'Floor Manager': 'Faith Wambui (Hostess)'
    };

    const success = loginWithPin(pin, selectedRole, staffNames[selectedRole]);
    if (success) {
      setErrorMsg('');
      setPin('');
      setIsAdminOpen(true);
      onClose();
    } else {
      setErrorMsg('Invalid PIN. Use default Murang\'a staff PIN: 1732');
    }
  };

  const handleQuickDemoLogin = (role: 'General Manager' | 'Kitchen Lead') => {
    setSelectedRole(role);
    const staffNames: Record<string, string> = {
      'General Manager': 'David Mwangi (Manager)',
      'Kitchen Lead': 'Chef Peter Njoroge (Head Cook)',
      'Floor Manager': 'Faith Wambui (Hostess)'
    };
    loginWithPin('1732', role, staffNames[role]);
    setIsAdminOpen(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-200 text-xl font-bold p-1 transition-colors cursor-pointer"
          aria-label="Close admin login"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
            Deekei Staff Portal
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Back-of-house Kitchen Display, Table Bookings & Menu Management
          </p>
          <div className="mt-2 text-xs text-stone-500 font-mono">
            Murang'a Town Branch · 75H5+9W
          </div>
        </div>

        {/* Role Selector */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
            Select Staff Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { role: 'General Manager' as const, label: 'Manager', icon: Shield },
              { role: 'Kitchen Lead' as const, label: 'Head Chef', icon: ChefHat },
              { role: 'Floor Manager' as const, label: 'Floor Host', icon: UserCheck }
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = selectedRole === item.role;
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => setSelectedRole(item.role)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col items-center text-center ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                      : 'bg-stone-800/50 border-stone-700/60 text-stone-400 hover:border-stone-600 hover:text-stone-200'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1.5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PIN Input Form */}
        <form onSubmit={handlePinSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
              Enter 4-Digit Security PIN
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="• • • •"
                className="w-full text-center text-2xl tracking-[0.5em] font-mono py-3 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                autoFocus
              />
              <KeyRound className="w-5 h-5 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errorMsg && (
              <p className="text-xs text-rose-400 mt-2 font-medium">{errorMsg}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 text-sm"
          >
            <Lock className="w-4 h-4" />
            <span>Unlock Admin Dashboard</span>
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="mt-6 pt-5 border-t border-stone-800 text-center">
          <p className="text-xs text-stone-400 mb-2.5">
            Testing / Demo Evaluation Access:
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('General Manager')}
              className="flex-1 py-2 px-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Manager Access (PIN: 1732)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('Kitchen Lead')}
              className="flex-1 py-2 px-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ChefHat className="w-3.5 h-3.5 text-amber-400" />
              <span>Kitchen Display Only</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

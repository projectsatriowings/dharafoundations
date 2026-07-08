"use client";

import React, { useActionState } from "react";
import { login, type LoginState } from "@/lib/auth-actions";
import { LogIn, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState | undefined, FormData>(login, undefined);
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#00322B] p-2 flex items-center justify-center mx-auto mb-4 shadow-lg border border-[#FFD27F]/20">
            <img src="/logo-icon-only.png?v=4" alt="Dhara Foundations" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Dhara Foundations</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Portal Login</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6">
          <form action={formAction} className="space-y-4">
            {/* Error Message */}
            {state?.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {state.error}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Email / Username
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                autoComplete="username"
                autoFocus
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 bg-[#fbf9f4]/50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8a5000]/30 focus:border-[#8a5000] transition-all"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-gray-900 bg-[#fbf9f4]/50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8a5000]/30 focus:border-[#8a5000] transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="w-full py-2.5 rounded-lg bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#8a5000]/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {pending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-gray-400 mt-6">
          Protected admin area. Unauthorized access prohibited.
        </p>
      </div>
    </div>
  );
}

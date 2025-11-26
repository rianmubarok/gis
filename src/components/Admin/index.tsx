"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

// Page Header
interface PageHeaderProps {
  title: string;
  description: string;
  backHref?: string;
  action?: ReactNode;
}

export const PageHeader = ({
  title,
  description,
  backHref,
  action,
}: PageHeaderProps) => (
  <div className="flex items-center gap-4 mb-8">
    {backHref && (
      <Link
        href={backHref}
        className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </Link>
    )}
    <div className="flex-1 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
      {action}
    </div>
  </div>
);

// Card Container
interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

// Card Header
interface CardHeaderProps {
  title: string;
  action?: ReactNode;
}

export const CardHeader = ({ title, action }: CardHeaderProps) => (
  <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    {action}
  </div>
);

// Empty State
interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const EmptyState = ({ icon, title, description }: EmptyStateProps) => (
  <div className="p-12 text-center">
    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
      {icon}
    </div>
    <h3 className="text-gray-900 font-semibold mb-1">{title}</h3>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

// Loading State
export const LoadingState = () => (
  <div className="p-12 text-center">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
    <p className="text-gray-500 text-sm">Memuat data...</p>
  </div>
);

// Primary Button
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

export const Button = ({
  children,
  onClick,
  disabled,
  type = "button",
  variant = "primary",
  className = "",
}: ButtonProps) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md shadow-blue-500/20",
    secondary:
      "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md shadow-red-500/20",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Link Button
interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export const LinkButton = ({
  href,
  children,
  variant = "primary",
}: LinkButtonProps) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md shadow-blue-500/20",
    secondary:
      "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300",
  };

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${variants[variant]}`}
    >
      {children}
    </Link>
  );
};

// Form Field
interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}

export const FormField = ({
  label,
  required,
  children,
  hint,
}: FormFieldProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-gray-500">{hint}</p>}
  </div>
);

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className = "", ...props }: InputProps) => (
  <input
    {...props}
    className={`w-full px-4 py-2.5 text-gray-900 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 ${className}`}
  />
);

// Select
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  className?: string;
}

export const Select = ({ children, className = "", ...props }: SelectProps) => (
  <select
    {...props}
    className={`w-full px-4 py-2.5 text-gray-900 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-gray-100 disabled:text-gray-400 ${className}`}
  >
    {children}
  </select>
);

// Textarea
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = ({ className = "", ...props }: TextareaProps) => (
  <textarea
    {...props}
    className={`w-full px-4 py-2.5 text-gray-900 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none placeholder:text-gray-400 ${className}`}
  />
);

// Badge
interface BadgeProps {
  children: ReactNode;
  variant?: "blue" | "green" | "yellow" | "red" | "gray";
}

export const Badge = ({ children, variant = "blue" }: BadgeProps) => {
  const variants = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    yellow: "bg-amber-50 text-amber-700 border-amber-100",
    red: "bg-red-50 text-red-700 border-red-100",
    gray: "bg-gray-50 text-gray-600 border-gray-100",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

// Icon Button
interface IconButtonProps {
  onClick?: () => void;
  variant?: "default" | "danger";
  children: ReactNode;
  className?: string;
}

export const IconButton = ({
  onClick,
  variant = "default",
  children,
  className = "",
}: IconButtonProps) => {
  const variants = {
    default: "text-gray-400 hover:text-blue-600 hover:bg-blue-50",
    danger: "text-gray-400 hover:text-red-600 hover:bg-red-50",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Table
interface TableProps {
  children: ReactNode;
}

export const Table = ({ children }: TableProps) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">{children}</table>
  </div>
);

export const TableHead = ({ children }: { children: ReactNode }) => (
  <thead className="bg-gray-50/80 text-gray-600 font-medium border-b border-gray-100">
    {children}
  </thead>
);

export const TableBody = ({ children }: { children: ReactNode }) => (
  <tbody className="divide-y divide-gray-50">{children}</tbody>
);

export const TableRow = ({ children }: { children: ReactNode }) => (
  <tr className="hover:bg-gray-50/50 transition-colors">{children}</tr>
);

export const TableCell = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <td className={`px-6 py-4 ${className}`}>{children}</td>;

export const TableHeader = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <th className={`px-6 py-4 ${className}`}>{children}</th>;

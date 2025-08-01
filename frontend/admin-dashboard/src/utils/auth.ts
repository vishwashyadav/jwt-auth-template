import { UserRole } from '../types';

export const getCurrentUserRole = (): "admin" | "user" | null => {
  const role = localStorage.getItem("role");
  if (!role) return null;
  const normalized = role.toLowerCase();
  if (normalized === "admin" || normalized === "user") return normalized as "admin" | "user";
  return null;
};

export const loginAsRole = (role: UserRole) => {
  localStorage.setItem('role', role);
};

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saveToStorage(key: string, data: unknown) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export function loadFromStorage(key: string) {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }
  return null
}
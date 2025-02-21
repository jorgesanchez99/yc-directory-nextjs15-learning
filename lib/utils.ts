import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatView(views: number) {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}k views`
  } else if (views === 1) {
    return '1 view'
  } else {
    return `${views} views`
  }
}

export function parseServerActionResponse <T> (response: T) {
   return JSON.parse(JSON.stringify(response))
}
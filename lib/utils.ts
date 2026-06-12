import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (num: number) =>
  Intl.NumberFormat('en-US', { notation: 'compact' }).format(num)

export const getDateSuffix = (date: number) => {
  if (date > 3 && date < 21) return 'th'
  switch (date % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

export const formatDateByTimeZone = (
  date: Date,
  timeZone = 'Asia/Kolkata'
) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone
  }).format(date)

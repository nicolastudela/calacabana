import { addDays, format } from "date-fns"

const FIRST_BOOKING_DAY = addDays(new Date(), 2)

const toYYYYMMDD = (date: Date) => {
  if (Number.isNaN(date.getFullYear())) {
    return ''
  }

  return `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
    -2
  )}-${`0${date.getDate()}`.slice(-2)}`
}

export const oneSecond = 1000

export const oneMinute = oneSecond * 60

export const oneHour = oneMinute * 60

export const oneDay = oneHour * 24

export {
  FIRST_BOOKING_DAY,
  toYYYYMMDD,
}
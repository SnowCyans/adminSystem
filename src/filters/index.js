
import dayjs from 'dayjs'

export const dateformat = function (timer) {
  return dayjs(timer).format('YYYY-MM-DD')
}

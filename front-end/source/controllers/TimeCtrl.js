const addClass = (element, clas) => {

  const classList = clas.split(" ")

  classList.forEach(item => {

    element.classList.add(item)

  })

}

export const getNoDays = (month, year) => {

  switch (month) {
    case 1:
      if (year) {

        if (year % 4 === 0) {

          return 29

        } else {

          return 28

        }

      } else {

        return 28

      }


    case 4:
    case 0:
    case 2:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31
        ;

    case 3:
    case 5:
    case 8:
    case 10:
      return 30
        ;

    default:
      ;
  }

}

export const secondstoTimeStr = (number, x) => {

  let answer = number / 3600

  const hour = Math.floor(answer)

  answer = answer - hour

  answer = answer * 60

  const minute = Math.floor(answer)

  answer = answer - minute

  answer = answer * 60

  const second = Math.floor(answer)

  let stamp = hour >= 12 ? `pm` : `am`

  const newMinute = String(minute).length === 2 ? minute : `0${minute}`

  let newHour = hour > 12 ? (hour - 12) : hour

  newHour = hour === 0 ? 12 : newHour

  stamp = hour === 24 ? `am` : stamp

  return x === undefined ?
    `${newHour}:${newMinute}${stamp}` :
    `${newHour}:${newMinute}:${second}${stamp}`
}

export const timeListToMilSeconds = (theList) => {

  theList.map((a) => {
    return isNaN(parseInt(a)) ? a : parseInt(a)
  })

  let milliSec = 0

  if (theList.length === 3) {

    milliSec += theList[0] * 60 * 60 * 1000

    milliSec += theList[1] * 60 * 1000

    milliSec += theList[2] * 1000

  } else {

    let hr

    if (theList[3] === 'am') {
      if (theList[0] === 12) {
        hr = 0
      } else {
        hr = theList[0]
      }
    } else {
      if (theList[0] === 12) {
        hr = 24
      } else {
        hr = theList[0] + 12
      }
    }

    milliSec += hr * 60 * 60 * 1000

    milliSec += theList[1] * 60 * 1000

    milliSec += theList[2] * 1000

  }

  const returnValue = milliSec

  return returnValue
}

export const secondstoTimeList = (number) => {

  let answer = number / 3600

  const hour = Math.floor(answer)

  answer = answer - hour

  answer = answer * 60

  const minute = Math.floor(answer)

  answer = answer - minute

  answer = answer * 60

  const second = Math.floor(answer)

  return [hour, minute, second]
}

export const timetoSeconds = (theDate) => {
  const dateArray = [
    theDate.getHours() * 3600,
    theDate.getMinutes() * 60,
    theDate.getSeconds()
  ]

  let answer = 0

  for (const item of dateArray) {
    answer += item
  }

  return answer
}

export const getMonth = (number) => {

  switch (number) {
    case 0:
      return 'January'
        ;

    case 1:
      return 'February'
        ;

    case 2:
      return 'March'
        ;

    case 3:
      return 'April'

    case 4:
      return 'May'

    case 5:
      return 'June'

    case 6:
      return 'July'

    case 7:
      return 'August'

    case 8:
      return 'September'

    case 9:
      return 'October'

    case 10:
      return 'November'

    case 11:
      return 'December'

    default: break;
  }

}

export const getMonthNumber = (month) => {
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december',]

  return months.indexOf(month.trim().toLocaleLowerCase())
}

export const addDateSuffix = (dateX) => {

  let date = dateX.toString()

  if (['11', '12', '13'].indexOf(date) !== -1) {
    date = date + 'th'
  } else if (date[date.length - 1] > '3') {
    date = date + 'th'
  } else if (date[date.length - 1] === '0') {
    date = date + 'th'
  } else if (date[date.length - 1] === '1') {
    date = date + 'st'
  } else if (date[date.length - 1] === '2') {
    date = date + 'nd'
  } else if (date[date.length - 1] === '3') {
    date = date + 'rd'
  }

  if (isNaN(parseInt(dateX))) { return dateX } else { return date }
}

export const getDayNumber = (day) => {

  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednessday',
    'thursday',
    'friday',
    'saturday'
  ]

  return days.indexOf(day.trim().toLocaleLowerCase())

}

export const getDay = (number) => {

  const num = parseInt(number)

  const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednessday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  return days[num]

}

export const datetoTimeStr = (theDate) => {

  const acSeconds = timetoSeconds(theDate)

  const acTime = secondstoTimeStr(acSeconds)

  return acTime

}

export const datetoFullTimeStr = (theDate) => {

  const acSeconds = timetoSeconds(theDate)

  const acTime = secondstoTimeStr(acSeconds, 3)

  return acTime

}

export const getLeisureDate = (date, theDate) => {

  let returnValue

  if (date.getTime() === theDate.getTime()) {

    returnValue = 'Now'

  } else if (theDate.getTime() > date.getTime()) {

    const beginDate = (
      new Date(date.getTime() - (timetoSeconds(date) * 1000))
    ).getTime() - 1000

    if (theDate.getTime() < (beginDate + 86400000)) {

      returnValue = 'Today'

    } else if (
      theDate.getTime() > (beginDate + 86400000) &&
      theDate.getTime() < (beginDate + (86400000 * 2))
    ) {

      returnValue = 'Tommorow'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 2)) &&
      theDate.getTime() < (beginDate + (86400000 * 3))
    ) {

      returnValue = 'Two Days'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 3)) &&
      theDate.getTime() < (beginDate + (86400000 * 4))
    ) {

      returnValue = 'Three Days'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 4)) &&
      theDate.getTime() < (beginDate + (86400000 * 5))
    ) {

      returnValue = 'Four Days'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 5)) &&
      theDate.getTime() < (beginDate + (86400000 * 6))
    ) {

      returnValue = 'Five Days'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 6)) &&
      theDate.getTime() < (beginDate + (86400000 * 7))
    ) {

      returnValue = 'Six Days'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 7)) &&
      theDate.getTime() < (beginDate + (86400000 * 14))
    ) {

      returnValue = 'Two Weeks'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 14)) &&
      theDate.getTime() < (beginDate + (86400000 * 21))
    ) {

      returnValue = 'Three Weeks'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 21)) &&
      theDate.getTime() < (beginDate + (86400000 * 28))
    ) {

      returnValue = 'Four Weeks'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 28))
    ) {

      returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`

    } else {
      returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`
    }


  } else if (theDate.getTime() < date.getTime()) {

    const beginDate = (
      new Date(date.getTime() - (timetoSeconds(date) * 1000))
    ).getTime() - 1000

    if (
      theDate.getTime() < (beginDate + 86400000) &&
      theDate.getTime() > (beginDate)
    ) {

      returnValue = 'Today'

    } else if (
      theDate.getTime() < (beginDate) &&
      theDate.getTime() > (beginDate - 86400000)
    ) {

      returnValue = 'Yesterday'

    } else if (
      theDate.getTime() < (beginDate - 86400000) &&
      theDate.getTime() > (beginDate - (86400000 * 2))
    ) {

      returnValue = 'Two Days Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 2)) &&
      theDate.getTime() > (beginDate - (86400000 * 3))
    ) {

      returnValue = 'Three Days Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 3)) &&
      theDate.getTime() > (beginDate - (86400000 * 4))
    ) {

      returnValue = 'Four Days Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 4)) &&
      theDate.getTime() > (beginDate - (86400000 * 5))
    ) {

      returnValue = 'Five Days Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 5)) &&
      theDate.getTime() > (beginDate - (86400000 * 6))
    ) {

      returnValue = 'Six Days Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 6)) &&
      theDate.getTime() > (beginDate - (86400000 * 13))
    ) {

      returnValue = 'Two Weeks Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 13)) &&
      theDate.getTime() > (beginDate - (86400000 * 20))
    ) {

      returnValue = 'Three Weeks Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 20)) &&
      theDate.getTime() > (beginDate - (86400000 * 27))
    ) {

      returnValue = 'Four Weeks Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 27))
    ) {

      returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`

    } else {
      returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`
    }


  } else {
    returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`
  }

  return returnValue

}

export const datetoDateStr = (theDate) => {

  return `${addDateSuffix(theDate.getDate())} of ${getMonth(theDate.getMonth())}, ${theDate.getFullYear()}`

}

export const datetoDateSlash = (theDate) => {

  return `${theDate.getDate()}/${theDate.getMonth() + 1}/${theDate.getFullYear().toString().substr(2)}`

}

export const timeBetweenDatesW = (date1, date2) => {

  let returnValue

  const a = date1.getTime()

  const b = date2.getTime()

  const c = Math.abs(a - b)

  if (c <= 10000) {

    returnValue = ['Now', c]

  } else if (c > 10000 && c < 50000) {

    returnValue = [Math.floor(c / 1000) + 's', c]

  } else if (c >= 50000 && c <= 3540000) {

    returnValue = [Math.ceil(c / 60000) + 'm', c]

  } else if (c > 3540000 && c <= 82800000) {

    returnValue = [Math.ceil(c / 3600000) + 'h', c]

  } else if (c > 82800000 && c <= 604800000) {

    returnValue = [Math.ceil(c / 86400000) + 'd', c]

  } else {

    returnValue = [date2.toLocaleDateString(), c]

  }

  return returnValue

}

export const waitFor = async (milliseconds) => {

  await new Promise(resolve => setTimeout(() => { resolve(milliseconds) }, milliseconds))

}

export const makeCalender = (date) => {

  const today = new Date()

  const year = date.getFullYear()

  const month = getMonth(date.getMonth())

  const noOfDays = getNoDays(date.getMonth(), date.getFullYear())

  let firstDay = new Date(year, date.getMonth(), 1)

  firstDay = firstDay.getDay()

  let prevMonth = new Date(year, date.getMonth() - 1, date.getDate())

  prevMonth = getNoDays(prevMonth.getMonth(), prevMonth.getFullYear())

  let countStarted = 0;

  let countEnded = 'No';

  let daysCount = 0; let piece

  const makeCalende = function (date, datetr) {

    const tbody = document.createElement('tbody')

    let trow = document.createElement('tr')

    const makeTH = (list) => {

      for (let i = 0; i < list.length; i++) {

        const text = list[i];

        const th = document.createElement('th')

        th.appendChild(document.createTextNode(text))

        trow.appendChild(th)

      }

    }

    const makeTD = (text, clas) => {

      const td = document.createElement('td')

      td.appendChild(document.createTextNode(text))

      if (clas != undefined) {

        addClass(td, clas)

      }

      return td

    }

    makeTH(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])

    tbody.appendChild(trow)

    let calender = ``

    const row1 = document.createElement('tr')

    for (let j = 0; j < 7; j++) {

      const startCount = j >= firstDay ? 'yes' : 'no'

      if (j === firstDay) { countStarted = j }

      if (startCount === 'yes') {

        daysCount++

        if (daysCount === date) {

          row1.appendChild(makeTD(j + 1 - countStarted, 'active'))

        } else if (daysCount === datetr) {

          row1.appendChild(makeTD(j + 1 - countStarted, 'xactive'))

        } else {

          row1.appendChild(makeTD(j + 1 - countStarted))

        }

      } else {

        row1.appendChild(makeTD(prevMonth - firstDay + 1 + j, 'clouded before'))

      }

    }

    tbody.appendChild(row1)

    const row2 = document.createElement('tr')

    for (let j = 0; j < 7; j++) {

      daysCount++

      if (daysCount === date) {

        row2.appendChild(makeTD(daysCount, 'active'))

      } else if (daysCount === datetr) {

        row2.appendChild(makeTD(daysCount, 'xactive'))

      } else {

        row2.appendChild(makeTD(daysCount))

      }

    }

    tbody.appendChild(row2)

    const row3 = document.createElement('tr')

    for (let j = 0; j < 7; j++) {

      daysCount++

      if (daysCount === date) {

        row3.appendChild(makeTD(daysCount, 'active'))

      } else if (daysCount === datetr) {

        row3.appendChild(makeTD(daysCount, 'xactive'))

      } else {

        row3.appendChild(makeTD(daysCount))

      }
    }

    tbody.appendChild(row3)

    const row4 = document.createElement('tr')

    for (let j = 0; j < 7; j++) {

      daysCount++

      if (daysCount > noOfDays) { countEnded = 'Yes' }

      if (countEnded === 'Yes') {

        row4.appendChild(makeTD(daysCount - noOfDays, 'clouded after'))

      } else {

        if (daysCount === date) {

          row4.appendChild(makeTD(daysCount, 'active'))

        } else if (daysCount === datetr) {

          row4.appendChild(makeTD(daysCount, 'xactive'))

        } else {

          row4.appendChild(makeTD(daysCount))

        }
      }
    }

    tbody.appendChild(row4)

    if (daysCount < noOfDays) {

      const row5 = document.createElement('tr')

      for (let j = 0; j < 7; j++) {

        daysCount++

        if (daysCount > noOfDays) { countEnded = 'Yes' }

        if (countEnded === 'Yes') {

          row5.appendChild(makeTD(daysCount - noOfDays, 'clouded after'))

        } else {

          if (daysCount === date) {

            row5.appendChild(makeTD(daysCount, 'active'))

          } else if (daysCount === datetr) {

            row5.appendChild(makeTD(daysCount, 'xactive'))

          } else {

            row5.appendChild(makeTD(daysCount))

          }
        }
      }

      tbody.appendChild(row5)

    }

    if (daysCount < noOfDays) {

      const row6 = document.createElement('tr')

      for (let j = 0; j < 7; j++) {

        daysCount++

        if (daysCount > noOfDays) { countEnded = 'Yes' }

        if (countEnded === 'Yes') {

          row5.appendChild(makeTD(daysCount - noOfDays, 'clouded after'))

        } else {

          if (daysCount === date) {

            row5.appendChild(makeTD(daysCount, 'active'))

          } else if (daysCount === datetr) {

            row5.appendChild(makeTD(daysCount, 'xactive'))

          } else {

            row5.appendChild(makeTD(daysCount))

          }
        }
      }

      tbody.appendChild(row6)

    }

    return tbody

  }

  if (
    `${date.getFullYear() + ' ' + date.getMonth()}`
    ===
    `${today.getFullYear() + ' ' + today.getMonth()}`
  ) {

    piece = makeCalende(today.getDate(), date.getDate())

  } else {

    piece = makeCalende(0, date.getDate())

  }

  return {
    month: month,
    year: year,
    table: piece,
    info: [
      "It makes a calender simple",
      "The td with class xactive is the requested day",
      "The td with class active is the current day",
      "the td with class clouded is not in the current month",
      "The td with class after is in the next month",
      "The td with class before is in the previous month",
      "The month gives the month and the year gives the year",
      "Enjoy!"
    ]
  }

}

export const randomAmong = (num1, num2) => {

  return (Math.floor(Math.random() * (num2 - num1 + 1))) + num1

}

export const chooseFrom = (arr) => {

  return arr[randomAmong(0, (arr.length - 1))]

}

export const shuffle = (arr) => {

  let array = arr.slice()

  for (let i = array.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];

  }

  return array

}

export const heightAspect = (element, ratio) => {

  window.addEventListener('resize', () => {

    element.style.height = (element.offsetWidth * ratio) + 'px'

  })

}

export const OHeightAspect = (element, ratio) => {

  element.style.height = (element.offsetWidth * ratio) + 'px'

}

export const getCookie = (name) => {

  let cookieValue = null;

  if (document.cookie && document.cookie !== '') {

    const cookies = document.cookie.split(';');

    for (const i = 0; i < cookies.length; i++) {

      const cookie = cookies[i].trim();

      // Does this cookie string begin with the name we want?

      if (cookie.substring(0, name.length + 1) === (name + '=')) {

        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

        break;

      }

    }

  }

  return cookieValue;

}

export const urlify = (text) => {

  var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig

  return text.replace(urlRegex, function (url) {

    return '<a target="_blank" href="' + url + '">' + url + '</a>';

  })

}

export const imageify = (text) => {

  var imageRegex = /(\(`\+img\+`\))(.*?)(\(`\-img\-`\))/ig

  return text.replace(imageRegex, function (url) {

    url = url.replaceAll(/(\(`\+img\+`\))/ig, '')
    url = url.replaceAll(/(\(`\-img\-`\))/ig, '')

    const num = url.search(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)
    const num2 = url.search(/,/)

    console.log(url.slice(num));

    return '<img style="width: ' + url.slice(0, num2) + '%" src="' + url.slice(num - 5) + '">'

  })

}

export const replaceAsync = async (str, regex, asyncFn) => {

  const promises = [];

  str.replace(regex, (match, ...args) => {

    const promise = asyncFn(match, ...args);

    promises.push(promise);

  });

  const data = await Promise.all(promises);

  return str.replace(regex, () => data.shift());

}

export const copyText = async (text) => {

  const textArea = document.createElement('textarea')

  textArea.style.position = 'fixed'

  textArea.style.top = '0'

  textArea.style.bottom = '0'

  textArea.style.width = '2rem'

  textArea.style.height = '2rem'

  textArea.style.padding = '0'

  textArea.style.border = 'none'

  textArea.style.overflow = 'hidden'

  textArea.style.opacity = '0'

  textArea.style.outline = 'none'

  textArea.style.boxShadow = 'none'

  textArea.style.background = 'transparent'

  document.body.appendChild(textArea)

  textArea.focus()

  textArea.select()

  await navigator.clipboard.writeText(text)

  document.execCommand('copy')

  textArea.remove()

}

export const insertAtCursor = (myField, myValue) => {

  //IE support

  if (document.selection) {

    myField.focus();

    sel = document.selection.createRange();

    sel.text = myValue;

  }

  //MOZILLA and others

  else if (myField.selectionStart || myField.selectionStart == '0') {

    var startPos = myField.selectionStart;

    var endPos = myField.selectionEnd;

    myField.value = myField.value.substring(0, startPos)

      + myValue

      + myField.value.substring(endPos, myField.value.length);

    myField.focus()

    myField.selectionStart = startPos + myValue.length;

    myField.selectionEnd = startPos + myValue.length;

  } else {

    myField.value += myValue;

  }

}

export const requestFullScreen = (exit) => {

  if (exit) { if (document.fullscreenElement !== null) { document.exitFullscreen() }; return false }

  const element = document.documentElement

  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

  if (requestMethod) {

    requestMethod.call(element);

  } else if (typeof window.ActiveXObject !== "undefined") { // IE work

    var wscript = new ActiveXObject("WScript.Shell");

    if (wscript !== null) {

      wscript.SendKeys("{F11}");

    }

  }

  // document.exitFullscreen()  Use this to exit
}

export const scrollThrough = (vertical, horisontal = 0) => {

  window.scrollBy({ top: vertical, left: horisontal, behavior: 'smooth' });

}

export const magnifyingGlass = (img, zoom = 2) => {

  // ! Keep in a div for relativity
  var glass, w, h, bw;

  /* Create magnifier glass: */
  glass = document.createElement("DIV");

  glass.setAttribute("class", "el-img-magnifier-glass");

  glass.style.zIndex = 1000

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */

  glass.style.backgroundImage = "url('" + img.src + "')";

  glass.style.backgroundRepeat = "no-repeat";

  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

  bw = 3;

  w = glass.offsetWidth / 2;

  h = glass.offsetHeight / 2;


  /* Execute a function when someone moves the magnifier glass over the image: */

  glass.addEventListener("mousemove", moveMagnifier);

  img.addEventListener("mousemove", moveMagnifier);


  /*and also for touch screens:*/

  glass.addEventListener("touchmove", moveMagnifier);

  img.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {

    var pos, x, y;

    /* Prevent any other actions that may occur when moving over the image */

    e.preventDefault();

    /* Get the cursor's x and y positions: */

    pos = getCursorPos(e);

    x = pos.x;

    y = pos.y;

    /* Prevent the magnifier glass from being positioned outside the image: */

    if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }

    if (x < w / zoom) { x = w / zoom; }

    if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }

    if (y < h / zoom) { y = h / zoom; }

    /* Set the position of the magnifier glass: */

    glass.style.left = (x - w) + "px";

    glass.style.top = (y - h) + "px";

    /* Display what the magnifier glass "sees": */

    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";

  }

  function getCursorPos(e) {

    var a, x = 0, y = 0;

    e = e || window.event;

    /* Get the x and y positions of the image: */

    a = img.getBoundingClientRect();

    /* Calculate the cursor's x and y coordinates, relative to the image: */

    x = e.pageX - a.left;

    y = e.pageY - a.top;

    /* Consider any page scrolling: */

    x = x - window.pageXOffset;

    y = y - window.pageYOffset;

    return { x: x, y: y };

  }


  // Info
  // The image MUST be encased in a container that contains nothing but the div

}

export const addNumbers = async (from, to, element, interval, increment = 1) => {

  // Set increment to 1 if not number
  increment = typeof increment !== 'number' ? 1 : increment

  // Set increment to 1 if zero
  increment = increment === 0 ? 1 : increment

  // Set increment to positive or negative based on {from} and {to}
  increment = to > from ? (increment > 0 ? increment : -increment) : (increment > 0 ? -increment : increment)

  const reVal = await new Promise((resolve, reject) => {

    element.innerHTML = from

    let preVal = from

    let inx = setInterval(() => {

      let newNumb

      if (parseInt(element.innerHTML) === to) { clearInterval(inx); newNumb = '`.-x-`.' }

      if (parseInt(element.innerHTML) !== preVal) { clearInterval(inx); newNumb = '`.-y-`.' }

      const terminal = increment > 0 ? (preVal + increment) >= to : (preVal - increment) <= to

      // console.log(preVal - );

      if (newNumb === '`.-x-`.') {

        resolve('finished')

      } else if (newNumb === '`.-y-`.') {

        resolve('interrupted')

      } else if (terminal === true) {

        newNumb = to

        element.innerHTML = newNumb

        preVal = newNumb

      } else if (terminal === false) {

        newNumb = parseInt(element.innerHTML) + increment

        element.innerHTML = newNumb

        preVal = newNumb

      } else {

        clearInterval(inx)

        reject('Unknown')

      }

    }, interval);

  })

  return reVal

}

export const addLetters = async (phrase, element, interval, toNfro, end) => {

  element.innerHTML = ''

  let theText = element.innerHTML

  end = end === undefined ? '' : end

  let full = false

  const nphrase = phrase

  let number = 0

  const reVal = await new Promise((resolve, reject) => {

    let inx = setInterval(() => {

      let newPhrase

      if (element.innerHTML == (phrase + end)) { newPhrase = '`.-x-`.' }


      // Checks if the phrase has once been completed
      if (full === true) {

        full = true

      } else {

        if (newPhrase === '`.-x-`.') { full = true }

      }



      // Checks if another same operation is running and terminates older one
      let otherText = element.innerHTML; let over = false;

      if (full === false) {

        if (theText !== element.innerHTML) { clearInterval(inx); over = true; resolve('interrupted') }

      }


      // Checks if dev wants it to go to and fro and if completed
      if (full === true && toNfro === 0) {

        clearInterval(inx);

        resolve('finished')

      } else {

        // Check if first stage has completed
        if (full === false) {

          element.innerHTML = nphrase.slice(0, number) + end;

          number++

        } else {

          if (number > 0) {

            // Set timeout for second stage based on toNfro
            setTimeout(() => {

              number--

              if (number >= 0) {

                if (theText !== element.innerHTML) { clearInterval(inx); over = true; resolve('finished'); }

                otherText = element.innerHTML

                element.innerHTML = nphrase.slice(0, number) + end

                if (over === true) { element.innerHTML = otherText; }

                theText = element.innerHTML;

              }


            }, toNfro);

          } else {

            clearInterval(inx)

            resolve('finished')

          }

        }

      }

      if (full === false) {

        if (over === true) { element.innerHTML = otherText; }

        theText = element.innerHTML;

      }

    }, interval);

  })

  return reVal

}

export const togglePassword = (passwordInput, toggler, state) => {

  if (passwordInput.type === "password") {

    passwordInput.parentElement.classList.remove('showing-text')

    passwordInput.parentElement.classList.add('showing-password')

  } else {

    passwordInput.parentElement.classList.remove('showing-password')

    passwordInput.parentElement.classList.add('showing-text')

  }

  if (state === "hover") {

    toggler.addEventListener('mouseover', () => {

      passwordInput.type = 'text'

      passwordInput.parentElement.classList.remove('showing-password')

      passwordInput.parentElement.classList.add('showing-text')

    })

    toggler.addEventListener('mouseout', () => {

      passwordInput.type = 'password'

      passwordInput.parentElement.classList.remove('showing-text')

      passwordInput.parentElement.classList.add('showing-password')

    })


  } else if (state === "click") {

    toggler.addEventListener("click", (e) => {

      e.preventDefault();

      if (passwordInput.type === "password") {

        passwordInput.type = 'text'

        passwordInput.parentElement.classList.remove('showing-password')

        passwordInput.parentElement.classList.add('showing-text')

      } else {

        passwordInput.type = 'password'

        passwordInput.parentElement.classList.remove('showing-text')

        passwordInput.parentElement.classList.add('showing-password')

      }

    })

  }

}

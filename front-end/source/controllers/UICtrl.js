export const findElement = (tag) => {

  return document.querySelector(tag)

}

export const findElements = (tag) => {

  return Array.from(document.querySelectorAll(tag))

}

export const findBy = (element, tag) => {

  return element.querySelector(tag)

}

export const findsBy = (element, tag) => {

  return Array.from(element.querySelectorAll(tag))

}

export const addClass = (element, clas) => {

  const classList = clas.split(" ")

  classList.forEach(item => {

    element.classList.add(item)

  })

}

export const createElement = (emmet, innerContent) => {

  let info1 = emmet.split(".")

  const returnValue = document.createElement(info1[0])

  info1.forEach((item, index) => {

    if (index > 0) {

      item.split('#').forEach((item, index) => {

        if (index == 0) {

          addClass(returnValue, item)

        } else {

          returnValue.id = item

        }

      })

    }

  })

  innerContent = innerContent == undefined ? '' : innerContent

  returnValue.innerHTML = innerContent

  return returnValue

}

export const toggleClass = (element, clas) => {

  if (element.classList.contains(clas)) {
    removeClass(element, clas)
  } else {
    addClass(element, clas)
  }

}

export const toggleWithDocument = (clicker, element, clas) => {

  clicker.addEventListener('click', (e) => {

    const theFunc = function () {

      removeClass(element, clas)

      document.removeEventListener('click', theFunc)

    }

    if (element.classList.contains(clas)) {

      theFunc()

    } else {

      addClass(element, clas)

      setTimeout(() => {

        document.addEventListener('click', theFunc)

      }, 10);

    }

  })

}

export const removeClass = (element, clas) => {
  element.classList.remove(clas)
}

export const dragElement = (elmnt) => {

  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (findElement(elmnt.id + "-dragger")) {

    // if present, the header is where you move the DIV from:

    findElement(elmnt.id + "-dragger").style.cursor = 'move'

    findElement(elmnt.id + "-dragger").onmousedown = dragMouseDown;

  } else {

    // otherwise, move the DIV from anywhere inside the DIV:

    elmnt.style.cursor = 'move'

    elmnt.onmousedown = dragMouseDown;

  }

  function dragMouseDown(e) {

    e = e || window.event;

    e.preventDefault();

    // get the mouse cursor position at startup:

    pos3 = e.clientX;

    pos4 = e.clientY;

    document.onmouseup = closeDragElement;

    // call a function whenever the cursor moves:

    document.onmousemove = elementDrag;

  }

  function elementDrag(e) {

    e = e || window.event;

    e.preventDefault();

    // calculate the new cursor position:

    pos1 = pos3 - e.clientX;

    pos2 = pos4 - e.clientY;

    pos3 = e.clientX;

    pos4 = e.clientY;

    // set the element's new position:

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

  }

  function closeDragElement() {

    // stop moving when mouse button is released:

    document.onmouseup = null;

    document.onmousemove = null;

  }

  // It modifies only top and left values

}


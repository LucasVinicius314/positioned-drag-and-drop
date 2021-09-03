/// <reference path="jquery-3.6.0.js" />

$(() => {
  $(window).on('resize', () => {
    update()
  })
})

// parent
// ondrop="drop(event, this)" ondragover="allowDrop(event)"

// child
// draggable="true" ondragstart="drag(event, this)"

/**
 * @param {DragEvent} ev
 * @param {Element} el
 */
const allowDrop = (ev, el) => {
  ev.preventDefault()
}

/**
 * @param {DragEvent} ev
 * @param {Element} el
 */
const drag = (ev, el) => {
  ev.dataTransfer.setData('id', el.id)
}

/**
 * @param {DragEvent} ev
 * @param {Element} el
 */
const drop = (ev, el) => {
  const element = $(el)
  const target = $(ev.target)

  const id = ev.dataTransfer.getData('id')
  const { offsetX, offsetY } = ev

  console.log({
    ev,
    element,
    target,
  })

  if (target.attr('id') == 'not-assigned') {
    const child = $(el.appendChild(document.getElementById(id)))
    child.removeAttr('x').removeAttr('y')
  }
  if (target.attr('id') == 'image') {
    const child = $(el.appendChild(document.getElementById(id)))

    const widthIndex = offsetX / target.width()
    const heightIndex = offsetY / target.height()

    child.attr('x', widthIndex).attr('y', heightIndex)

    console.log({
      widthIndex,
      heightIndex,
    })
  } else {
    update()

    return
  }

  ev.preventDefault()

  update()
}

const update = () => {
  const map = $('#map')

  $('#map > .item').each((k, v) => {
    const element = $(v)
    const x = element.attr('x')
    const y = element.attr('y')
    element.css({
      left: parseFloat(x) * map.width() - element.width() / 2,
      top: parseFloat(y) * map.height() + element.height() / 4,
    })
  })

  $('#not-assigned > .item').each((k, v) => {
    const element = $(v)
    element.css({
      left: 0,
      top: 0,
    })
  })
}

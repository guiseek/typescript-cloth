import { Cloth } from './core/cloth'
import { config } from './core/config/constants'
import './style.css'

function update() {
  if (config.canvas && config.ctx && config.cloth) {
    const { width, height } = config.canvas
    config.ctx.clearRect(0, 0, width, height)

    config.cloth.update()
    config.cloth.draw()
  }

  requestAnimationFrame(update)
}

function start() {
  const { canvas, ctx } = config

  if (canvas && ctx) {
    const onMouseDown = (e: MouseEvent) => {
      config.mouse.button = e.which
      config.mouse.px = config.mouse.x
      config.mouse.py = config.mouse.y

      const rect = config.canvas!.getBoundingClientRect()

      config.mouse.x = e.clientX - rect.left
      config.mouse.y = e.clientY - rect.top
      config.mouse.down = true

      e.preventDefault()
    }

    const onMouseUp = (e: MouseEvent) => {
      config.mouse.down = false
      e.preventDefault()
    }

    const onMouseMove = (e: MouseEvent) => {
      config.mouse.px = config.mouse.x
      config.mouse.py = config.mouse.y

      const rect = config.canvas!.getBoundingClientRect()

      config.mouse.x = e.clientX - rect.left
      config.mouse.y = e.clientY - rect.top

      e.preventDefault()
    }

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    canvas.onmouseup = onMouseUp
    canvas.onmousemove = onMouseMove
    canvas.onmousedown = onMouseDown
    canvas.oncontextmenu = onContextMenu

    config.boundsx = canvas.width - 1
    config.boundsy = canvas.height - 1

    ctx.strokeStyle = '#666'
  }

  config.cloth = new Cloth()

  update()
}

onload = () => {
  config.canvas = document.querySelector('canvas')
  if (config.canvas) {
    config.ctx = config.canvas.getContext('2d')
    config.canvas.width = 1160
    config.canvas.height = 700
  }

  start()
}

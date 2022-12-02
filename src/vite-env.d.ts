/// <reference types="vite/client" />

interface Config {
  physicsAccuracy: number
  mouseInfluence: number
  mouseCut: number
  gravity: number
  clothHeight: number
  clothWidth: number
  startY: number
  spacing: number
  tearDistance: number
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null
  cloth: Cloth | null
  boundsx: number | null
  boundsy: number | null
  mouse: {
    down: boolean
    button: number
    x: number
    y: number
    px: number
    py: number
  }
}

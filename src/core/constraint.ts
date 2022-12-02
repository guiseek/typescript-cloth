import { config } from './config/constants'
import { Point } from './pointer'

export class Constraint {
  length

  constructor(private p1: Point, private p2: Point) {
    this.length = config.spacing
  }

  resolve() {
    const diffX = this.p1.x - this.p2.x
    const diffY = this.p1.y - this.p2.y
    const dist = Math.sqrt(diffX * diffX + diffY * diffY)
    const diff = (this.length - dist) / dist

    if (dist > config.tearDistance) {
      this.p1.removeConstraint(this)
    }

    const px = diffX * diff * 0.5
    const py = diffY * diff * 0.5

    this.p1.x += px
    this.p1.y += py
    this.p2.x -= px
    this.p2.y -= py
  }

  draw() {
    if (config.ctx) {
      config.ctx.moveTo(this.p1.x, this.p1.y)
      config.ctx.lineTo(this.p2.x, this.p2.y)
    }
  }
}

import { config } from './config/constants'
import { Constraint } from './constraint'

export class Point {
  vx = 0
  vy = 0

  px: number
  py: number

  pinX: number | null = null
  pinY: number | null = null

  constraints: Constraint[] = []

  constructor(public x: number, public y: number) {
    this.px = this.x
    this.py = this.y
  }

  update(delta: number) {
    if (config.mouse.down) {
      const diffX = this.x - config.mouse.x
      const diffY = this.y - config.mouse.y
      const dist = Math.sqrt(diffX * diffX + diffY * diffY)

      if (config.mouse.button == 1) {
        if (dist < config.mouseInfluence) {
          this.px = this.x - (config.mouse.x - config.mouse.px) * 1.8
          this.py = this.y - (config.mouse.y - config.mouse.py) * 1.8
        }
      } else if (dist < config.mouseCut) {
        this.constraints = []
      }
    }

    this.addForce(0, config.gravity)

    delta *= delta
    const nx = this.x + (this.x - this.px) * 0.99 + (this.vx / 2) * delta
    const ny = this.y + (this.y - this.py) * 0.99 + (this.vy / 2) * delta

    this.px = this.x
    this.py = this.y

    this.x = nx
    this.y = ny

    this.vy = this.vx = 0
  }

  draw() {
    if (!this.constraints.length) return

    let i = this.constraints.length
    while (i--) this.constraints[i].draw()
  }

  resolveConstraints() {
    if (this.pinX != null && this.pinY != null) {
      this.x = this.pinX
      this.y = this.pinY
      return
    }

    let i = this.constraints.length
    while (i--) this.constraints[i].resolve()

    this.x > (config.boundsx ?? 0)
      ? (this.x = 2 * (config.boundsx ?? 0) - this.x)
      : 1 > this.x && (this.x = 2) - this.x
    this.y < 1
      ? (this.y = 2 - this.y)
      : this.y > (config.boundsy ?? 0) &&
        (this.y = 2 * (config.boundsy ?? 0) - this.y)
  }

  attach(point: Point) {
    this.constraints.push(new Constraint(this, point))
  }

  removeConstraint(constraint: Constraint) {
    this.constraints.splice(this.constraints.indexOf(constraint), 1)
  }

  addForce(x: number, y: number) {
    this.vx += x
    this.vy += y

    const round = 400
    this.vx = ~~(this.vx * round) / round
    this.vy = ~~(this.vy * round) / round
  }

  pin(pinx: number, piny: number) {
    this.pinX = pinx
    this.pinY = piny
  }
}

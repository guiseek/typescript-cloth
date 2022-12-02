import { config } from './config/constants'
import { Point } from './pointer'

export class Cloth {
  points: Point[] = []

  constructor() {
    if (config.canvas) {
      const startX =
        config.canvas.width / 2 - (config.clothWidth * config.spacing) / 2

      for (let y = 0; y <= config.clothHeight; y++) {
        for (let x = 0; x <= config.clothWidth; x++) {
          const p = new Point(
            startX + x * config.spacing,
            config.startY + y * config.spacing
          )

          x != 0 && p.attach(this.points[this.points.length - 1])
          y == 0 && p.pin(p.x, p.y)
          y != 0 && p.attach(this.points[x + (y - 1) * (config.clothWidth + 1)])

          this.points.push(p)
        }
      }
    }
  }

  update() {
    let i = config.physicsAccuracy

    while (i--) {
      let p = this.points.length
      while (p--) this.points[p].resolveConstraints()
    }

    i = this.points.length
    while (i--) this.points[i].update(0.016)
  }

  draw() {
    if (config.ctx && config.cloth) {
      config.ctx.beginPath()

      let i = config.cloth.points.length
      while (i--) config.cloth.points[i].draw()

      config.ctx.stroke()
    }
  }
}

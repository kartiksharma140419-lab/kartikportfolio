import Emitter from './Emitter'
import Ticker from './Ticker'

export default class BaseSection {
  el: HTMLElement
  isPaused: boolean = true

  /**
   * Constructor
   */
  constructor(selector: string) {
    this.el = document.querySelector(selector) as HTMLElement

    if (!this.el) return

    // Init
    if (document.readyState === 'complete') {
      Ticker.nextTick(this.init, this)
    } else {
      Emitter.once('siteLoaded', this.init, this)
    }
  }

  /**
   * Base Initialization
   */
  init() {
    this.bindBaseEvents()
  }

  /**
   * Bind Base Events
   */
  bindBaseEvents() {
    this.el.addEventListener('intersect', this.onIntersect.bind(this), {
      passive: true,
    })
  }

  /**
   * Intersect handler
   */
  onIntersect(e: any) {
    this.isPaused = !e.detail.isIntersecting

    if (this.isPaused) {
      this.onPause()
    } else {
      this.onResume()
    }
  }

  /**
   * On Pause
   */
  onPause() {
    Emitter.off('tick', this.tick, this)
  }

  /**
   * On Resume
   */
  onResume() {
    Emitter.on('tick', this.tick, this)
  }

  /**
   * On Resize (intended to be overridden)
   */
  onResize(..._args: any[]) {
    // Override in subclass
  }

  /**
   * Tick (intended to be overridden)
   */
  tick(..._args: any[]) {
    // Override in subclass
  }
}

import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import Emitter from './Emitter'
import Ticker from './Ticker'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    safeWidth: number
    safeHeight: number
    maxScrollTop: number
    scrollProgress: number
    lenis: any
  }
}

export default class Site {
  timeouts: any = {
    resizeThrottle: null,
  }

  windowWidth: number
  windowHeight: number
  clientWidth: number
  clientHeight: number

  isScrolling: boolean = false
  lenis: any

  constructor() {
    // OS class
    let os = 'unknown'
    if (navigator.userAgent.indexOf('Win') !== -1) {
      os = 'windows'
    } else if (navigator.userAgent.indexOf('Android') !== -1) {
      os = 'android'
    } else if (navigator.userAgent.indexOf('Mac') !== -1) {
      os = 'mac'
    } else if (navigator.userAgent.indexOf('Linux') !== -1) {
      os = 'linux'
    }
    document.documentElement.classList.add(`is-${os}`)

    // Browser class
    let browser = 'unknown'
    if (navigator.userAgent.indexOf('Firefox') !== -1) {
      browser = 'firefox'
    } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
      browser = 'chrome'
    } else if (navigator.userAgent.indexOf('Safari') !== -1) {
      browser = 'safari'
    }
    document.documentElement.classList.add(`is-${browser}`)

    this.bindEvents()
  }

  /**
   * Initialization
   */
  init() {
    this.initLenis()
    Ticker.init()
    this.onResize()
    Ticker.nextTick(this.intro, this)
    this.initTour()
  }

  /**
   * Bind events
   */
  bindEvents() {
    window.addEventListener('resize', this.resizeThrottle.bind(this))
    window.addEventListener('scroll', this.onScroll.bind(this), {
      passive: true,
    })
    window.addEventListener('mousemove', this.onMouseMove.bind(this), {
      passive: true,
    })

    Emitter.on('updateViewport', this.onResize, this, true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.dispatchEvent(
            new CustomEvent('intersect', {
              detail: { isIntersecting: entry.isIntersecting },
            }),
          )

          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view')
            entry.target.classList.remove(
              'is-out-of-view',
              'is-out-of-view-top',
              'is-out-of-view-bottom',
            )
          } else {
            entry.target.classList.remove('is-in-view')
            entry.target.classList.add('is-out-of-view')

            entry.target.classList.toggle(
              'is-out-of-view-top',
              entry.boundingClientRect.top < 0,
            )
            entry.target.classList.toggle(
              'is-out-of-view-bottom',
              entry.boundingClientRect.top > 0,
            )
          }
        })
      },
      {
        threshold: 0,
      },
    )

    document.querySelectorAll('[data-intersect]').forEach((el) => {
      observer.observe(el)
    })

    // Site loaded event
    if (document.readyState === 'complete') {
      this.siteLoaded()
    } else {
      window.addEventListener('load', this.siteLoaded, { once: true })
    }

    this.onScroll()
  }

  /**
   * Init lenis
   */
  initLenis() {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    window.lenis = lenis
    this.lenis = lenis
  }

  /**
   * Set loaded class
   */
  siteLoaded() {
    document.documentElement.classList.add('is-loaded')
    Emitter.emit('siteLoaded')
  }

  /**
   * Resize throttle
   */
  resizeThrottle() {
    clearTimeout(this.timeouts.resizeThrottle)
    this.timeouts.resizeThrottle = setTimeout(() => {
      Ticker.nextTick(this.onResize, this)
    }, 200)
  }

  /**
   * Resize handler
   */
  onResize() {
    const newWidth = window.innerWidth
    let widthChanged = false
    if (this.windowWidth !== newWidth) {
      if (this.windowWidth !== undefined) {
        widthChanged = true
      }
      this.windowWidth = newWidth
      this.clientWidth = document.body.clientWidth
    }

    const newHeight = window.innerHeight
    let heightChanged = false
    if (this.windowHeight !== newHeight) {
      if (this.windowHeight !== undefined) {
        heightChanged = true
      }
      this.windowHeight = newHeight
      this.clientHeight = document.body.clientHeight
    }

    window.safeWidth = newWidth
    window.safeHeight = newHeight
    window.maxScrollTop = document.body.scrollHeight - window.safeHeight
    this.setScrollProgress()
    Emitter.emit('resize', widthChanged, heightChanged)
  }

  /**
   * Scroll handler
   */
  onScroll() {
    this.setScrollProgress()
    Ticker.nextTick(() => {
      Emitter.emit('scroll', window.scrollY)
    })
  }

  /**
   * Set scroll progress
   */
  setScrollProgress() {
    window.scrollProgress = window.scrollY / window.maxScrollTop
  }

  /**
   * Mouse move handler
   */
  onMouseMove(e: MouseEvent) {
    Emitter.emit('mousemove', e.clientX, e.clientY)
  }

  /**
   * Intro
   */
  intro() {
    const wrapper: HTMLElement = document.querySelector('.js-site-wrapper')
    const intro: HTMLElement = document.querySelector('.js-intro')
    const mount: HTMLElement = document.querySelector('.js-mount')
    const logoLinesV: NodeList = intro.querySelectorAll('.js-logo-line-v')
    const logoLinesH: NodeList = intro.querySelectorAll('.js-logo-line-h')
    const borderTop: HTMLElement = intro.querySelector('.js-border-top')
    const borderLeft: HTMLElement = intro.querySelector('.js-border-left')
    const borderRight: HTMLElement = intro.querySelector('.js-border-right')

    const tl = gsap.timeline()

    tl.set(wrapper, {
      opacity: '',
    })

    tl.set(intro, {
      background: 'transparent',
    })

    tl.fromTo(
      logoLinesV,
      {
        scaleY: 0,
      },
      {
        scaleY: 1,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.15,
      },
      0,
    )

    tl.fromTo(
      logoLinesH,
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: 0.5,
        ease: 'expo.out',
        stagger: 0,
      },
      1,
    )

    tl.set(logoLinesV, {
      transformOrigin: '50% 0',
    })

    tl.fromTo(
      logoLinesV,
      {
        scaleY: 1,
      },
      {
        scaleY: 0,
        duration: 1,
        ease: 'power4.in',
        immediateRender: false,
        stagger: 0.1,
      },
      2,
    )

    tl.fromTo(
      logoLinesH,
      {
        scaleY: 1,
      },
      {
        scaleY: 0,
        duration: 0.5,
        ease: 'power4.in',
        immediateRender: false,
        stagger: 0.1,
      },
      2.1,
    )

    tl.from(
      borderTop,
      {
        scaleY: 0,
        duration: 3,
        ease: 'power3.inOut',
      },
      1,
    )

    tl.from(
      [borderLeft, borderRight],
      {
        scaleX: 0,
        duration: 3,
        ease: 'power3.inOut',
      },
      1,
    )

    tl.call(
      () => {
        document.dispatchEvent(new CustomEvent('intro'))
      },
      null,
      '-=1.85',
    )

    tl.call(
      () => {
        mount.style.opacity = '1'
        intro.remove()
        document.documentElement.classList.remove('is-scroll-blocked')
        Ticker.nextTick(() => {
          Emitter.emit('updateViewport')
        })
      },
      null,
      5,
    )
  }

  /**
   * Init Tour
   */
  initTour() {
    document.addEventListener(
      'intro',
      () => {
        setTimeout(() => {
          const driverObj = driver({
            showProgress: false,
            allowClose: true,
            prevBtnText: 'Skip',
            onPrevClick: () => {
              driverObj.destroy()
            },
            onPopoverRender: (popover, { driver }) => {
              const footer = popover.footer
              if (footer && !footer.querySelector('.driver-popover-prev-btn')) {
                const skipBtn = document.createElement('button')
                skipBtn.innerText = 'Skip'
                skipBtn.classList.add('driver-popover-prev-btn')
                skipBtn.onclick = () => {
                  driver.destroy()
                }
                footer.prepend(skipBtn)
              }
            },
            steps: [
              {
                element:
                  window.innerWidth <= 768
                    ? '.sb-contact-mobile'
                    : '.sb-availability .js-hire-me',
                popover: {
                  title: 'Get Your Website',
                  description: 'This button opens the project form.',
                  side: 'bottom',
                  align: 'start',
                  nextBtnText: 'Got it',
                },
              },
              {
                element: '.js-contrast',
                popover: {
                  title: 'Color Theme',
                  description: 'This is a colour changing button, try it!',
                  side: 'bottom',
                  align: 'start',
                  nextBtnText: 'Got it',
                },
              },
            ],
          })
          driverObj.drive()
        }, 2500)
      },
      { once: true },
    )
  }
}

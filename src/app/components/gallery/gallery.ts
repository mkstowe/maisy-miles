import { Component, computed, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  public items: CarouselItem[] = [
    {
      src: '/assets/gallery/flowers.webp',
      alt: 'Flower earrings',
    },
    {
      src: '/assets/gallery/pink-earrings.webp',
      alt: 'Pink and black earrings',
    },
    {
      src: '/assets/gallery/animals.webp',
      alt: 'Animal ornaments',
    },
    {
      src: '/assets/gallery/monsters.webp',
      alt: 'Monster ornaments',
    },
    {
      src: '/assets/gallery/ginger-bread.webp',
      alt: 'Gingerbread ornaments',
    },
    {
      src: '/assets/gallery/teal-earrings.webp',
      alt: 'Teal and white earrings',
    },
    {
      src: '/assets/gallery/earrings.webp',
      alt: 'Retro earrings',
    },
    {
      src: '/assets/gallery/santa.webp',
      alt: 'Santa ornament',
    },
  ];

  public startIndex = 0;
  public loop = true;
  public autoplayMs: number | null = 5000;
  public ariaLabel = 'Product gallery';

  index = signal(0);
  private timer: any;

  current = computed(() => this.items[this.index()] ?? null);

  // Sliding state
  pos = 1; // 0..n+1, with clones at 0 and n+1
  translateX = -100; // %
  isAnimating = false;

  private touchX: number | null = null;

  ngOnInit() {
    const n = this.items.length;
    const start = Math.min(Math.max(this.startIndex, 0), n ? n - 1 : 0);
    this.index.set(start);
    this.pos = start + 1; // because of leading clone
    this.translateX = -100 * this.pos;
    this.setupAutoplay();
  }

  ngOnDestroy() {
    this.clearAutoplay();
  }

  // ---- navigation (guard rapid clicks) ----
  next() {
    if (!this.items.length || this.isAnimating) return;
    this.pause();
    this.slideTo(this.pos + 1);
  }
  prev() {
    if (!this.items.length || this.isAnimating) return;
    this.pause();
    this.slideTo(this.pos - 1);
  }
  goTo(i: number) {
    if (!this.items.length || this.isAnimating) return;
    this.pause();
    // map logical index -> visual pos (with leading clone)
    this.slideTo((i % this.items.length) + 1);
  }

  // ---- autoplay (unchanged) ----
  pause() {
    this.clearAutoplay();
  }
  resume() {
    this.setupAutoplay();
  }

  // ---- swipe (unchanged) ----
  onTouchStart(evt: TouchEvent) {
    this.touchX = evt.touches[0].clientX;
    this.pause();
  }
  onTouchEnd(evt: TouchEvent) {
    if (this.touchX == null) return;
    const dx = evt.changedTouches[0].clientX - this.touchX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? this.next() : this.prev();
    }
    this.touchX = null;
    this.resume();
  }

  // ---- keyboard (unchanged) ----
  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowRight':
        this.next();
        e.preventDefault();
        break;
      case 'ArrowLeft':
        this.prev();
        e.preventDefault();
        break;
      case 'Home':
        this.goTo(0);
        e.preventDefault();
        break;
      case 'End':
        this.goTo(this.items.length - 1);
        e.preventDefault();
        break;
    }
  }

  // ---- internals ----
  private setupAutoplay() {
    if (!this.autoplayMs) return;
    this.clearAutoplay();
    this.timer = setInterval(() => this.next(), this.autoplayMs);
  }
  private clearAutoplay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private slideTo(targetPos: number) {
    const n = this.items.length;
    if (!n) return;

    // Clamp to [0, n+1] to avoid overshooting clones
    const max = n + 1;
    const min = 0;
    if (targetPos > max) targetPos = max;
    if (targetPos < min) targetPos = min;

    this.isAnimating = true;
    this.pos = targetPos;
    this.translateX = -100 * this.pos;
  }

  onTransitionEnd() {
    const n = this.items.length;
    if (!n) return;

    if (this.pos === n + 1) {
      // on trailing clone -> snap to first
      this.isAnimating = false;
      this.pos = 1;
      this.translateX = -100 * this.pos;
      this.index.set(0);
      return;
    }
    if (this.pos === 0) {
      // on leading clone -> snap to last
      this.isAnimating = false;
      this.pos = n;
      this.translateX = -100 * this.pos;
      this.index.set(n - 1);
      return;
    }

    // normal slide; sync logical index
    this.index.set(this.pos - 1);
    this.isAnimating = false;
  }
}

export type CarouselItem = {
  src: string;
  alt: string;
  caption?: string;
};

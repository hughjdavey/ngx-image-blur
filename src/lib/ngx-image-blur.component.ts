import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-image-blur',
  template: `
    <div id="ngx-image-blur" [style.height]="height" [style.width]="width">
      <img #imageBlurLoader id="image-blur-loader" [ngStyle]="getStyles()">
    </div>
  `,
  styles: [
    '#image-blur-loader { height: 100%; width: 100%; }',
  ]
})
export class NgxImageBlurComponent implements OnInit {

  @ViewChild('imageBlurLoader') imageBlurLoader;

  @Input()
  height: string;

  @Input()
  width: string;

  @Input()
  previewSrc: string;

  @Input()
  fullSrc: string;

  @Input()
  blurPixels: number = 8;

  @Input()
  transitionDuration: number = 500;

  @Input()
  lazyMode: 'eager' | 'half-lazy' | 'lazy' = 'eager';

  @Input()
  objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' = 'cover';

  private preview: boolean = true;

  private displayedImage: HTMLImageElement;
  private loadingImage: HTMLImageElement;

  constructor() { }

  ngOnInit() {
    this.initImages();
  }

  private initImages(): void {
    this.displayedImage = this.imageBlurLoader.nativeElement as HTMLImageElement;
    this.displayedImage.src = this.previewSrc;

    this.loadingImage = new Image();
    this.loadingImage.onload = this.onLoaded.bind(this);

    // start loading image unless we are lazy
    if (this.lazyMode !== 'lazy') {
      this.startLoading();

      // if we are eager we can return without setting up the intersectionobserver
      if (this.lazyMode === 'eager') {
        return;
      }
    }

    const observer = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting === true) {
        if (this.lazyMode === 'lazy') {
          this.startLoading();
        }
        else if (this.lazyMode === 'half-lazy') {
          this.onLoaded(true);
        }
        obs.unobserve(this.displayedImage);
      }
    }, {});
    observer.observe(this.displayedImage);
  }

  private startLoading(): void {
    this.loadingImage.src = this.fullSrc;
  }

  private onLoaded(force?: boolean): void {
    if (this.lazyMode !== 'half-lazy' || force === true) {
      this.preview = false;
      this.displayedImage.src = this.fullSrc;
    }
  }

  getStyles(): { [key: string]: string } {
    const variableStyles = this.preview ? { filter: `blur(${this.blurPixels}px)` } : {
      transition: `${this.transitionDuration}ms filter linear`,
      filter: 'blur(0)'
    };
    return Object.assign(variableStyles, { 'object-fit': this.objectFit });
  }
}

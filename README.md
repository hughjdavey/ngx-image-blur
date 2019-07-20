# NgxImageBlur

Simple image blur loader component for Angular >= 2, inspired by image blur loading on Medium.

[Demo can be found here](https://hughjdavey.github.io/ngx-image-blur)

### Installation

* `npm install --save ngx-image-blur`
* Edit your app.module file:

``` typescript
...
import { NgxImageBlurModule } from 'ngx-image-blur';

@NgModule({
  ...
  imports: [
    ...
    NgxImageBlurModule
  ],
  ...
})
```

### Usage

##### Type Definitions:

* `type LazyMode = 'eager' | 'half-lazy' | 'lazy'`
  * `eager` - image starts loading as soon as the page loads and does its blur transitions as soon as it can
  * `half-lazy` - image starts loading as soon as the page loads, but delays the blur transition until it comes into view
  * `lazy` - image starts loading only once it comes into view

##### `@Input()` options:

* `height` [string] - desired height of image e.g. '50vh' (required)
* `width` [string] - desired width of image e.g. '500px' (required)
* `previewSrc` [string] - link that can go in a [url()](https://developer.mozilla.org/en-US/docs/Web/CSS/url) (e.g. web link or assets path) to smaller thumbnail version of image (required)
* `width` [string] - link that can go in a [url()](https://developer.mozilla.org/en-US/docs/Web/CSS/url) (e.g. web link or assets path) to full image (required)
* `blurPixels` [integer] - how much blur to apply to the preview image (defaults to 8)
* `transitionDuration` [integer] - time in ms to take for the transition between preview and fill images (defaults to 500, i.e. half a second)
* `objectFit` [string] - [CSS object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) for the image (defaults to 'cover')
* `lazyMode` [LazyMode] - which LazyMode to use for image loading - see above (defaults to 'eager')

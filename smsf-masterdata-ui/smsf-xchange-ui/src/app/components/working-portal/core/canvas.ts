import { CanvasImg } from './canvasImg';

export class Canvas {
  ctx: any;
  canvas: any;

  // 初始化函数（输入的是canvas）
  constructor(e) {
    // 设置canvas
    this.canvas = e;
    // this.ctx = this.canvas.getContext('2d');
  }

  draw(opts: CanvasImg) {
    // 获取图片的高宽
    const w = opts.imgWidth * opts.scale;
    const h = opts.imgHeight * opts.scale;
    // 获取画布对象
    this.canvas = opts.canvas;
    // 角度转为弧度
    if (!opts.rotate) {
      opts.rotate = 0;
    }
    let rotation = Math.PI * opts.rotate / 180;
    let c = Math.round(Math.cos(rotation) * 1000) / 1000;
    let s = Math.round(Math.sin(rotation) * 1000) / 1000;
    // 旋转后canvas标签的大小
    this.canvas.height = Math.abs(c * h) + Math.abs(s * w);
    this.canvas.width = Math.abs(c * w) + Math.abs(s * h);

    this.ctx = this.canvas.getContext('2d');
    this.ctx.save();
    // 改变中心点
    if (rotation <= Math.PI / 2) {
      this.ctx.translate(s * h, 0);
    } else if (rotation <= Math.PI) {
      this.ctx.translate(this.canvas.width, -c * h);
    } else if (rotation <= 1.5 * Math.PI) {
      this.ctx.translate(-c * w, this.canvas.height);
    } else {
      this.ctx.translate(0, -s * w);
    }
    // 旋转90°
    this.ctx.rotate(rotation);
    this.ctx.drawImage(opts.image, 0, 0, w, h);
    this.ctx.restore();
  }

  // // 将图转换成canvas
  // convertImageToCanvas(image): any {
  //   // this.canvas = document.createElement('canvas');
  //   this.canvas.width = image.width;
  //   this.canvas.height = image.height;
  //   this.ctx.drawImage(image, 0, 0);
  //   return this.canvas;
  // }

  // 放大
  zoomIn(image: CanvasImg): any {
    image.scale += 0.1;
    if (image.scale >= 5) {
      image.scale = 5;
    }
    this.draw(image);
  }

  // 缩小
  zoomOut(image: CanvasImg): any {
    image.scale -= 0.1;
    if (image.scale <= 0) {
      image.scale = 0.1;
    }
    this.draw(image);
  }

  // 重置
  zoomReset(image: CanvasImg): any {
    image.scale = image.originalScale;
    this.draw(image);
  }

  // 向右旋转
  right(image: CanvasImg): any {
    image.rotate += 90;
    if (image.rotate === 360) {
      image.rotate = 0;
    }
    this.draw(image);
  }

  // 向左旋转
  left(image: CanvasImg): any {
    if (image.rotate === 0) {
      image.rotate = 360;
    }
    image.rotate -= 90;
    this.draw(image);
  }
}


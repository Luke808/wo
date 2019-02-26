export class CanvasImg {
    canvas: any;
    image: any;
    zoomLevel = 0.1;
    rotate = 0;
    scale = 1;
    originalScale = 1;
    imgWidth = 1;
    imgHeight = 1;

    constructor(image: any, canvas: any) {
        this.image = image;
        this.imgWidth = image.width;
        this.imgHeight = image.height;
        this.canvas = canvas;
    }
}
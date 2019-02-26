import { ImageViewModule } from './image-view.module';

describe('ImageViewModule', () => {
  let imageViewModule: ImageViewModule;

  beforeEach(() => {
    imageViewModule = new ImageViewModule();
  });

  it('should create an instance', () => {
    expect(imageViewModule).toBeTruthy();
  });
});

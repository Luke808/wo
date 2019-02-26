import {Component, Input, OnInit} from '@angular/core';
import {Canvas} from '../core/canvas';
import {CanvasImg} from '../core/canvasImg';
import {MessageService} from 'primeng/api';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from 'smsf-ui-layout';
import {Location} from '@angular/common';
import { AttachmentService } from 'src/app/services/rest/api/api';
import {AttachmentDTO} from '../../../services/rest';

@Component({
  selector: 'app-working-portal-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  @Input() id: string;
  htmlCanvas: any;
  public canvas: Canvas;
  img: any;
  canvasImg: CanvasImg;
  showImgDiv = true;
  showPdfDiv = false;
  fileType: String;
  fileSrc: String;
  imgShow: boolean;
  attachments: AttachmentDTO[];
  // 暂时写这，之后提出去
  remotePath = 'https://dlhpvva0002.dir.svc.accenture.com/files/';

  constructor(private messageService: MessageService,
              private route: ActivatedRoute,
              public cs: CommonService,
              private location: Location,
              private attachmentService: AttachmentService) {

  }

  ngOnInit() {
    console.log('caseId 是--------------->', this.id);
    this.attachmentService.findAttachmentByBusinessCaseIdsUsingGET(this.id).subscribe(
      res => {
        this.attachments = res;
        // 暂时默认是一个文件
        const file = this.attachments[0];
        if (file) {
          // 传入的文件类型
          this.fileType = file.mimeType;
          const attachUrl = file.attachUrl;
          this.fileSrc = this.remotePath + attachUrl.replace('/mnt/files/', '');
          console.log('fileSrc 是--------------->', this.fileSrc);
          if (this.fileType === 'pdf') {
            this.showPdfDiv = true;
            this.showImgDiv = false;
          } else {
            this.imgShow = true;
            this.htmlCanvas = <HTMLCanvasElement>document.getElementById('canvas');
            this.canvas = new Canvas(this.htmlCanvas);
            // this.img = <HTMLImageElement>document.getElementById('img');
            this.img = new Image(590, 500);
            this.img.src = this.fileSrc;
            // 图片加载完成,不然偶尔会显示空白
            this.img.addEventListener('load', () => {
              this.canvasImg = new CanvasImg(this.img, this.htmlCanvas);
              this.canvas.draw(this.canvasImg);
              this.imgShow = false;
            });
          }
        }

      }, error => {
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('xchange.message.alertTitle'),
          detail: JSON.stringify(error)
        });
      }
    );
  }

  zoomIn() {
    console.log('zoom in start!!!!');
    if (this.canvas) {
      this.canvas.zoomIn(this.canvasImg);
    } else {
      this.messageService.add({
        severity: 'fail',
        summary: 'zoomIn',
        detail: 'failed to zoomIn!'
      });
    }
  }

  zoomOut() {
    console.log('zoom out start!!!!');
    if (this.canvas) {
      this.canvas.zoomOut(this.canvasImg);
    } else {
      this.messageService.add({
        severity: 'fail',
        summary: 'zoomOut',
        detail: 'failed to zoomOut!'
      });
    }
  }

  right() {
    console.log('right start!!!!');
    if (this.canvas) {
      this.canvas.right(this.canvasImg);
    }
  }

  left() {
    console.log('left start!!!!');
    if (this.canvas) {
      this.canvas.left(this.canvasImg);
    }
  }

  return() {
    this.location.back();
  }

  switch() {
    this.location.back();
  }

  pause() {
    this.location.back();
  }

  transfer() {
    this.location.back();
  }

  reassign() {
    this.location.back();
  }

  terminate() {
    this.location.back();
  }

  save() {
    this.location.back();
  }

  commit() {
    this.location.back();
  }


  // pop() {
  //   // 获取当前url
  //   window.open('src\assets\new-image-window.html?path=src\assets\init.png', '_blank');
  // }


}

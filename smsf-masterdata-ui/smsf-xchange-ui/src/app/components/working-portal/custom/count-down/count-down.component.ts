import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {

  time: String;
  @Input() countDownToStr: string;
  countDownTo: Date;
  now: Date;
  countDownH: number;
  countDownM: number;

  constructor() {
  }

  ngOnInit() {
    if (!this.countDownToStr) {
      this.time = '';
      return;
    }
    console.log(this.countDownToStr);
    const millisecondOfMinute = 1000 * 60;
    this.countDownTo = new Date(this.countDownToStr);
    console.log(this.countDownToStr);
    this.now = new Date();
    const diffMin = Math.floor((this.countDownTo.getTime() - this.now.getTime()) / millisecondOfMinute);
    this.countDownH = Math.floor(diffMin / 60);
    this.countDownM = diffMin % 60;
    this.time = this.countDownH + 'h ' + this.countDownM + 'm';
    setInterval(() => {
      if (this.countDownM === 0) {
        this.countDownM = 59;
        this.countDownH--;
      } else {
        this.countDownM--;
      }
      this.time = this.countDownH + 'h ' + this.countDownM + 'm';
    }, millisecondOfMinute);
  }

}

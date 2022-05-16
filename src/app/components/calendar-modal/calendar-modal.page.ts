import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.page.html',
  styleUrls: ['./calendar-modal.page.scss'],
})
export class CalendarModalPage implements AfterViewInit {
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  viewTitle: string;
  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true,
  };
  modalReady = false;

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
  }

  save(): void {
    this.modalCtrl.dismiss({ event: this.event });
  }

  onViewTitleChanged(title: string): void {
    this.viewTitle = title;
  }

  onTimeSelected(ev): void {
    this.event.startTime = new Date(ev.selectedTime);
  }

  close(): void {
    this.modalCtrl.dismiss();
  }
}

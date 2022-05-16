import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarModalPage } from '../calendar-modal/calendar-modal.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  eventSource = [];
  viewTitle: string;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  selectedDate: Date;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  next(): void {
    this.myCal.slideNext();
  }

  back(): void {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title): void {
    this.viewTitle = title;
  }

  removeEvents() {
    this.eventSource = [];
  }

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalendarModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false,
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        this.myCal.loadEvents();
      }
    });
  }
}

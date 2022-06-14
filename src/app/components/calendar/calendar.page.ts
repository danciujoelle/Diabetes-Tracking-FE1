import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { EventData } from 'src/app/models/event-data';
import { EventModel } from 'src/app/models/event-model';
import { EventService } from 'src/services/event.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  @ViewChild(CalendarComponent, null) myCal: CalendarComponent;
  allEvents = [];
  viewTitle: string;
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };
  selectedDate: Date;
  newEvent = {
    title: '',
    startTime: '',
    endTime: '',
  };
  showAddEvent: boolean;

  private userId: string;
  private responseData: Array<EventData> = new Array<EventData>();

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.userId = this.userService.userDetails.userId;
    this.getEvents();
  }

  next(): void {
    this.myCal.slideNext();
  }

  back(): void {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title: string): void {
    this.viewTitle = title;
  }

  onEventSelected(event): void {
    this.newEvent = event;
  }

  removeEvents() {
    this.allEvents = [];
  }

  openEventForm(): void {
    this.showAddEvent = !this.showAddEvent;
    this.newEvent = {
      title: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
    };
  }

  addEvent(): void {
    this.eventService
      .addAppointment(
        new EventModel(
          this.newEvent.title,
          new Date(this.newEvent.startTime),
          new Date(this.newEvent.endTime),
          this.userId
        )
      )
      .subscribe((data) => {
        if (data.statusCode === 200) {
          this.showAddEvent = false;
          this.showSuccessToast();
        }
        this.getEvents();
      });
  }

  private getEvents(): void {
    this.eventService.getAppointments(this.userId).subscribe(
      (response) => {
        this.allEvents = [];
        this.responseData = response;
        this.responseData.forEach((appointment: EventData) => {
          this.allEvents.push({
            title: appointment.title,
            description: appointment.description,
            startTime: new Date(appointment.startTime),
            endTime: new Date(appointment.endTime),
          });
        });
      },
      (err) => {
        this.showErrorToast(err.error.message);
      }
    );
  }

  async showSuccessToast() {
    await this.toastCtrl
      .create({
        message: 'You have successfully added an event',
        duration: 5000,
        color: 'success',
        buttons: [
          {
            text: 'OK',
          },
        ],
      })
      .then((res) => res.present());
  }

  async showErrorToast(error: string) {
    await this.toastCtrl
      .create({
        message: error,
        color: 'danger',
        buttons: [
          {
            text: 'OK',
          },
        ],
      })
      .then((res) => res.present());
  }
}

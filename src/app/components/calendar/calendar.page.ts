import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { EventData } from 'src/app/models/event-data';
import { EventModel } from 'src/app/models/event-model';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  private userId: string;
  private responseData: Array<EventData> = new Array<EventData>();

  allEvents = [];
  myData = [
    {
      title: 'My first event',
      description: 'My description is nice',
      startTime: new Date(2022, 25, 20, 12, 11, 11),
      endTime: new Date(2022, 5, 20, 12, 14, 11),
    },
  ];
  viewTitle: string;
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };
  selectedDate: Date;
  newEvent = {
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  };
  showAddEvent: boolean;

  @ViewChild(CalendarComponent, null) myCal: CalendarComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userId = this.router.getCurrentNavigation().extras.state.userId;
      }
    });
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
      description: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
    };
  }

  addEvent(): void {
    this.eventService
      .addAppointment(
        new EventModel(
          this.newEvent.title,
          this.newEvent.description,
          new Date(this.newEvent.startTime),
          new Date(this.newEvent.endTime),
          this.userId
        )
      )
      .subscribe((data) => {
        if (data.statusCode === 200) {
          this.showAddEvent = false;
        }
      });
    this.getEvents();
  }

  private getEvents(): void {
    this.eventService.getAppointments(this.userId).subscribe((response) => {
      this.allEvents = [];
      this.responseData = response;
      this.responseData.forEach((appointment: EventData) => {
        this.allEvents.push({
          title: appointment.title,
          description: appointment.description,
          startTime: new Date(appointment.startTime),
          endTime: new Date(appointment.endTime),
        });
        console.log(this.allEvents);
      });
    });
  }
}

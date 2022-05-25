import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-glucose-log',
  templateUrl: './glucose-log.page.html',
  styleUrls: ['./glucose-log.page.scss'],
})
export class GlucoseLogPage implements OnInit {
  whenWasMeasuredOptions: string[] = [
    'before meal',
    'after meal',
    'before exercise',
    'after exercise',
    'before bed',
  ];
  whenWasMeasured: string;
  constructor() {}

  ngOnInit() {}
}

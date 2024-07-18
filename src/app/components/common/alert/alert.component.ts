import { Component, EventEmitter, Input, Output } from '@angular/core';
import AlertsEnum from 'src/app/enums/alertsEnum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input('type') type: AlertsEnum | undefined = undefined;
  @Input('text') text: string = '';
  @Output() isAlertClosed = new EventEmitter<boolean>(false);

  protected alertClass: string;

  protected alerts: {[key: string]: string} = {
    [AlertsEnum.ERROR]: "bg-red-100 border border-red-400 text-red-700",
    [AlertsEnum.WARNING]: "bg-orange-100 border border-orange-400 text-orange-700",
    [AlertsEnum.SUCCESS]: "bg-teal-100 border border-teal-400 text-teal-700"
  }

  constructor() {
    this.alertClass = this.type ? this.alerts[this.type] : "";
  }

  hideAlert() {
    this.isAlertClosed.emit(true);
  }
}

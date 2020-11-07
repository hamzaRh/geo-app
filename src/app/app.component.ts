import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'geo-app';
  inputDisbled: boolean;

  disableInput(value): void {
    this.inputDisbled = value;
  }
 }

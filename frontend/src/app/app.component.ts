import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PingService } from './services/api/ping.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private _pingService: PingService) {}

  ngOnInit(): void {
    this._pingService.ping().subscribe((data) => {
      console.log(data.message);
    });
  }
}

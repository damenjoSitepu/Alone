import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommandService, CommandType } from '../../services/utils/command.service';
import { FormsModule } from '@angular/forms';
import { AiProfileService } from '../../services/api/ai-profile.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  message: string = '';

  constructor(
    private _commandService: CommandService,
    private _aiProfileService: AiProfileService,
  ) {}

  ngOnInit(): void {

  }

  wash(): void {
    this.message = "";
  }

  sendMessage(): void {
    const message = this.message;
    let command: CommandType;

    this.wash();

    try {
      command = this._commandService.parse(message);
    } catch (e: any) {
      alert(e.message);
      return;
    }

    switch (command.operationName) {
      case "create":
        switch (command.operationModuleName) {
          case "ai-profile":
            this._aiProfileService.create(command.options['name']).subscribe((res) => {
              alert(res.message);
            });
            break;
          default:
            alert("Invalid operation module name.");
        }
        break;
      default:
        alert("Invalid operation name.");
    }
  }
}

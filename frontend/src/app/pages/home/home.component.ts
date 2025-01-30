import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommandService, CommandType } from '../../services/utils/command.service';
import { FormsModule } from '@angular/forms';
import { AiProfileService } from '../../services/api/ai-profile.service';
import { finalize } from 'rxjs';

type Message = {
  isSender: boolean;
  message: string;
  timestamp: Date;
  messageType: MessageType;
};

type MessageType = "NORMAL" | "AI_RESPONSE_ROWS_AFFECTED";

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
  input: string = '';
  messages: Message[] = [];
  loaders: { sent: boolean } = {
    sent: false,
  };

  constructor(
    private _commandService: CommandService,
    private _aiProfileService: AiProfileService,
  ) {}

  ngOnInit(): void {

  }

  wash(): void {
    this.input = "";
  }

  sendMessage(): void {
    const input = this.input;
    let command: CommandType;

    this.wash();

    try {
      command = this._commandService.parse(input);
    } catch (e: any) {
      alert(e.message);
      return;
    }

    this.loaders.sent = true;

    switch (command.operationName) {
      case "create":
        switch (command.operationModuleName) {
          case "ai-profile":
            this.messages = [...this.messages, this.buildMessage(true, "You're about to execute a command to create new AI Profile. This may take a while...", "NORMAL")];
            this._aiProfileService.create(command.options['name'])
              .pipe(
                finalize(() => {
                  this.loaders.sent = false;
                })
              )
              .subscribe((res) => {
                this.messages = [...this.messages, this.buildMessage(false, res.message, "NORMAL")];
                this.messages = [...this.messages, this.buildMessage(false, `Query executed successfully. ${res.rows_inserted} row${res.rows_inserted > 1 ? "s" : ""} affected.`, "AI_RESPONSE_ROWS_AFFECTED")];
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

  buildMessage(isSender: boolean, message: string, messageType: MessageType): Message {
    return {
      isSender,
      message,
      timestamp: new Date(),
      messageType,
    }
  }
}

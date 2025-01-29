import { Injectable } from '@angular/core';

export type CommandType = {
  operationName: string;
  operationModuleName: string;

  options: Record<string, string>;
};

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  parse(input: string): CommandType {
    const commandPattern = /^create:([\w-]+)\s+/;
    const optionPattern = /--([\w-]+)="([^"]+)"/g;

    const commandMatch = input.match(commandPattern);
    if (!commandMatch) {
      throw new Error("Only CREATE command is supported for now.");
    }

    const operationModuleName = commandMatch[1];
    const options: Record<string, string> = {};
    let match;

    while ((match = optionPattern.exec(input))) {
      options[match[1]] = match[2];
    }

    return {
      operationName: "create",
      operationModuleName,
      options,
    };
  }
}

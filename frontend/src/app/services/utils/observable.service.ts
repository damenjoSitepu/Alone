import { Injectable } from '@angular/core';
import { map, OperatorFunction } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  /**
   * Extracts the values from the array to an object (key value pairs).
   * @param keys - The keys to extract from the array.
   * @returns An operator function that extracts the values from the array based on the keys and returns an object.
   */
  extractToObject<T>(keys: string[]): OperatorFunction<any, T> {
    if (keys.length === 0) {
      throw new Error("Keys array can't be empty.");
    }

    return map((data: any[]) => {
      let obj: any = {};

      keys.forEach((k, i) => {
        obj[k] = data[i];
      });

      return obj as T;
    });
  }
}

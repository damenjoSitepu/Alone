import { Injectable } from '@angular/core';
import { map, OperatorFunction } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  /**
   * Recursively converts an array into an object using provided keys.
   * @param data - The array data to convert.
   * @param keys - The keys used to map values.
   * @returns The transformed object.
   */
  deepConvertToObject<T>(data: any, keys: any): T {
    if (Array.isArray(data)) {
      if (Array.isArray(keys)) {
        if (Array.isArray(keys[0])) {
          // If keys contain nested structures, map each item recursively
          return data.map((item) => this.deepConvertToObject(item, keys[0])) as T;
        }
      
        let obj: any = {};
        keys.forEach((k: string, i: number) => {
          obj[k] = this.deepConvertToObject(data[i], k);
        });
        return obj as T;
      } else {
        return data as T; 
      }
    }
    return data as T;
  }

  /**
   * Extracts values from a nested array into an object based on provided keys.
   * @param keys - The structure of keys mapping to convert arrays into objects.
   * @returns An operator function that transforms the incoming array.
   */
  extractToObject<T>(keys: any): OperatorFunction<any, T> {
    if (!keys || keys.length === 0) {
      throw new Error("Keys array can't be empty.");
    }

    return map((data: any) => this.deepConvertToObject<T>(data, keys));
  }
}

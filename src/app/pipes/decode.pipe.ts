import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decode'
})
export class DecodePipe implements PipeTransform {

    transform(value: any): any {
        if (!value) return;
        let txt = document.createElement("textarea");
        txt.innerHTML = value;
        return txt.value;
    }

}

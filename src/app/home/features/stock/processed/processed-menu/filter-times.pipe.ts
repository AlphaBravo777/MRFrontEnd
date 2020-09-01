import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterTimes'
})
export class FilterTimesPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            for (let i = 0; i < value.length; i++) {
                if (value[i].times.includes('Paper')) {
                    value.splice(i, 1);
                }

            }
        }
        return value;
    }
}

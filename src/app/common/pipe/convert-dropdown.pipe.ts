import { Pipe, PipeTransform } from '@angular/core';
import { Dropdown } from '../model/dropdown.model';

@Pipe({
    name: 'convertDropdown',
    standalone: true,
})
export class ConvertDropdownPipe implements PipeTransform {
    transform(item: string): Dropdown[] {
        let dropdown: Dropdown[] = JSON.parse(item);
        return dropdown;
    }
}

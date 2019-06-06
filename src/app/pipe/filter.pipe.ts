import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, prop?: string): any[] {
    if(!items) return [];
    if(!searchText || !prop) return items;
    
    searchText = searchText.toLowerCase();
        return items.filter( it => {
          return it[prop].toLowerCase().includes(searchText);
        });
   } 
}
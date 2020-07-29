import {Pipe, PipeTransform} from "@angular/core";
import {Client} from "../interfaces";

@Pipe({
  name: 'nameFilter'
})
export class SearchPipe implements PipeTransform {
  transform(clients: Client[], search: string = ''): Client[] {
    if (!search.trim()) {
      return clients;
    }
    return clients.filter(client => {
      return client.name.toLowerCase()
        .indexOf(search.toLowerCase()) !== -1;
    })
  }

}

import { Chapter } from '../../../../oith-lib/src/models/Chapter';
import { of } from 'rxjs';
import axios from 'axios';
import { map } from 'rxjs/operators';
import { flatMap$ } from '../../../../oith-lib/src/rx/flatMap$';
export function get$(id: string) {
  return of(axios.get(id)).pipe(
    flatMap$,
    map(o => {
      console.log(o.data);

      return o.data as Chapter;
    }),
  );
}

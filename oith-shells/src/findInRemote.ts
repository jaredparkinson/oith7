import { of } from 'rxjs';
import { BuildShellOptions } from './get_shell';
import { map } from 'rxjs/operators';
import { get$ } from './store/functions/get';
export function findInRemote(buildShell: BuildShellOptions) {
  if (
    !buildShell.chapter &&
    buildShell.id &&
    typeof buildShell.get === 'function'
  ) {
    return get$(`assets/scripture_files/${buildShell.id}.json`).pipe(
      map(chapter => {
        buildShell.chapter = chapter;
        buildShell.resetShell = true;
        return buildShell;
      }),
    );
  }
  return of(buildShell);
}

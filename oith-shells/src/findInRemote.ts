import { of } from 'rxjs';
import { BuildShellOptions } from './get_shell';
import { map } from 'rxjs/operators';
export function findInRemote(buildShell: BuildShellOptions) {
  if (!buildShell.chapter && buildShell.id) {
    return buildShell.get(buildShell.id).pipe(
      map(chapter => {
        buildShell.chapter = chapter;
        buildShell.resetShell = true;
        return buildShell;
      }),
    );
  }
  return of(buildShell);
}

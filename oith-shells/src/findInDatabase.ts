import { of } from 'rxjs';
import { BuildShellOptions } from './get_shell';
import { map } from 'rxjs/operators';
export function findInDatabase(buildShell: BuildShellOptions) {
  if (
    buildShell.id &&
    buildShell.checkDatabase &&
    typeof buildShell.findInDB === 'function'
  ) {
    return buildShell.findInDB(buildShell.id).pipe(
      map(chapter => {
        buildShell.chapter = chapter;
        buildShell.resetShell = true;

        return buildShell;
      }),
    );
  }
  return of(buildShell);
}

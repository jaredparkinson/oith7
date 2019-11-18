import { of } from 'rxjs';
import { BuildShellOptions } from './get_shell';
export function findInHistory(buildShell: BuildShellOptions) {
  if (buildShell.checkHistory) {
  }
  return of(buildShell);
}

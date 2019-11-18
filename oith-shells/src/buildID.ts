import { of } from 'rxjs';
import { BuildShellOptions } from './get_shell';
export function buildID(buildShell: BuildShellOptions) {
  const book = buildShell.chapterParams['book'] as string;
  const chapter = buildShell.chapterParams['chapter'] as string;

  if (typeof book === 'string' && typeof chapter === 'string') {
    const chapterSplit = chapter.split('.');
    buildShell.highlight = chapterSplit[1];
    buildShell.context = chapterSplit[2];
    if (buildShell.highlight) {
      buildShell.scrollToVerse = true;
    }
    buildShell.id = `${buildShell.settings.lang}-${book}-${chapterSplit[0]}-chapter`;
    return of(buildShell);
  }
  throw new Error(
    `The params Book: ${book} or Chapter: ${chapter} were undefined, and an ID couldn't be generated.`,
  );
}

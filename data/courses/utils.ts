import fs from 'fs';
import path from 'path';

export function readLessonFiles(lessonPath: string): { exampleCode: Record<string, string>, userCodeTemplate: Record<string, string> } {
  const exampleCode: Record<string, string> = {};
  const userCodeTemplate: Record<string, string> = {};

  try {
    const lessonDir = path.join(process.cwd(), 'data', 'lessons', 'canvas-confetti', lessonPath);

    const files = fs.readdirSync(lessonDir).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const filePath = path.join(lessonDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      if (file.endsWith('.template.js')) {
        // Template files: remove .template suffix for display name
        const displayName = file.replace('.template.js', '.js');
        userCodeTemplate[displayName] = content;
      } else {
        // Regular files: use exact filename as display name
        exampleCode[file] = content;
      }
    }
  } catch (error) {
    console.warn(`Could not read lesson files for ${lessonPath}:`, error);
  }

  return { exampleCode, userCodeTemplate };
}
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
  const { courseId, lessonId } = await params;

  try {
    const lessonDir = path.join(process.cwd(), 'data', 'lessons', courseId, lessonId);

    if (!fs.existsSync(lessonDir)) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const files = fs.readdirSync(lessonDir).filter(file => file.endsWith('.js'));

    const exampleCode: Record<string, string> = {};
    const userCodeTemplate: Record<string, string> = {};

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

    // Add cache headers to prevent aggressive caching in development
    const headers = new Headers();
    if (process.env.NODE_ENV === 'development') {
      headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      headers.set('Pragma', 'no-cache');
      headers.set('Expires', '0');
    }

    return NextResponse.json(
      { exampleCode, userCodeTemplate },
      { headers }
    );
  } catch (error) {
    console.error(`Error reading lesson files for ${courseId}/${lessonId}:`, error);
    return NextResponse.json(
      { error: 'Failed to read lesson files' },
      { status: 500 }
    );
  }
}

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

    // Load lesson-specific example files
    for (const file of files) {
      const filePath = path.join(lessonDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      if (!file.endsWith('.template.js')) {
        // Regular files: use exact filename as display name
        exampleCode[file] = content;
      }
    }

    // Load course-level template (single template for all lessons)
    const courseDir = path.join(process.cwd(), 'data', 'lessons', courseId);
    const courseTemplateFile = path.join(courseDir, 'index.template.js');

    if (fs.existsSync(courseTemplateFile)) {
      const templateContent = fs.readFileSync(courseTemplateFile, 'utf-8');
      userCodeTemplate['index.js'] = templateContent;
    } else {
      // Fallback template if course template doesn't exist
      userCodeTemplate['index.js'] = `// ${courseId} - Workspace
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Escreva seu código aqui...`;
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

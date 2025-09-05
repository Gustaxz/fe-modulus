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
    let htmlTemplate: string = '';

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

    // Load course-level HTML template
    const courseHtmlFile = path.join(courseDir, 'index.html');
    if (fs.existsSync(courseHtmlFile)) {
      htmlTemplate = fs.readFileSync(courseHtmlFile, 'utf-8');
    } else {
      // Fallback HTML template if course template doesn't exist
      htmlTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${courseId} - Code Output</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8f9fa;
        }
        canvas {
            border: 2px solid #e9ecef;
            border-radius: 8px;
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .error {
            background: #ffe6e6;
            border: 1px solid #ff9999;
            color: #d63384;
            padding: 10px;
            border-radius: 6px;
            margin: 10px 0;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <canvas id="myCanvas" width="400" height="300"></canvas>
    <div id="console"></div>
    
    <script>
        // Basic console capture
        const consoleDiv = document.getElementById('console');
        const originalLog = console.log;
        
        console.log = function(...args) {
            const message = args.map(arg => String(arg)).join(' ');
            const logDiv = document.createElement('div');
            logDiv.textContent = '> ' + message;
            consoleDiv.appendChild(logDiv);
            originalLog.apply(console, args);
        };
        
        try {
            /* USER_CODE_PLACEHOLDER */
        } catch (error) {
            console.error(error.message);
        }
    </script>
</body>
</html>`;
    }

    // Add cache headers to prevent aggressive caching in development
    const headers = new Headers();
    if (process.env.NODE_ENV === 'development') {
      headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      headers.set('Pragma', 'no-cache');
      headers.set('Expires', '0');
    }

    return NextResponse.json(
      { exampleCode, userCodeTemplate, htmlTemplate },
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

import { useEffect, useState } from 'react';

interface LessonFiles {
  exampleCode: Record<string, string>;
  userCodeTemplate: Record<string, string>;
}

export function useLessonFiles(courseId: string, lessonId: string) {
  const [files, setFiles] = useState<LessonFiles>({
    exampleCode: {},
    userCodeTemplate: {}
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [templatesUpdated, setTemplatesUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/lesson-files/${courseId}/${lessonId}`, {
          // Add cache busting in development
          cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'default',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch lesson files: ${response.statusText}`);
        }

        const data = await response.json();
        setFiles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching lesson files:', err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && lessonId) {
      fetchFiles();
    }
  }, [courseId, lessonId]);

  return {
    files,
    loading: loading || refreshing,
    templatesUpdated,
    error,
    refetch: () => {
      // Force refetch by updating the dependency
      const fetchFiles = async () => {
        try {
          setRefreshing(true);
          setError(null);

          // Add timestamp to force cache bust
          const timestamp = Date.now();
          const response = await fetch(`/api/lesson-files/${courseId}/${lessonId}?t=${timestamp}`, {
            cache: 'no-store',
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch lesson files: ${response.statusText}`);
          }

          const data = await response.json();
          setFiles(data);
          setTemplatesUpdated(true);
          // Hide the message after 5 seconds
          setTimeout(() => setTemplatesUpdated(false), 5000);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          console.error('Error fetching lesson files:', err);
        } finally {
          setRefreshing(false);
        }
      };

      fetchFiles();
    }
  };
}

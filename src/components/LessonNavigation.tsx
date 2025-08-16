"use client";

import { useRouter } from "next/navigation";

interface Lesson {
	id: string;
	title: string;
}

interface LessonNavigationProps {
	courseId: string;
	lessons: Lesson[];
	currentLessonId: string;
}

export default function LessonNavigation({
	courseId,
	lessons,
	currentLessonId,
}: LessonNavigationProps) {
	const router = useRouter();

	const handleLessonChange = (lessonId: string) => {
		router.push(`/curso/${courseId}?lesson=${lessonId}`);
	};

	return (
		<select
			value={currentLessonId}
			onChange={(e) => handleLessonChange(e.target.value)}
			className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
		>
			{lessons.map((lesson, index) => (
				<option key={lesson.id} value={lesson.id}>
					{index + 1}. {lesson.title}
				</option>
			))}
		</select>
	);
}

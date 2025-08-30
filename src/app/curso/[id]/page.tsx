import CodeEditor from "@/components/CodeEditor";
import LessonNavigation from "@/components/LessonNavigation";
import ThemeToggle from "@/components/ThemeToggle";
import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { courses } from "../../../../data/courses";

interface CoursePageProps {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ lesson?: string }>;
}

export async function generateStaticParams() {
	return courses.map((course) => ({
		id: course.id,
	}));
}

async function getMarkdownContent(courseId: string, lessonId: string): Promise<string> {
	try {
		const filePath = path.join(process.cwd(), "data/lessons", courseId, `${lessonId}.md`);
		const content = fs.readFileSync(filePath, "utf-8");
		return content;
	} catch (error) {
		console.error("Error reading markdown file:", error);
		return "";
	}
}

export default async function CoursePage({ params, searchParams }: CoursePageProps) {
	const { id } = await params;
	const { lesson } = await searchParams;

	const course = courses.find((c) => c.id === id);
	if (!course) {
		notFound();
	}

	// Determinar lição atual (primeira se não especificada)
	const currentLessonId = lesson || course.lessons[0]?.id;
	const currentLesson = course.lessons.find((l) => l.id === currentLessonId);

	if (!currentLesson) {
		notFound();
	}

	const markdownContent = await getMarkdownContent(id, currentLessonId);

	// Usar código da lição específica ou fallback para código padrão
	const exampleCode = currentLesson.exampleCode || {
		"index.js": `const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 100, 100);`,
	};

	const userCode = currentLesson.userCodeTemplate || {
		"index.js": `// Escreva seu código aqui
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Seu código vai aqui...`,
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Header */}
			<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
							<h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-1">
								{currentLesson.title}
							</h2>
							<p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
								{currentLesson.description}
							</p>
						</div>
						<div className="flex items-center gap-4">
							<ThemeToggle />
							<a
								href="/"
								className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2"
							>
								← Voltar aos cursos
							</a>
						</div>
					</div>

					{/* Indicador de Progresso */}
					<div className="mt-4">
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm text-gray-600 dark:text-gray-400">
								Etapa {course.lessons.findIndex((l) => l.id === currentLessonId) + 1} de{" "}
								{course.lessons.length}
							</span>
							<span className="text-sm text-gray-600 dark:text-gray-400">
								{Math.round(
									((course.lessons.findIndex((l) => l.id === currentLessonId) + 1) /
										course.lessons.length) *
										100
								)}
								%
							</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
							<div
								className="bg-blue-600 h-2 rounded-full transition-all duration-300"
								style={{
									width: `${
										((course.lessons.findIndex((l) => l.id === currentLessonId) + 1) /
											course.lessons.length) *
										100
									}%`,
								}}
							></div>
						</div>
					</div>
				</div>
			</header>

			{/* Navegação entre Lições */}
			<nav className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
				<div className="container mx-auto px-4 py-3">
					<div className="flex items-center justify-between">
						<div className="flex-1 flex justify-start">
							{course.lessons.findIndex((l) => l.id === currentLessonId) > 0 && (
								<a
									href={`/curso/${id}?lesson=${
										course.lessons[course.lessons.findIndex((l) => l.id === currentLessonId) - 1].id
									}`}
									className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
								>
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 19l-7-7 7-7"
										/>
									</svg>
									Anterior
								</a>
							)}
						</div>

						{/* Dropdown de Lições */}
						<div className="flex-1 flex justify-center">
							<LessonNavigation
								courseId={id}
								lessons={course.lessons}
								currentLessonId={currentLessonId}
							/>
						</div>

						<div className="flex-1 flex justify-end">
							{course.lessons.findIndex((l) => l.id === currentLessonId) <
								course.lessons.length - 1 && (
								<a
									href={`/curso/${id}?lesson=${
										course.lessons[course.lessons.findIndex((l) => l.id === currentLessonId) + 1].id
									}`}
									className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
								>
									Próxima
									<svg
										className="w-4 h-4 ml-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</a>
							)}
						</div>
					</div>
				</div>
			</nav>

			<div className="container mx-auto px-4 py-8">
				{/* Seção de Markdown */}
				<section className="mb-12">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
						<div className="markdown-content">
							<ReactMarkdown
								rehypePlugins={[rehypeRaw]}
								components={{
									a: ({ node, ...props }) => (
										<a {...props} target="_blank" rel="noopener noreferrer" />
									),
								}}
							>
								{markdownContent}
							</ReactMarkdown>
						</div>
					</div>
				</section>

				{/* Seção de Código de Exemplo */}
				<section className="mb-12">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
							<div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
								<svg
									className="w-5 h-5 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
									/>
								</svg>
							</div>
							Exemplo Prático
						</h2>
						<CodeEditor
							initialFiles={exampleCode}
							storageKey={`example-${id}-${currentLessonId}`}
						/>
					</div>
				</section>

				{/* Seção do Usuário */}
				<section className="mb-8">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
							<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
								<svg
									className="w-5 h-5 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
									/>
								</svg>
							</div>
							Seu Código
							<span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-auto">
								Progresso salvo automaticamente
							</span>
						</h2>
						<CodeEditor initialFiles={userCode} storageKey={`user-${id}`} preserveProgress={true} />
					</div>
				</section>
			</div>
		</div>
	);
}

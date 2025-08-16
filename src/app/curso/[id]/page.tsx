import CodeEditor from "@/components/CodeEditor";
import ThemeToggle from "@/components/ThemeToggle";
import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";
import ReactMarkdown from "react-markdown";
import { courses } from "../../../../data/courses";

interface CoursePageProps {
	params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
	return courses.map((course) => ({
		id: course.id,
	}));
}

async function getMarkdownContent(id: string): Promise<string> {
	try {
		const filePath = path.join(process.cwd(), "data/lessons", `${id}.md`);
		const content = fs.readFileSync(filePath, "utf-8");
		return content;
	} catch (error) {
		console.error("Error reading markdown file:", error);
		return "";
	}
}

export default async function CoursePage({ params }: CoursePageProps) {
	const { id } = await params;

	const course = courses.find((c) => c.id === id);
	if (!course) {
		notFound();
	}

	const markdownContent = await getMarkdownContent(id);

	// Código de exemplo pré-carregado
	const exampleCode = {
		"index.js": `const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 100, 100);

// Adicione mais código aqui
ctx.fillStyle = "blue";
ctx.beginPath();
ctx.arc(100, 100, 30, 0, Math.PI * 2);
ctx.fill();`,
	};

	const userCode = {
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
							<p className="text-gray-600 dark:text-gray-300 mt-1">{course.description}</p>
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
				</div>
			</header>

			<div className="container mx-auto px-4 py-8">
				{/* Seção de Markdown */}
				<section className="mb-12">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
						<div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-code:bg-gray-100 dark:prose-code:bg-gray-700 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800">
							<ReactMarkdown>{markdownContent}</ReactMarkdown>
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
						<CodeEditor initialFiles={exampleCode} storageKey={`example-${id}`} />
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
						</h2>
						<CodeEditor initialFiles={userCode} storageKey={`user-${id}`} />
					</div>
				</section>
			</div>
		</div>
	);
}

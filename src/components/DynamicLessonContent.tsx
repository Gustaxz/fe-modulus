"use client";

import { useLessonFiles } from "@/hooks/useLessonFiles";
import CodeEditor from "./CodeEditor";

interface DynamicLessonContentProps {
	courseId: string;
	lessonId: string;
}

export default function DynamicLessonContent({ courseId, lessonId }: DynamicLessonContentProps) {
	const { files, loading, templatesUpdated, error, refetch } = useLessonFiles(courseId, lessonId);

	// Show error state only if we have an error AND no files loaded
	if (
		error &&
		Object.keys(files.exampleCode).length === 0 &&
		Object.keys(files.userCodeTemplate).length === 0
	) {
		return (
			<div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-red-800 dark:text-red-200 font-medium">
							Erro ao carregar arquivos
						</h3>
						<p className="text-red-600 dark:text-red-300 text-sm mt-1">{error}</p>
					</div>
					<button
						onClick={refetch}
						className="px-3 py-1 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded text-sm hover:bg-red-200 dark:hover:bg-red-700"
					>
						Tentar novamente
					</button>
				</div>
			</div>
		);
	}

	// Show initial loading only when we have no files at all
	if (
		loading &&
		Object.keys(files.exampleCode).length === 0 &&
		Object.keys(files.userCodeTemplate).length === 0
	) {
		return (
			<div className="flex items-center justify-center p-8">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
				<span className="ml-2 text-gray-600 dark:text-gray-300">Carregando arquivos...</span>
			</div>
		);
	}

	// Fallback code if no files are found
	const exampleCode =
		Object.keys(files.exampleCode).length > 0
			? files.exampleCode
			: {
					"index.js": `const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 100, 100);`,
			  };

	const userCode =
		Object.keys(files.userCodeTemplate).length > 0
			? files.userCodeTemplate
			: {
					"index.js": `// Escreva seu código aqui
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Seu código vai aqui...`,
			  };

	return (
		<>
			{/* Global Refresh Button */}
			<div className="flex justify-end mb-4">
				<button
					onClick={refetch}
					disabled={loading}
					className={`px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md transition-colors ${
						loading
							? "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
							: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
					}`}
					title={loading ? "Atualizando arquivos..." : "Recarregar arquivos de ambas as seções"}
				>
					{loading ? (
						<>
							<div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
							Atualizando arquivos...
						</>
					) : (
						<>🔄 Atualizar arquivos</>
					)}
				</button>
			</div>

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
						{loading && (
							<div className="ml-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
								<div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
								Atualizando...
							</div>
						)}
					</h2>
					<CodeEditor initialFiles={exampleCode} storageKey={`example-${courseId}-${lessonId}`} />
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
						{templatesUpdated && (
							<div className="ml-2 flex items-center text-sm text-yellow-600 dark:text-yellow-400">
								<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
										clipRule="evenodd"
									/>
								</svg>
								Templates atualizados - Use Reset para nova versão
							</div>
						)}
						{loading && (
							<div className="ml-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
								<div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-1"></div>
								Atualizando...
							</div>
						)}
					</h2>
					<CodeEditor
						initialFiles={userCode}
						storageKey={`user-${courseId}-${lessonId}`}
						preserveProgress={true}
					/>
				</div>
			</section>
		</>
	);
}

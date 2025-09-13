import Link from "next/link";
import { courses } from "../../data/courses";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
			<div className="flex-1">
				<div className="container mx-auto px-4 py-8">
					<div className="flex justify-between mb-4">
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Modulus</h1>
						{/* <ThemeToggle /> */}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
						{courses.map((course) => (
							<Link key={course.id} href={`/curso/${course.id}`} className="group block">
								<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 h-full border border-gray-200 dark:border-gray-700">
									<div className="flex items-center justify-between mb-4">
										<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
											<svg
												className="w-6 h-6 text-white"
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
										<div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
											Iniciar curso →
										</div>
									</div>

									<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
										{course.title}
									</h2>

									<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
										{course.description}
									</p>

									<div className="mt-4 flex items-center justify-between">
										<span className="text-sm text-gray-500 dark:text-gray-400">
											{course.lessons.length} {course.lessons.length === 1 ? "lição" : "lições"}
										</span>
										<div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
											<span>Ver detalhes</span>
											<svg
												className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
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
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
				<div className="container mx-auto px-4 py-6">
					<div className="flex items-center justify-center">
						<a
							href="https://github.com/gustaxz/fe-modulus"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
						>
							<svg
								className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="font-medium">Ajude a construir o Modulus!</span>
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

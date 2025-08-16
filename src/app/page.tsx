import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { courses } from "../../data/courses";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-between mb-4">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Modulus</h1>
					<ThemeToggle />
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

								<div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
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
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

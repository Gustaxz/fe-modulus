"use client";

import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

interface CodeEditorProps {
	initialFiles: Record<string, string>;
	storageKey: string;
	preserveProgress?: boolean;
}

export default function CodeEditor({
	initialFiles,
	storageKey,
	preserveProgress = false,
}: CodeEditorProps) {
	const [files, setFiles] = useState<Record<string, string>>(initialFiles);
	const [activeFile, setActiveFile] = useState<string>(Object.keys(initialFiles)[0] || "index.js");
	const [output, setOutput] = useState<string>("");
	const [isRunning, setIsRunning] = useState(false);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	// Carregar do localStorage na inicialização
	useEffect(() => {
		const saved = localStorage.getItem(storageKey);
		if (saved) {
			try {
				const savedFiles = JSON.parse(saved);
				if (preserveProgress) {
					// Para seção do usuário, manter código existente e apenas adicionar novos arquivos
					const mergedFiles = { ...initialFiles };
					Object.keys(savedFiles).forEach((key) => {
						if (savedFiles[key].trim() !== "") {
							mergedFiles[key] = savedFiles[key];
						}
					});
					setFiles(mergedFiles);
				} else {
					// Para exemplos, sempre usar código salvo se existir
					setFiles(savedFiles);
				}
			} catch (error) {
				console.error("Error loading saved files:", error);
			}
		}
	}, [storageKey, preserveProgress, initialFiles]);

	// Salvar no localStorage quando files mudarem
	useEffect(() => {
		localStorage.setItem(storageKey, JSON.stringify(files));
	}, [files, storageKey]);

	const updateFile = (filename: string, content: string) => {
		setFiles((prev) => ({
			...prev,
			[filename]: content,
		}));
	};

	const addNewFile = () => {
		const fileName = prompt("Nome do arquivo (ex: utils.js):");
		if (fileName && !files[fileName]) {
			setFiles((prev) => ({
				...prev,
				[fileName]: "// Novo arquivo\n",
			}));
			setActiveFile(fileName);
		}
	};

	const deleteFile = (filename: string) => {
		if (Object.keys(files).length <= 1) {
			alert("Não é possível deletar o último arquivo");
			return;
		}

		const { [filename]: deleted, ...remaining } = files;
		setFiles(remaining);

		if (activeFile === filename) {
			setActiveFile(Object.keys(remaining)[0]);
		}
	};

	const resetFiles = () => {
		if (confirm("Tem certeza que deseja resetar todos os arquivos?")) {
			setFiles(initialFiles);
			setActiveFile(Object.keys(initialFiles)[0]);
		}
	};

	const runCode = () => {
		setIsRunning(true);

		// Concatenar todos os arquivos JavaScript
		const combinedCode = Object.entries(files)
			.filter(([filename]) => filename.endsWith(".js"))
			.map(([, content]) => content)
			.join("\n\n");

		// HTML template com Canvas
		const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Code Output</title>
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
        .console-output {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            padding: 10px;
            border-radius: 6px;
            margin: 10px 0;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 14px;
            max-height: 200px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <canvas id="myCanvas" width="400" height="300"></canvas>
    <div id="console"></div>
    
    <script>
        // Capturar console.log
        const consoleDiv = document.getElementById('console');
        const originalLog = console.log;
        const originalError = console.error;
        
        console.log = function(...args) {
            const message = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            
            const logDiv = document.createElement('div');
            logDiv.textContent = '> ' + message;
            logDiv.style.marginBottom = '5px';
            consoleDiv.appendChild(logDiv);
            
            originalLog.apply(console, args);
        };
        
        console.error = function(...args) {
            const message = args.map(arg => String(arg)).join(' ');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            errorDiv.textContent = 'Error: ' + message;
            consoleDiv.appendChild(errorDiv);
            
            originalError.apply(console, args);
        };
        
        // Capturar erros JavaScript
        window.onerror = function(message, source, lineno, colno, error) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            errorDiv.textContent = \`Error (line \${lineno}): \${message}\`;
            consoleDiv.appendChild(errorDiv);
            return true;
        };
        
        try {
            ${combinedCode}
        } catch (error) {
            console.error(error.message);
        }
    </script>
</body>
</html>`;

		// Injetar no iframe
		if (iframeRef.current) {
			const iframe = iframeRef.current;
			iframe.srcdoc = htmlContent;
		}

		setTimeout(() => setIsRunning(false), 500);
	};

	const fileNames = Object.keys(files);

	return (
		<div className="space-y-4">
			{/* Abas de arquivos */}
			<div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600">
				<div className="flex space-x-1 pb-2">
					{fileNames.map((filename) => (
						<div key={filename} className="relative flex items-center">
							<button
								onClick={() => setActiveFile(filename)}
								className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-colors ${
									activeFile === filename
										? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-b-2 border-blue-500"
										: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
								} ${fileNames.length > 1 ? "pr-8" : ""}`}
							>
								{filename}
							</button>
							{fileNames.length > 1 && (
								<button
									onClick={() => deleteFile(filename)}
									className="absolute right-1 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900 rounded text-xs"
								>
									×
								</button>
							)}
						</div>
					))}
					<button
						onClick={addNewFile}
						className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
					>
						+ Novo arquivo
					</button>
				</div>

				<div className="flex gap-2">
					<button
						onClick={resetFiles}
						className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
					>
						Reset
					</button>
					<button
						onClick={runCode}
						disabled={isRunning}
						className="px-4 py-1 text-sm bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-md transition-colors flex items-center gap-2"
					>
						{isRunning ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								Executando...
							</>
						) : (
							<>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-7a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Run
							</>
						)}
					</button>
				</div>
			</div>

			{/* Editor e Preview */}
			<div className="flex flex-col lg:flex-row gap-4 h-96">
				{/* Editor */}
				<div className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg relative">
					<div className="absolute inset-0 rounded-lg overflow-hidden">
						<Editor
							height="100%"
							language="javascript"
							value={files[activeFile] || ""}
							onChange={(value) => updateFile(activeFile, value || "")}
							theme="vs-dark"
							options={{
								minimap: { enabled: false },
								fontSize: 14,
								lineNumbers: "on",
								roundedSelection: false,
								scrollBeyondLastLine: false,
								automaticLayout: true,
								tabSize: 2,
								fixedOverflowWidgets: true,
								suggest: {
									showKeywords: true,
									showSnippets: true,
									showFunctions: true,
									showConstructors: true,
									showFields: true,
									showVariables: true,
									showClasses: true,
									showStructs: true,
									showInterfaces: true,
									showModules: true,
									showProperties: true,
									showEvents: true,
									showOperators: true,
									showUnits: true,
									showValues: true,
									showConstants: true,
									showEnums: true,
									showEnumMembers: true,
									showColors: true,
									showFiles: true,
									showReferences: true,
									showFolders: true,
									showTypeParameters: true,
									showIssues: true,
									showUsers: true,
									showWords: true,
								},
								quickSuggestions: {
									other: true,
									comments: false,
									strings: false,
								},
								suggestOnTriggerCharacters: true,
								acceptSuggestionOnCommitCharacter: true,
								acceptSuggestionOnEnter: "on",
								wordBasedSuggestions: "currentDocument",
							}}
						/>
					</div>
				</div>

				{/* Preview */}
				<div className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white">
					<iframe
						ref={iframeRef}
						className="w-full h-full"
						sandbox="allow-scripts"
						title="Code Output"
					/>
				</div>
			</div>
		</div>
	);
}

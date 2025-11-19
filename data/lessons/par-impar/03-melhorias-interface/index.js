function criarVerificadorCompleto() {
    // Limpar o conteúdo anterior
    const container = document.getElementById("myCanvas").parentElement;
    container.innerHTML = '<canvas id="myCanvas" width="800" height="600"></canvas>';
    
    // Estado da aplicação
    const estado = {
        historico: [],
        estatisticas: {
            modulo: { total: 0, tempoTotal: 0 },
            bitwise: { total: 0, tempoTotal: 0 }
        }
    };
    
    // Criar container principal
    const appContainer = document.createElement('div');
    appContainer.style.cssText = `
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 700px;
        margin: 20px auto;
        padding: 25px;
        border-radius: 15px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        color: white;
    `;
    
    // Título
    const titulo = document.createElement('h1');
    titulo.textContent = '🔢 Comparador Par/Ímpar: Módulo vs Bitwise';
    titulo.style.cssText = `
        text-align: center;
        margin-bottom: 25px;
        font-size: 24px;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    `;
    appContainer.appendChild(titulo);
    
    // Container de input
    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = `
        background: rgba(255,255,255,0.1);
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        backdrop-filter: blur(10px);
        text-align: center;
    `;
    
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Digite um número';
    input.style.cssText = `
        padding: 12px;
        font-size: 16px;
        border: none;
        border-radius: 8px;
        margin: 10px;
        width: 200px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    `;
    inputContainer.appendChild(input);
    
    // Container dos botões
    const botoesContainer = document.createElement('div');
    botoesContainer.style.cssText = `
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
        margin: 15px 0;
    `;
    
    const botaoModulo = document.createElement('button');
    botaoModulo.textContent = '📊 Método Módulo (%)';
    botaoModulo.style.cssText = `
        padding: 12px 20px;
        font-size: 14px;
        background: linear-gradient(45deg, #ff6b6b, #ee5a24);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        font-weight: bold;
    `;
    
    const botaoBitwise = document.createElement('button');
    botaoBitwise.textContent = '⚡ Método Bitwise (&)';
    botaoBitwise.style.cssText = `
        padding: 12px 20px;
        font-size: 14px;
        background: linear-gradient(45deg, #4ecdc4, #44a08d);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        font-weight: bold;
    `;
    
    const botaoAmbos = document.createElement('button');
    botaoAmbos.textContent = '🚀 Comparar Ambos';
    botaoAmbos.style.cssText = `
        padding: 12px 20px;
        font-size: 14px;
        background: linear-gradient(45deg, #f093fb, #f5576c);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        font-weight: bold;
    `;
    
    botoesContainer.appendChild(botaoModulo);
    botoesContainer.appendChild(botaoBitwise);
    botoesContainer.appendChild(botaoAmbos);
    inputContainer.appendChild(botoesContainer);
    appContainer.appendChild(inputContainer);
    
    // Área de resultados
    const resultadosContainer = document.createElement('div');
    resultadosContainer.style.cssText = `
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin: 20px 0;
    `;
    
    const resultadoModulo = document.createElement('div');
    resultadoModulo.style.cssText = `
        background: rgba(255,255,255,0.1);
        padding: 15px;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        min-height: 100px;
        opacity: 0;
        transition: all 0.5s ease;
    `;
    
    const resultadoBitwise = document.createElement('div');
    resultadoBitwise.style.cssText = `
        background: rgba(255,255,255,0.1);
        padding: 15px;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        min-height: 100px;
        opacity: 0;
        transition: all 0.5s ease;
    `;
    
    resultadosContainer.appendChild(resultadoModulo);
    resultadosContainer.appendChild(resultadoBitwise);
    appContainer.appendChild(resultadosContainer);
    
    // Área de informações binárias
    const infoContainer = document.createElement('div');
    infoContainer.style.cssText = `
        background: rgba(255,255,255,0.1);
        padding: 15px;
        border-radius: 10px;
        margin: 20px 0;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: all 0.5s ease;
    `;
    appContainer.appendChild(infoContainer);
    
    // Funções de verificação
    function verificarModulo(numero) {
        const inicio = performance.now();
        const ehPar = numero % 2 === 0;
        const fim = performance.now();
        const tempo = fim - inicio;
        
        estado.estatisticas.modulo.total++;
        estado.estatisticas.modulo.tempoTotal += tempo;
        
        return { ehPar, tempo, metodo: 'módulo' };
    }
    
    function verificarBitwise(numero) {
        const inicio = performance.now();
        const ehPar = (numero & 1) === 0;
        const fim = performance.now();
        const tempo = fim - inicio;
        
        estado.estatisticas.bitwise.total++;
        estado.estatisticas.bitwise.tempoTotal += tempo;
        
        return { ehPar, tempo, metodo: 'bitwise' };
    }
    
    function mostrarResultado(numero, resultado, container, cor) {
        const tipo = resultado.ehPar ? 'PAR' : 'ÍMPAR';
        const emoji = resultado.ehPar ? '🟢' : '🟡';
        const operacao = resultado.metodo === 'módulo' ? 
            `${numero} % 2 = ${numero % 2}` : 
            `${numero} & 1 = ${numero & 1}`;
        
        container.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: ${cor};">
                ${resultado.metodo === 'módulo' ? '📊 Módulo' : '⚡ Bitwise'}
            </h3>
            <div style="font-size: 18px; font-weight: bold; margin: 10px 0;">
                ${emoji} ${numero} é ${tipo}
            </div>
            <div style="font-size: 14px; opacity: 0.8; margin: 5px 0;">
                Operação: ${operacao}
            </div>
            <div style="font-size: 12px; opacity: 0.6;">
                Tempo: ${resultado.tempo.toFixed(6)}ms
            </div>
        `;
        container.style.backgroundColor = resultado.ehPar ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 152, 0, 0.3)';
        container.style.opacity = '1';
    }
    
    function mostrarInfoBinaria(numero) {
        const binario = numero.toString(2);
        const ultimoBit = binario[binario.length - 1];
        const bitwiseResult = numero & 1;
        
        infoContainer.innerHTML = `
            <h3 style="margin: 0 0 15px 0; text-align: center;">🔍 Análise Binária</h3>
            <div style="text-align: center; font-family: monospace; font-size: 16px;">
                <div style="margin: 10px 0;">
                    <strong>Decimal:</strong> ${numero}
                </div>
                <div style="margin: 10px 0;">
                    <strong>Binário:</strong> ${binario}
                </div>
                <div style="margin: 10px 0;">
                    <strong>Último bit:</strong> <span style="color: ${ultimoBit === '0' ? '#4CAF50' : '#FF9800'}; font-weight: bold;">${ultimoBit}</span>
                </div>
                <div style="margin: 10px 0;">
                    <strong>Operação bitwise:</strong> ${numero} & 1 = ${bitwiseResult}
                </div>
                <div style="margin: 15px 0; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; font-size: 14px;">
                    ${ultimoBit === '0' ? 
                        '✅ Último bit = 0 → Número PAR' : 
                        '✅ Último bit = 1 → Número ÍMPAR'}
                </div>
            </div>
        `;
        infoContainer.style.opacity = '1';
    }
    
    function adicionarAoHistorico(numero, resultadoModulo, resultadoBitwise) {
        const agora = new Date();
        const horario = agora.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        
        estado.historico.unshift({
            numero,
            resultadoModulo,
            resultadoBitwise,
            horario
        });
        
        if (estado.historico.length > 10) {
            estado.historico.pop();
        }
    }
    
    // Event listeners
    botaoModulo.addEventListener('click', () => {
        const numero = parseInt(input.value);
        if (isNaN(numero)) {
            alert('Digite um número válido!');
            return;
        }
        
        const resultado = verificarModulo(numero);
        mostrarResultado(numero, resultado, resultadoModulo, '#ff6b6b');
        mostrarInfoBinaria(numero);
        resultadoBitwise.style.opacity = '0.3';
    });
    
    botaoBitwise.addEventListener('click', () => {
        const numero = parseInt(input.value);
        if (isNaN(numero)) {
            alert('Digite um número válido!');
            return;
        }
        
        const resultado = verificarBitwise(numero);
        mostrarResultado(numero, resultado, resultadoBitwise, '#4ecdc4');
        mostrarInfoBinaria(numero);
        resultadoModulo.style.opacity = '0.3';
    });
    
    botaoAmbos.addEventListener('click', () => {
        const numero = parseInt(input.value);
        if (isNaN(numero)) {
            alert('Digite um número válido!');
            return;
        }
        
        const resultadoMod = verificarModulo(numero);
        const resultadoBit = verificarBitwise(numero);
        
        mostrarResultado(numero, resultadoMod, resultadoModulo, '#ff6b6b');
        mostrarResultado(numero, resultadoBit, resultadoBitwise, '#4ecdc4');
        mostrarInfoBinaria(numero);
        
        adicionarAoHistorico(numero, resultadoMod, resultadoBit);
        
        // Mostrar comparação de performance
        setTimeout(() => {
            const diferenca = Math.abs(resultadoMod.tempo - resultadoBit.tempo);
            const maisRapido = resultadoMod.tempo < resultadoBit.tempo ? 'Módulo' : 'Bitwise';
            console.log(`⚡ ${maisRapido} foi ${diferenca.toFixed(6)}ms mais rápido!`);
        }, 100);
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            botaoAmbos.click();
        }
    });
    
    // Efeitos hover
    [botaoModulo, botaoBitwise, botaoAmbos].forEach(botao => {
        botao.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        });
        
        botao.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
    });
    
    // Adicionar ao DOM
    container.appendChild(appContainer);
    
    // Focar no input
    input.focus();
    
    // Mensagem inicial
    console.log("🚀 Verificador Par/Ímpar carregado!");
    console.log("💡 Digite um número e compare os métodos:");
    console.log("   📊 Módulo: usa divisão (numero % 2)");
    console.log("   ⚡ Bitwise: usa operador AND (numero & 1)");
}

// Executar a aplicação
criarVerificadorCompleto();

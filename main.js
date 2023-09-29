function extrairTexto(texto){
        const correspondencias = texto.match(/"(.*?)"/);
        return correspondencias ? correspondencias[1] : texto;
}

function extrairObjeto(texto) {
        return texto.substring(texto.indexOf("new ")+4, texto.indexOf("("));
}

function extrairCampo(texto) {
        return texto.substring(0, texto.indexOf("=") - 1);
}

function extrair() {
        const textArea = document.getElementById("info")
        const lines = textArea.value.split("\n");
        let result = ""

        for (const line of lines) {
                if (line.includes('$"'))
                        result += extrairTexto(line.trim()) + "\n"        
        }

        textArea.value = result
}

function gerarDeclaracoes() {
        const textArea = document.getElementById("info")
        const informativo = document.getElementById("informativo")
        const lines = textArea.value.split("\n");
        let result = ""

        for (const line of lines) {
                if (line.includes('new')) {
                        const obj = extrairObjeto(line.trim())
                        const campo = extrairCampo(line.trim())
                        result += `public ${obj} ${campo};\n`   
                }            
        }

        textArea.value = result  
        navigator.clipboard.writeText(result)
        informativo.classList.add('visivel')
        informativo.innerHTML = `Declarações copiadas para a área de trânsferência`
        
        setTimeout(function() {
                informativo.classList.remove('visivel')
                informativo.innerHTML = ''
        }, 2500)
}
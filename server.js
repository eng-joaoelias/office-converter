const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const officeToPdf = require('office-to-pdf');

const app = express();
const PORT = 3000;

// Middleware para manipulação de upload de arquivos
app.use(fileUpload());

// Aumentar o timeout para evitar falhas de tempo
app.use((req, res, next) => {
    req.setTimeout(500000); // Timeout de 500 segundos
    next();
});

// Definir a rota para o upload de arquivos
app.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    const file = req.files.file;
    const filePath = path.join(__dirname, 'uploads', file.name);

    // Salvar o arquivo enviado no servidor
    file.mv(filePath, async (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            return res.status(500).send('Erro ao salvar o arquivo.');
        }

        console.log('Arquivo salvo com sucesso:', filePath);

        try {
            // Realizar a conversão do arquivo para PDF
            console.log('Iniciando a conversão...');
            const data = fs.readFileSync(filePath); // Ler o arquivo de entrada
            const pdfBuffer = await officeToPdf(data); // Converter para PDF

            const outputFilePath = path.join(__dirname, 'uploads', 'converted.pdf');
            fs.writeFileSync(outputFilePath, pdfBuffer); // Salvar o PDF gerado

            console.log('Conversão concluída. Enviando arquivo PDF...');

            // Enviar o arquivo convertido ao cliente
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');

            // Corrigir possível erro de 'request aborted'
            const stream = fs.createReadStream(outputFilePath);
            stream.pipe(res);

            stream.on('end', () => {
                console.log('Arquivo enviado com sucesso!');
                // Limpar arquivos temporários
                fs.unlinkSync(filePath);
                fs.unlinkSync(outputFilePath);
            });

            stream.on('error', (streamErr) => {
                console.error('Erro ao enviar o arquivo:', streamErr);
                res.status(500).send('Erro ao enviar o arquivo.');
            });

        } catch (error) {
            console.error('Erro durante a conversão:', error);
            res.status(500).send('Erro durante a conversão do arquivo.');
        }
    });
});

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

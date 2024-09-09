const { exec } = require('child_process');
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express();

app.use(fileUpload());

// Serve arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.post('/convert', (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ success: false, error: "Nenhum arquivo foi enviado." });
    }

    const file = req.files.file;
    const filePath = path.join(__dirname, 'uploads', file.name);
    const outputFilePath = filePath.replace(path.extname(filePath), '.pdf');

    console.log("Arquivo recebido:", file.name);

    file.mv(filePath, (err) => {
        if (err) {
            console.error("Erro ao salvar o arquivo:", err);
            return res.status(500).json({ success: false, error: "Erro ao salvar o arquivo." });
        }

        const sofficePath = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;
        const command = `${sofficePath} --headless --convert-to pdf "${filePath}" --outdir "${path.join(__dirname, 'uploads')}"`;

        console.log(`Comando de conversão: ${command}`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Erro na conversão:", error);
                console.error("Erro de stderr:", stderr);
                return res.status(500).json({ success: false, error: "Erro ao converter o arquivo para PDF." });
            }

            console.log("Arquivo convertido com sucesso:", stdout);
            res.json({ success: true, pdfUrl: `/uploads/${path.basename(outputFilePath)}` });
        });
    });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

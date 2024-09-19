# Conversor de Arquivos do Office para PDF

## Índice
- [Descrição do Projeto](#descrição-do-projeto)
- [Requisitos de Sistema](#requisitos-de-sistema)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Uso](#uso)
- [Como Funciona](#como-funciona)
- [Funcionalidades](#funcionalidades)
- [Visualização de PDF](#visualização-de-pdf)
- [Manutenção e Contribuição](#manutenção-e-contribuição)
- [Licença](#licença)

## Descrição do Projeto

Este projeto é um conversor de arquivos que permite aos usuários enviar documentos do Microsoft Office (formatos `.docx`, `.xlsx` e `.pptx`) e convertê-los em arquivos PDF. A aplicação utiliza o LibreOffice em modo headless para realizar a conversão dos arquivos e o PSPDFKit para a visualização dos PDFs gerados.

## Requisitos de Sistema

Para executar este projeto, você precisará:

### Hardware

- Um computador com pelo menos 4 GB de RAM.
- Espaço em disco disponível para armazenar os arquivos temporários (pelo menos 100 MB recomendado).

### Software

1. **Node.js**:
   - **Versão**: 14.x ou superior.
   - Instale em [nodejs.org](https://nodejs.org/).

2. **LibreOffice**:
   - Certifique-se de ter o LibreOffice instalado. O caminho do executável `soffice.exe` deve ser configurado corretamente no código do servidor.
   - Baixe em [libreoffice.org](https://www.libreoffice.org/).

3. **PSPDFKit**:
   - É necessário obter uma licença e o script do PSPDFKit para a visualização de PDFs. Você pode se inscrever em [pspdfkit.com](https://pspdfkit.com/) e seguir as instruções para integrar a biblioteca ao seu projeto.
   - O script deve ser incluído na pasta `public/assets/`.

4. **Git** (opcional):
   - Para clonar o repositório, você pode usar o Git. Instale em [git-scm.com](https://git-scm.com/).

### Sistema Operacional

- Windows, macOS ou Linux.

## Tecnologias Utilizadas

- **Frontend**:
  - HTML
  - CSS
  - JavaScript

- **Backend**:
  - Node.js
  - Express
  - express-fileupload (para upload de arquivos)
  - Child Process (para executar comandos do sistema)

## Estrutura do Projeto

```
/office-converter
├── public/
│   ├── assets/
│   │   └── pspdfkit.js
│   ├── icons/
│   ├── style.css
│   ├── index.html
│   ├── script.js
│   └── view.html
├── uploads/
├── server.js
└── package.json
```

## Instalação

### Passos

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/eng-joaoelias/office-converter.git
   cd conversor-arquivos
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Verifique o caminho do LibreOffice**:
   - Abra `server.js` e verifique se o caminho para o `soffice.exe` está correto. O padrão é:
     ```javascript
     const sofficePath = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;
     ```
   - Se você estiver em um sistema diferente, ajuste o caminho conforme necessário.

4. **Inclua o PSPDFKit**:
   - Adicione o script do PSPDFKit na pasta `public/assets/`.
   - Certifique-se de ter uma licença válida para usar o PSPDFKit.

5. **Inicie o servidor**:
   ```bash
   node server.js
   ```

6. **Abra o navegador**:
   - Acesse `http://localhost:3000`.

## Uso

1. **Envio de Arquivos**: Arraste e solte um arquivo do Microsoft Office na área designada ou clique no botão para selecionar um arquivo do seu sistema.

2. **Conversão**: Após o upload, o arquivo será convertido automaticamente para PDF. Você verá uma barra de progresso durante o upload.

3. **Visualização do PDF**: Após a conversão, você pode clicar no botão para visualizar o PDF gerado na página de visualização.

## Como Funciona

- O usuário faz upload de um arquivo do Microsoft Office através da interface web.
- O arquivo é enviado para o servidor, onde é armazenado temporariamente.
- O servidor usa o LibreOffice em modo headless para converter o arquivo para PDF.
- Após a conversão, o PDF é disponibilizado para visualização e download, e os arquivos temporários são removidos após um período definido.

## Funcionalidades

- Suporte para múltiplos formatos de arquivos do Microsoft Office (`.docx`, `.xlsx`, `.pptx`).
- Interface de usuário amigável com feedback visual durante o upload.
- Conversão de arquivos em segundo plano utilizando o LibreOffice.
- Limpeza automática dos arquivos temporários após um tempo definido para evitar o uso excessivo de armazenamento.
- Visualização de PDF utilizando o PSPDFKit.

## Visualização de PDF

Após a conversão, os usuários podem visualizar o PDF gerado na página `view.html`. O arquivo PDF é carregado usando o PSPDFKit, uma biblioteca de visualização de PDF.

### Detalhes de `view.html`

- O arquivo PDF gerado é recuperado do `sessionStorage` e carregado no contêiner definido na página.
- Se o PDF não for carregado corretamente, uma mensagem de erro é exibida no console.

## Manutenção e Contribuição

Se você gostaria de contribuir para este projeto, fique à vontade para abrir um Pull Request ou relatar um problema. Para contribuir:

1. Crie um fork do projeto.
2. Crie uma nova branch para suas alterações:
   ```bash
   git checkout -b minha-nova-feature
   ```
3. Faça suas alterações e faça commit:
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Faça push da branch:
   ```bash
   git push origin minha-nova-feature
   ```
5. Abra um Pull Request.

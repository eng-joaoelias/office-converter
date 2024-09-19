const dropArea = document.querySelector('.drop-section');
const listSection = document.querySelector('.list-section');
const listContainer = document.querySelector('.list');
const fileSelector = document.querySelector('.file-selector');
const fileSelectorInput = document.querySelector('.file-selector-input');
const viewBtn = document.getElementById('view-btn');

fileSelector.onclick = () => fileSelectorInput.click();
fileSelectorInput.onchange = () => {
    [...fileSelectorInput.files].forEach((file) => {
        if (typeValidation(file.type)) {
            uploadFile(file);
        }
    });
};

dropArea.ondragover = (e) => {
    e.preventDefault();
    dropArea.classList.add('drag-over-effect');
};

dropArea.ondragleave = () => {
    dropArea.classList.remove('drag-over-effect');
};

dropArea.ondrop = (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over-effect');
    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((item) => {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (typeValidation(file.type)) {
                    uploadFile(file);
                }
            }
        });
    } else {
        [...e.dataTransfer.files].forEach((file) => {
            if (typeValidation(file.type)) {
                uploadFile(file);
            }
        });
    }
};

function typeValidation(type) {
    const validTypes = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    return validTypes.includes(type);
}

function uploadFile(file) {
    listSection.style.display = 'flex';
    listSection.style.flexDirection = 'column';
    listSection.style.flexDirection.alignItems = 'center';
    listSection.style.flexDirection.justifyContent = 'center';
    dropArea.style.display = 'none';
    const li = document.createElement('li');
    li.innerHTML = `<div>${file.name} - Enviando...</div>
                    <div class="file-progress"><span></span></div>`;
    listContainer.appendChild(li);

    const data = new FormData();
    data.append('file', file);
    
    const http = new XMLHttpRequest();
    http.onload = () => {
        const response = JSON.parse(http.responseText);
        if (response.success) {
            li.innerHTML = `<div>${file.name} - Enviado!</div>`;
            sessionStorage.setItem('pdfUrl', response.pdfUrl);
            viewBtn.style.display = 'block'; // Mostra o botão de visualização
        } else {
            li.innerHTML = `<div>${file.name} - Erro ao enviar.</div>`;
        }
    };
    
    http.upload.onprogress = (e) => {
        if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            li.querySelector('.file-progress span').style.width = `${percentComplete}%`;
        }
    };

    http.onerror = () => {
        li.innerHTML = `<div>${file.name} - Erro de conexão.</div>`;
    };

    http.open('POST', '/convert', true);
    http.send(data);
}

viewBtn.onclick = () => {
    window.location.href = 'view.html'; // Redireciona para a página de visualização
};

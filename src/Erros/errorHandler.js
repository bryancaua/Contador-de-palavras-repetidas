function errorHandle (error) {
    if (error.code === 'ENOENT') {
        return 'Arquivo não encontrado';
    } else {
        return 'Erro na aplicação';
    }
}

module.exports = errorHandle;
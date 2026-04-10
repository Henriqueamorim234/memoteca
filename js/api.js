const urlBase = 'http://localhost:3000';

const api = {
    async buscarPensamento() {
        try {
            const response = await fetch(`${urlBase}/pensamentos`);
            return await response.json();
        }
        catch (error) {
            alert('Erro ao buscar pensamentos');
            throw error;
        }
    },

    async salvarPensamentos(pensamento){
        try {
            const response = await fetch(`${urlBase}/pensamentos`, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(pensamento)
            });
            return await response.json();

        }
        catch (error) {
            alert('Erro ao salvar pensamento');
            throw error;
        }
    },
    
    async buscarUmPensamento(id) {
    try {
        const response = await fetch(`${urlBase}/pensamentos/${id}`);
        return await response.json();

    }
    catch (error) {
        alert('Erro ao buscar pensamento');
        throw error;
    }
    },

async editarPensamentos(pensamento){
        try {
            const response = await fetch(`${urlBase}/pensamentos/${pensamento.id}`, {
                method: "PUT", 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(pensamento)
            });
            return await response.json();

        }
        catch (error) {
            alert('Erro ao editar pensamento');
            throw error;
        }
    },
    
async excluirPensamentos(id){
        try {
            const response = await fetch(`${urlBase}/pensamentos/${id}`, {
                method: "DELETE", 
            });

        }
        catch (error) {
            alert('Erro ao excluir um pensamento');
            throw error;
        }
    },
    
    async buscarPensamentoPorTermo(termo){
        try{
            const pensamentos = await this.buscarPensamento();
            const termoEmMinusculas = termo.toLowerCase();
            const pensamentosFiltratos = pensamentos.filter(pensamentos => {
                return (pensamentos.conteudo.toLowerCase().includes(termoEmMinusculas)) || (pensamentos.autoria.toLowerCase().includes(termoEmMinusculas))
            })
            return pensamentosFiltratos
        } catch (error) {
            alert('Erro ao filtrar pensamentos');
            console.error(error)
        }
    }
}

export default api;
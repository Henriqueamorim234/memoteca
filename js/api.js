const api = {
    async buscarPensamento() {
        try {
            const response = await fetch('http://localhost:3000/pensamentos');
            return await response.json();

        }
        catch (error) {
            alert('Erro ao buscar pensamentos');
            throw error;
        }
    },

    async salvarPensamentos(pensamento){
        try {
            const response = await fetch('http://localhost:3000/pensamentos', {
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
        const response = await fetch(`http://localhost:3000/pensamentos/${id}`);
        return await response.json();

    }
    catch (error) {
        alert('Erro ao buscar pensamento');
        throw error;
    }
    },

async editarPensamentos(pensamento){
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${pensamento.id}`, {
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
            const response = await fetch(`http://localhost:3000/pensamentos/${id}`, {
                method: "DELETE", 
            });

        }
        catch (error) {
            alert('Erro ao excluir um pensamento');
            throw error;
        }
    }        
}

export default api;
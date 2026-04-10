import ui from './ui.js'
import api from './api.js'
const formPensamento = document.getElementById('pensamento-form')

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();
    formPensamento.addEventListener('submit', manipularSubmicaoForm);
    const inputBusca = document.getElementById('campo_busca');

    inputBusca.addEventListener('input', manipularBusca)
})

async function manipularSubmicaoForm(event) {
    event.preventDefault();
    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;
    const pensamento = {
        conteudo: conteudo,
        autoria: autoria
    };

    try{
        if (id){
            await api.editarPensamentos({id, pensamento, autoria});
        } else {
            await api.salvarPensamentos(pensamento);
        }
        ui.renderizarPensamentos();
    }
    catch (error){
        console.error(error)
        alert('Erro ao salvar pensamentos')
    }

}

async function manipularBusca() {
    const termoBusca = document.getElementById('campo_busca').value;
    try {
        const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca);
        ui.renderizarPensamentos(pensamentosFiltrados);
    } catch (error) {
        alert('erro ao realizar busca')
    }
}


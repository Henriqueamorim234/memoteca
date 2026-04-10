import api from './api.js';

const listaPensamentos = document.getElementById('lista-pensamentos');
const btnCancelarPensamento = document.getElementById('botao-cancelar');
const listaVazia = document.getElementById('lista-vazia'); 

const ui = {

    async preencherFormulario(pensamentoId){
        const pensamento = await api.buscarUmPensamento(pensamentoId);
        document.getElementById('pensamento-id').value = pensamento.id;
        document.getElementById('pensamento-autoria').value = pensamento.autoria;
        document.getElementById('pensamento-conteudo').value = pensamento.conteudo;
    },

    async renderizarPensamentos(){
        try{
            listaPensamentos.innerHTML = '';
            const pensamentos = await api.buscarPensamento();
            if (pensamentos.length === 0){
                listaVazia.style.display = 'block'
            } else {
                listaVazia.style.display = 'none'
                pensamentos.forEach(ui.adicionarPensamentoNalista);
            }
        }
        catch (error){
            console.error(error)
            alert('erro ao carregar a pagina')
        }
    },

    adicionarPensamentoNalista(pensamento) {
    const liPensamento = document.createElement('li');
    liPensamento.setAttribute('data-id', pensamento.id);
    liPensamento.classList.add('li-pensamento');

    const iconeAspas = document.createElement('img');
    iconeAspas.src = 'assets/imagens/aspas-azuis.png';
    iconeAspas.alt = 'aspas-azuis';
    iconeAspas.classList.add('icone-aspas');

    const divConteudo = document.createElement('div');
    divConteudo.textContent = pensamento.conteudo;
    divConteudo.classList.add('pensamento-conteudo');

    const divAutoria = document.createElement('div');
    divAutoria.textContent = pensamento.autoria;
    divAutoria.classList.add('pensamento-autoria');

    const botaoEditar = document.createElement('button');
    botaoEditar.classList.add('botao-editar');
    botaoEditar.onclick = ()=> ui.preencherFormulario(pensamento.id);

    const iconeEditar = document.createElement('img');
    iconeEditar.src = 'assets/imagens/icone-editar.png';
    iconeEditar.alt = 'Editar'
    botaoEditar.appendChild(iconeEditar);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.classList.add('botao-excluir');
    botaoExcluir.onclick = async () => {
        try{
            await api.excluirPensamentos(pensamento.id);
                ui.renderizarPensamentos()
        } catch (error){
            alert('Erro ao excluir pensamento');
            console.error(error);
        }
    }

    const iconeExcluir = document.createElement('img');
    iconeExcluir.src = 'assets/imagens/icone-excluir.png';
    iconeExcluir.alt = 'Excluir';
    botaoExcluir.appendChild(iconeExcluir)

    const icones = document.createElement('div');
    icones.classList.add('icones');

    icones.appendChild(botaoEditar);
    icones.appendChild(botaoExcluir);

    liPensamento.appendChild(iconeAspas);
    liPensamento.appendChild(divConteudo);
    liPensamento.appendChild(divAutoria);
    liPensamento.appendChild(icones)
    
    listaPensamentos.appendChild(liPensamento);
},
}

btnCancelarPensamento.addEventListener('click', cancelarPensamento)

function cancelarPensamento(){
    document.getElementById('pensamento-form').reset();
}

export default ui;


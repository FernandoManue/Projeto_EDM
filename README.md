# Protótipo académico — Website EDM

Este projecto é um protótipo independente para o trabalho de campo de Tecnologias Web da UnISCED: **Redesenho de Websites de Empresas Nacionais**. A empresa seleccionada é a Electricidade de Moçambique (EDM).

> **Aviso:** não é um website oficial da EDM, não recolhe pedidos reais, não processa pagamentos e não está ligado aos sistemas internos da empresa. Os links de consulta encaminham para páginas oficiais da EDM. O catálogo e as operações de adicionar/remover são apenas locais, no navegador, através de `localStorage`.

## Ficheiros
- `index.html` — estrutura semântica e conteúdo.
- `style.css` — identidade visual, layout responsivo, acessibilidade e media queries.
- `script.js` — catálogo, pesquisa, filtros, ordenação, adição/remoção e persistência local.

## Como executar
1. Extraia a pasta `Projeto_EDM`.
2. Abra `index.html` num navegador actualizado (Chrome, Firefox ou Edge).
3. Para desenvolvimento, recomenda-se abrir a pasta no Visual Studio Code e executar com a extensão Live Server.

## Funcionalidades implementadas
- Navegação por secções e menu adaptável a ecrãs pequenos.
- Catálogo inicial com 12 serviços ilustrativos baseados em categorias e serviços publicamente apresentados pela EDM.
- Pesquisa por nome, categoria ou descrição.
- Filtro por categoria.
- Ordenação alfabética ascendente/descendente e por categoria.
- Adição de registos através do formulário de demonstração.
- Remoção com confirmação.
- Persistência das alterações com `localStorage`.
- Mensagens de estado, rótulos acessíveis, foco de teclado e respeito por `prefers-reduced-motion`.

## Testes manuais recomendados antes da entrega
1. Abrir a página em computador e telemóvel ou modo responsivo do navegador.
2. Pesquisar por “Credelec”, “avaria” e “ligação”.
3. Filtrar pela categoria “Pagamento”.
4. Ordenar por nome A–Z e Z–A.
5. Adicionar um serviço, actualizar a página e confirmar que permanece.
6. Remover um serviço, actualizar a página e confirmar a persistência.
7. Limpar filtros e testar navegação com teclado.
8. Confirmar os links para o portal oficial e o contacto 1455.

## Fontes institucionais de referência
- Portal institucional: https://www.edm.co.mz/
- Portal do Cliente: https://www.edm.co.mz/portal-cliente/inicio
- Manutenção e cortes programados: https://www.edm.co.mz/manutencao

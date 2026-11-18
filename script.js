const STORAGE_KEY = 'edm-prototipo-servicos-v1';
const defaultServices = [
  {id:'nova-residencial',name:'Nova ligação residencial',category:'Ligação',description:'Informação sobre o pedido de ligação de energia eléctrica para habitações.',url:'https://www.edm.co.mz/portal-cliente/inicio',icon:'⌂'},
  {id:'nova-comercial',name:'Nova ligação comercial',category:'Ligação',description:'Orientações para solicitar fornecimento de energia para estabelecimentos comerciais.',url:'https://www.edm.co.mz/portal-cliente/inicio',icon:'▤'},
  {id:'nova-industrial',name:'Nova ligação industrial',category:'Ligação',description:'Informação sobre pedidos de ligação para instalações industriais.',url:'https://www.edm.co.mz/portal-cliente/inicio',icon:'▥'},
  {id:'credelec',name:'Compra de Credelec',category:'Pagamento',description:'Conheça os canais disponíveis para aquisição de energia pré-paga.',url:'https://www.edm.co.mz/portal-cliente/inicio',icon:'ϟ'},
  {id:'facturacao',name:'Facturação e pagamentos',category:'Pagamento',description:'Consulte informações relacionadas com facturas e pagamento de energia.',url:'https://www.edm.co.mz/portal-cliente/inicio',icon:'▧'},
  {id:'avarias',name:'Comunicar avaria',category:'Assistência',description:'Para reportar avarias e solicitar assistência, contacte a linha 1455.',url:'https://www.edm.co.mz/manutencao',icon:'⚡'},
  {id:'manutencao',name:'Cortes e manutenção',category:'Informação',description:'Consulte avisos e informações sobre interrupções programadas.',url:'https://www.edm.co.mz/manutencao',icon:'◷'},
  {id:'titularidade',name:'Mudança de titularidade',category:'Conta',description:'Informação sobre a actualização do titular de um contrato de energia.',url:'https://www.edm.co.mz/portal-cliente/inicio',icon:'♙'},
  {id:'dados',name:'Actualização de dados',category:'Conta',description:'Consulte os procedimentos para actualizar os dados do cliente.',url:'https://www.edm.co.mz/portal-cliente/inicio',icon:'✎'},
  {id:'tarifas',name:'Tarifas de energia',category:'Informação',description:'Consulte informações oficiais sobre tarifas e modalidades de fornecimento.',url:'https://www.edm.co.mz/',icon:'▦'},
  {id:'potencia',name:'Alteração de potência',category:'Ligação',description:'Informação sobre pedidos de alteração da potência contratada.',url:'https://www.edm.co.mz/portal-cliente/inicio',icon:'⌁'},
  {id:'atendimento',name:'Atendimento ao cliente',category:'Assistência',description:'Aceda aos canais de apoio e esclarecimento de dúvidas da EDM.',url:'https://www.edm.co.mz/portal-cliente/inicio',icon:'☏'}
];
let services = loadServices();
const grid = document.getElementById('serviceGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortSelect');
const resultCount = document.getElementById('resultCount');
const emptyState = document.getElementById('emptyState');
const toast = document.getElementById('toast');
let toastTimer;
function loadServices(){try{const saved=localStorage.getItem(STORAGE_KEY);return saved?JSON.parse(saved):[...defaultServices]}catch(error){console.warn('Não foi possível ler o catálogo guardado.',error);return [...defaultServices]}}
function saveServices(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(services))}catch(error){showToast('Não foi possível guardar as alterações neste navegador.')}}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function getFilteredServices(){const term=searchInput.value.trim().toLocaleLowerCase('pt');const category=categoryFilter.value;let result=services.filter(item=>(category==='all'||item.category===category)&&(`${item.name} ${item.category} ${item.description}`).toLocaleLowerCase('pt').includes(term));const sort=sortSelect.value;result.sort((a,b)=>sort==='name-desc'?b.name.localeCompare(a.name,'pt'):sort==='category'?a.category.localeCompare(b.category,'pt')||a.name.localeCompare(b.name,'pt'):a.name.localeCompare(b.name,'pt'));return result}
function renderServices(){const list=getFilteredServices();grid.innerHTML=list.map(item=>`<article class="service-card"><div class="service-top"><span class="service-icon" aria-hidden="true">${escapeHTML(item.icon||'✦')}</span><span class="service-category">${escapeHTML(item.category)}</span></div><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.description)}</p><div class="service-footer"><a href="${escapeHTML(item.url||'https://www.edm.co.mz/')}" target="_blank" rel="noopener">Consultar no portal oficial ↗</a><button class="remove-btn" type="button" data-remove="${escapeHTML(item.id)}" aria-label="Remover ${escapeHTML(item.name)} do catálogo de demonstração" title="Remover do catálogo">−</button></div></article>`).join('');resultCount.textContent=`${list.length} ${list.length===1?'serviço':'serviços'} encontrados`;emptyState.hidden=list.length!==0;grid.hidden=list.length===0}
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
function resetFilters(){searchInput.value='';categoryFilter.value='all';sortSelect.value='name-asc';renderServices()}
[searchInput,categoryFilter,sortSelect].forEach(element=>element.addEventListener(element===searchInput?'input':'change',renderServices));
document.getElementById('resetFilters').addEventListener('click',resetFilters);document.getElementById('emptyReset').addEventListener('click',resetFilters);
grid.addEventListener('click',event=>{const button=event.target.closest('[data-remove]');if(!button)return;const id=button.dataset.remove;const item=services.find(service=>service.id===id);if(!item)return;if(!confirm(`Remover “${item.name}” do catálogo local de demonstração?`))return;services=services.filter(service=>service.id!==id);saveServices();renderServices();showToast('Serviço removido do catálogo local.')});
document.getElementById('serviceForm').addEventListener('submit',event=>{event.preventDefault();const name=document.getElementById('newName').value.trim();const category=document.getElementById('newCategory').value;const description=document.getElementById('newDescription').value.trim();if(!name||!description)return;const id=`custom-${Date.now()}`;services.push({id,name,category,description,url:'https://www.edm.co.mz/portal-cliente/inicio',icon:'✦'});saveServices();event.target.reset();resetFilters();showToast('Novo serviço adicionado ao catálogo local.')});
const menuToggle=document.getElementById('menuToggle');const mainNav=document.getElementById('mainNav');menuToggle.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});mainNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();searchInput.focus()}});
renderServices();

/* ==========================================================================
   ELEIÇÕES VIEW 2026 - REATOR DE SIMULAÇÃO ELEITORAL REFORMULADO (BOTTOM-UP)
   ========================================================================== */

// --- ESTADOS DO BRASIL ---
const STATES = [
    {sigla:'AC', nome:'Acre', id:'12'}, {sigla:'AL', nome:'Alagoas', id:'27'}, {sigla:'AP', nome:'Amapá', id:'16'},
    {sigla:'AM', nome:'Amazonas', id:'13'}, {sigla:'BA', nome:'Bahia', id:'29'}, {sigla:'CE', nome:'Ceará', id:'23'},
    {sigla:'DF', nome:'Distrito Federal', id:'53'}, {sigla:'ES', nome:'Espírito Santo', id:'32'}, {sigla:'GO', nome:'Goiás', id:'52'},
    {sigla:'MA', nome:'Maranhão', id:'21'}, {sigla:'MT', nome:'Mato Grosso', id:'51'}, {sigla:'MS', nome:'Mato Grosso do Sul', id:'50'},
    {sigla:'MG', nome:'Minas Gerais', id:'31'}, {sigla:'PA', nome:'Pará', id:'15'}, {sigla:'PB', nome:'Paraíba', id:'25'},
    {sigla:'PR', nome:'Paraná', id:'41'}, {sigla:'PE', nome:'Pernambuco', id:'26'}, {sigla:'PI', nome:'Piauí', id:'22'},
    {sigla:'RJ', nome:'Rio de Janeiro', id:'33'}, {sigla:'RN', nome:'Rio Grande do Norte', id:'24'}, {sigla:'RS', nome:'Rio Grande do Sul', id:'43'},
    {sigla:'RO', nome:'Rondônia', id:'11'}, {sigla:'RR', nome:'Roraima', id:'14'}, {sigla:'SC', nome:'Santa Catarina', id:'42'},
    {sigla:'SP', nome:'São Paulo', id:'35'}, {sigla:'SE', nome:'Sergipe', id:'28'}, {sigla:'TO', nome:'Tocantins', id:'17'}
];

// --- LISTA COMPLETA DOS CANDIDATOS DE 2022 PARA MATRIZ DE HERANÇA ---
const SOURCES_2022 = [
    { id: 'LULA', name: 'Lula (PT)' },
    { id: 'JAIR', name: 'Jair Bolsonaro (PL)' },
    { id: 'SIMONE', name: 'Simone Tebet (MDB)' },
    { id: 'CIRO', name: 'Ciro Gomes (PDT)' },
    { id: 'SORAYA', name: 'Soraya Thronicke (UNIÃO)' },
    { id: 'FELLIPE', name: 'Felipe d\'Avila (NOVO)' },
    { id: 'KELMON', name: 'Padre Kelmon (PTB)' },
    { id: 'SOFIA', name: 'Sofia Manzano (PCB)' },
    { id: 'PERICLES', name: 'Léo Péricles (UP)' },
    { id: 'VERA', name: 'Vera Lúcia (PSTU)' },
    { id: 'EYMAEL', name: 'Constituinte Eymael (DC)' }
];

// ALIAS PARA TRATAMENTO DE BANCO DE DADOS DA ELEIÇÃO 2022
const CAND_2022_ALIASES = {
    'LULA': ['LULA', '13', 'PT'],
    'JAIR': ['JAIR', 'BOLSONARO', '22', 'PL'],
    'SIMONE': ['SIMONE', 'TEBET', '15', 'MDB'],
    'CIRO': ['CIRO', '12', 'PDT'],
    'SORAYA': ['SORAYA', 'THRONICKE', '44', 'UNIÃO'],
    'FELLIPE': ['FELLIPE', 'DAVILA', '30', 'NOVO'],
    'KELMON': ['KELMON', 'PADRE', '14', 'PTB'],
    'SOFIA': ['SOFIA', 'MANZANO', '21', 'PCB'],
    'PERICLES': ['PERICLES', 'PERICLES', '80', 'UP'],
    'VERA': ['VERA', '16', 'PSTU'],
    'EYMAEL': ['EYMAEL', 'CONSTITUINTE', '27', 'DC']
};

// --- FOTOS DOS CANDIDATOS DE 2026 ---
const LOCAL_PHOTOS = {
    'LULA': 'data/lula.jpg',
    'FLAVIO': 'data/flavio.jpg',
    'RENAN': 'data/renan.jpg',
    'CAIADO': 'data/caiado.jpg',
    'ZEMA': 'data/zema.jpg',
    'AÉCIO': 'data/aecio.jpg',
    'JOAQUIM': 'data/joaquim.jpg',
    'ALDO': 'data/aldo.jpg',
    'DACIOLO': 'data/daciolo.jpg',
    'CURY': 'data/cury.jpg',
    'OUTROS': 'data/outros.jpg'
};

const REMOTE_PHOTOS = {
    'LULA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Lula_-_foto_oficial_05_jan_2023_%28cropped%29.jpg/400px-Lula_-_foto_oficial_05_jan_2023_%28cropped%29.jpg',
    'FLAVIO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Senador_Fl%C3%A1vio_Bolsonaro.jpg/400px-Senador_Fl%C3%A1vio_Bolsonaro.jpg',
    'RENAN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Renan_Santos_em_2021.jpg/400px-Renan_Santos_em_2021.jpg',
    'CAIADO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ronaldo_Caiado_em_2023.jpg/400px-Ronaldo_Caiado_em_2023.jpg',
    'ZEMA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Romeu_Zema_em_2023.jpg/400px-Romeu_Zema_em_2023.jpg',
    'AÉCIO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/A%C3%A9cio_Neves.jpg/400px-A%C3%A9cio_Neves.jpg',
    'JOAQUIM': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Joaquim_Barbosa_13112012.jpg/400px-Joaquim_Barbosa_13112012.jpg',
    'ALDO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Aldo_Rebelo_2015.jpg/400px-Aldo_Rebelo_2015.jpg',
    'DACIOLO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Cabo_Daciolo_em_2018.jpg/400px-Cabo_Daciolo_em_2018.jpg',
    'CURY': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Augusto_Cury_em_2018.jpg/400px-Augusto_Cury_em_2018.jpg',
    'OUTROS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/400px-Portrait_Placeholder.png'
};

// --- LOGOS DOS PARTIDOS POLITICOS ---
const PARTY_LOGOS = {
    'PT': 'data/PT.jpg',
    'PL': 'data/PL.jpg',
    'PSD': 'data/PSD.jpg',
    'MISSÃO': 'data/MISSÃO.jpg',
    'NOVO': 'data/NOVO.jpg',
    'PSDB': 'data/PSDB.jpg',
    'DC': 'data/DC.jpg',
    'MOBILIZA': 'data/MOBILIZA.jpg',
    'AVANTE': 'data/AVANTE.jpg',
    'OUTROS': 'data/OUTROS.jpg'
};

// --- CONFIGURAÇÃO DOS CANDIDATOS E SCHEME DE COR DE 5% EM 5% ---
const CONFIG = {
    candidates: [
        { id: 'LULA', name: 'Lula', party: 'PT', color: '#de0000' },
        { id: 'FLAVIO', name: 'Flávio Bolsonaro', party: 'PL', color: '#3632b6' },
        { id: 'RENAN', name: 'Renan Santos', party: 'MISSÃO', color: '#f6ae08' },
        { id: 'CAIADO', name: 'Ronaldo Caiado', party: 'PSD', color: '#17a7e9' },
        { id: 'ZEMA', name: 'Romeu Zema', party: 'NOVO', color: '#F58220' },
        { id: 'AÉCIO', name: 'Aécio Neves', party: 'PSDB', color: '#4169E1' },
        { id: 'JOAQUIM', name: 'Joaquim Barbosa', party: 'DC', color: '#363bc7' },
        { id: 'ALDO', name: 'Aldo Rebelo', party: 'DC', color: '#E67E22' },
        { id: 'DACIOLO', name: 'Cabo Daciolo', party: 'MOBILIZA', color: '#E74C3C' },
        { id: 'CURY', name: 'Augusto Cury', party: 'AVANTE', color: '#2EBF98' },
        { id: 'OUTROS', name: 'Outros', party: 'OUTROS', color: '#8b5cf6' }
    ],
    scheme: [
        { min: 0,   mix: '#ffffff', ratio: 0.88, ref: '#F5F5F5' },
        { min: 20,  mix: '#ffffff', ratio: 0.82, ref: '#E6E6E6' },
        { min: 25,  mix: '#ffffff', ratio: 0.72, ref: '#D5D5D9' },
        { min: 30,  mix: '#ffffff', ratio: 0.62, ref: '#C4C4C8' },
        { min: 35,  mix: '#ffffff', ratio: 0.52, ref: '#B3B3B7' },
        { min: 40,  mix: '#ffffff', ratio: 0.40, ref: '#A2A2A6' },
        { min: 45,  mix: '#ffffff', ratio: 0.26, ref: '#919195' },
        { min: 50,  mix: '#ffffff', ratio: 0.10, ref: '#808084' },
        { min: 55,  mix: '#000000', ratio: 0.08, ref: '#707074' },
        { min: 60,  mix: '#000000', ratio: 0.20, ref: '#606064' },
        { min: 65,  mix: '#000000', ratio: 0.32, ref: '#505054' },
        { min: 70,  mix: '#000000', ratio: 0.44, ref: '#404044' },
        { min: 75,  mix: '#000000', ratio: 0.56, ref: '#303034' },
        { min: 80,  mix: '#000000', ratio: 0.68, ref: '#222225' },
        { min: 85,  mix: '#000000', ratio: 0.78, ref: '#161618' },
        { min: 90,  mix: '#000000', ratio: 0.86, ref: '#0D0D0E' },
        { min: 95,  mix: '#000000', ratio: 0.92, ref: '#060607' },
        { min: 100, mix: '#000000', ratio: 0.97, ref: '#000000' }
    ]
};

// --- PRESETS DE PESQUISAS RECENTES DE 2026 ---
const PRESETS = {
    atlas_jul26: {
        name: "AtlasIntel (29/Jul/2026)",
        polls: { "LULA": 44.90, "FLAVIO": 35.80, "RENAN": 7.80, "CAIADO": 3.10, "ZEMA": 2.80, "CURY": 1.60, "OUTROS": 4.00, "DACIOLO": 0.00, "AÉCIO": 0.00, "JOAQUIM": 0.00, "ALDO": 0.00 },
        active: { "LULA": true, "FLAVIO": true, "RENAN": true, "CAIADO": true, "ZEMA": true, "CURY": true, "OUTROS": true, "DACIOLO": false, "AÉCIO": false, "JOAQUIM": false, "ALDO": false }
    },
    poderdata_jul26: {
        name: "PoderData (30/Jul/2026)",
        polls: { "LULA": 41.00, "FLAVIO": 35.00, "CAIADO": 5.00, "RENAN": 4.00, "ZEMA": 3.00, "CURY": 3.00, "OUTROS": 9.00, "AÉCIO": 0.00, "JOAQUIM": 0.00 },
        active: { "LULA": true, "FLAVIO": true, "CAIADO": true, "RENAN": true, "ZEMA": true, "CURY": true, "OUTROS": true, "AÉCIO": false, "JOAQUIM": false }
    },
    vox_jul26: {
        name: "Vox Brasil / CNN (31/Jul/2026)",
        polls: { "LULA": 43.50, "FLAVIO": 37.80, "CAIADO": 6.00, "ZEMA": 4.50, "RENAN": 3.50, "CURY": 1.50, "OUTROS": 3.20 },
        active: { "LULA": true, "FLAVIO": true, "CAIADO": true, "ZEMA": true, "RENAN": true, "CURY": true, "OUTROS": true }
    },
    quaest_jul26: {
        name: "Genial/Quaest (Julho/2026)",
        polls: { "LULA": 40.00, "FLAVIO": 34.00, "CAIADO": 5.00, "RENAN": 4.00, "ZEMA": 4.00, "CURY": 2.00, "OUTROS": 11.00 },
        active: { "LULA": true, "FLAVIO": true, "CAIADO": true, "RENAN": true, "ZEMA": true, "CURY": true, "OUTROS": true }
    },
    futura_jul26: {
        name: "Futura/Apex (Julho/2026)",
        polls: { "LULA": 40.10, "FLAVIO": 36.80, "CAIADO": 5.20, "RENAN": 4.10, "ZEMA": 3.80, "CURY": 1.90, "OUTROS": 8.10 },
        active: { "LULA": true, "FLAVIO": true, "CAIADO": true, "RENAN": true, "ZEMA": true, "CURY": true, "OUTROS": true }
    },
    direita_unida: {
        name: "Cenário: Direita Unificada (Flávio)",
        polls: { "LULA": 43.00, "FLAVIO": 49.00, "RENAN": 3.50, "CAIADO": 3.00, "ZEMA": 0.00, "OUTROS": 1.50 },
        active: { "LULA": true, "FLAVIO": true, "RENAN": true, "CAIADO": true, "ZEMA": false, "OUTROS": true }
    },
    terceira_via: {
        name: "Cenário: Terceira Via Forte (Caiado)",
        polls: { "LULA": 36.00, "FLAVIO": 32.00, "CAIADO": 18.00, "ZEMA": 6.00, "RENAN": 4.00, "OUTROS": 4.00 },
        active: { "LULA": true, "FLAVIO": true, "CAIADO": true, "ZEMA": true, "RENAN": true, "OUTROS": true }
    }
};

// --- MODELO DEFAULT BASEADO EM DADOS REAIS DE HERANÇA ---
const DEFAULT_SCENARIO = {
  "t1_polls": {
    "LULA": 45.82,
    "FLAVIO": 36.53,
    "RENAN": 7.96,
    "CAIADO": 3.16,
    "ZEMA": 2.86,
    "ALDO": 0,
    "CURY": 1.63,
    "JOAQUIM": 0,
    "AÉCIO": 0,
    "OUTROS": 2.04,
    "DACIOLO": 0
  },
  "t1_matrix": {
    "LULA": { "LULA": 0.88, "FLAVIO": 0.01, "RENAN": 0.06, "CAIADO": 0.01, "ZEMA": 0.01, "CURY": 0.01, "OUTROS": 0.02 },
    "JAIR": { "LULA": 0.01, "FLAVIO": 0.82, "RENAN": 0.09, "CAIADO": 0.04, "ZEMA": 0.03, "CURY": 0.005, "OUTROS": 0.005 },
    "SIMONE": { "LULA": 0.38, "FLAVIO": 0.28, "RENAN": 0.16, "CAIADO": 0.10, "ZEMA": 0.05, "CURY": 0.02, "OUTROS": 0.01 },
    "CIRO": { "LULA": 0.35, "FLAVIO": 0.12, "RENAN": 0.25, "CAIADO": 0.10, "ZEMA": 0.05, "CURY": 0.03, "OUTROS": 0.10 },
    "SORAYA": { "LULA": 0.12, "FLAVIO": 0.40, "RENAN": 0.18, "CAIADO": 0.22, "ZEMA": 0.05, "CURY": 0.01, "OUTROS": 0.02 },
    "FELLIPE": { "LULA": 0.02, "FLAVIO": 0.18, "RENAN": 0.10, "CAIADO": 0.03, "ZEMA": 0.65, "CURY": 0.01, "OUTROS": 0.01 },
    "KELMON": { "LULA": 0.00, "FLAVIO": 0.85, "RENAN": 0.03, "CAIADO": 0.02, "ZEMA": 0.02, "DACIOLO": 0.08 },
    "SOFIA": { "LULA": 0.82, "FLAVIO": 0.00, "RENAN": 0.03, "OUTROS": 0.15 },
    "PERICLES": { "LULA": 0.85, "FLAVIO": 0.00, "RENAN": 0.03, "OUTROS": 0.12 },
    "VERA": { "LULA": 0.78, "FLAVIO": 0.00, "RENAN": 0.03, "OUTROS": 0.19 },
    "EYMAEL": { "LULA": 0.05, "FLAVIO": 0.45, "RENAN": 0.05, "CAIADO": 0.25, "ZEMA": 0.05, "CURY": 0.05, "OUTROS": 0.10 }
  },
  "t1_matrix_state": {},
  "t1_mults": {},
  "t1_state_polls": {},
  "t1_state_abstention": {},
  "t1_state_nulls": {},
  "t1_mun_polls": {},
  "t1_mun_abstention": {},
  "t1_mun_nulls": {},
  "t1_mun_mults": {},
  "t2_migr": { "RENAN": 0.65, "CAIADO": 0.85, "ZEMA": 0.88, "CURY": 0.50, "AÉCIO": 0.60, "JOAQUIM": 0.55, "ALDO": 0.60, "DACIOLO": 0.78, "OUTROS": 0.50 },
  "t2_mults": {},
  "active_candidates": { "LULA": true, "FLAVIO": true, "RENAN": true, "CAIADO": true, "ZEMA": true, "CURY": true, "OUTROS": true, "AÉCIO": false, "JOAQUIM": false, "ALDO": false, "DACIOLO": false },
  "abstention": 20.50,
  "null_votes": 5.80,
  "t2_mode": "organic"
};

// --- CONTROLADOR DA APLICAÇÃO ---
const app = {
    map: null,
    layers: { brazil: null, cities: null, zones: null },
    data: { base22: null, round1: null, round2: null, geoJson: null, names: {}, brazilGeoJson: null, zonasGeoJson: null },
    state: { 
        turn: 1, 
        view: 'states', 
        selectedId: null, 
        selectedName: "Brasil", 
        selectedScope: null, 
        activeCityId: null, 
        t1_polls: {}, 
        t1_matrix: {}, 
        t1_matrix_state: {}, 
        t1_mults: {}, 
        t1_state_polls: {},
        t1_state_abstention: {},
        t1_state_nulls: {},
        t1_mun_polls: {},
        t1_mun_abstention: {},
        t1_mun_nulls: {},
        t1_mun_mults: {},
        t2_finalists: [], 
        t2_polls: {}, 
        t2_migr: {}, 
        t2_mults: {}, 
        active_candidates: {}, 
        abstention: 20.50,
        null_votes: 5.80,
        t2_mode: 'organic' 
    },

    init: async () => {
        app.initTheme();
        
        // LEAFLET MAPA COM CANVAS RENDERER PARA ALTO DESEMPENHO E SEM LAG
        app.map = L.map('map', { 
            center: [-15, -50], 
            zoom: 4, 
            zoomControl: false, 
            preferCanvas: true,
            renderer: L.canvas({ tolerance: 0, padding: 0.5 })
        });
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { opacity: 0.4 }).addTo(app.map);
        
        app.loadScenario(DEFAULT_SCENARIO);

        // VERIFICA SE HÁ CENÁRIO COMPARTILHADO VIA URL
        if (window.location.hash.includes('scenario=')) {
            try {
                const raw = window.location.hash.split('scenario=')[1];
                const decoded = JSON.parse(decodeURIComponent(atob(raw)));
                app.loadScenario(decoded);
            } catch(e) { console.warn("Erro ao carregar cenário da URL", e); }
        }

        app.renderLegend();
        app.renderUI();
        await app.loadData();
       
        app.showNewVersionPopup();
    },

    // FALLBACK DE IMAGENS LOCAL -> REMOTA -> VETOR DE INICIAIS
    handleImgFallback: (img, candId) => {
        if (!img.dataset.triedRemote) {
            img.dataset.triedRemote = 'true';
            img.src = REMOTE_PHOTOS[candId] || app.getAvatarSvg(candId);
        } else {
            img.src = app.getAvatarSvg(candId);
        }
    },

    getPartyLogoHtml: (party) => {
        const logoUrl = PARTY_LOGOS[party];
        if (logoUrl) {
            return `<img src="${logoUrl}" class="party-badge-img" onerror="this.outerHTML='<span class=\\'cand-party-tag\\'>${party}</span>'">`;
        }
        return `<span class="cand-party-tag">${party}</span>`;
    },

    getAvatarSvg: (id) => {
        const cand = CONFIG.candidates.find(c => c.id === id);
        const color = cand ? cand.color : '#3b82f6';
        const name = cand ? cand.name : id;
        const initials = name.substring(0, 2).toUpperCase();
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="${color}"/>
            <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="42">${initials}</text>
        </svg>`;
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    },

    initTheme: () => {
        const savedTheme = localStorage.getItem('eleicoes-view-theme') || 'dark';
        if (savedTheme === 'light') document.body.classList.add('light-theme');
        app.updateThemeUI(savedTheme);
    },
    toggleTheme: () => {
        const isLight = document.body.classList.contains('light-theme');
        if (isLight) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('eleicoes-view-theme', 'dark');
            app.updateThemeUI('dark');
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('eleicoes-view-theme', 'light');
            app.updateThemeUI('light');
        }
    },
    updateThemeUI: (theme) => {
        const icon = document.getElementById('themeIcon');
        const text = document.getElementById('themeText');
        if (icon && text) {
            icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
            text.innerText = theme === 'light' ? 'Claro' : 'Escuro';
        }
    },

    mobileNav: (tab) => {
        const left = document.getElementById('sidebarConfig'), right = document.getElementById('sidebarResults'), items = document.querySelectorAll('.nav-item');
        items.forEach(i => i.classList.remove('active'));
        document.getElementById('nav' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
        if(tab === 'map') { left.classList.remove('active'); right.classList.remove('active'); } 
        else if(tab === 'config') { left.classList.add('active'); right.classList.remove('active'); } 
        else if(tab === 'results') { right.classList.add('active'); left.classList.remove('active'); }
    },

    resetToClean: () => {
        if(confirm("Deseja resetar todas as configurações para o padrão do modelo 2026?")) {
            app.loadScenario(DEFAULT_SCENARIO);
            app.renderUI();
            app.runSimulation();
        }
    },
    loadScenario: (config) => {
        ['t1_polls','t1_matrix','t1_matrix_state','t1_mults','t1_state_polls','t1_state_abstention','t1_state_nulls','t1_mun_polls','t1_mun_abstention','t1_mun_nulls','t1_mun_mults','t2_migr','t2_mults','active_candidates'].forEach(k => {
            if(config[k]) app.state[k] = JSON.parse(JSON.stringify(config[k]));
        });
        if(config.abstention !== undefined) app.state.abstention = config.abstention;
        if(config.null_votes !== undefined) app.state.null_votes = config.null_votes;
        if(config.t2_mode) {
            app.state.t2_mode = config.t2_mode;
            if(document.getElementById('t2ModeSwitch')) document.getElementById('t2ModeSwitch').checked = (config.t2_mode === 'organic');
        }
    },

    loadData: async () => {
        const loader = document.getElementById('loader');
        try { 
            const res = await fetch('data/2022_president.json'); const json = await res.json(); 
            app.data.base22 = json['1']; app.data.names = json['1'].meta_nomes || {}; 
            try { 
                const zRes = await fetch('data/mapazn.geojson'); 
                if (zRes.ok) { 
                    app.data.zonasGeoJson = await zRes.json(); 
                    app.processZonasGeoJson(); 
                } 
            } catch(ez) { console.warn("Zonas eleitorais não encontradas."); }
            await app.loadBrazilLayer(); app.runSimulation(); 
        } catch(e) { console.error(e); alert("Carregando base eleitoral padrão."); } finally { loader.classList.add('hidden'); }
    },

    exportConfig: () => {
        const config = { 
            t1_polls: app.state.t1_polls, 
            t1_matrix: app.state.t1_matrix, 
            t1_matrix_state: app.state.t1_matrix_state, 
            t1_mults: app.state.t1_mults, 
            t1_state_polls: app.state.t1_state_polls,
            t1_state_abstention: app.state.t1_state_abstention,
            t1_state_nulls: app.state.t1_state_nulls,
            t1_mun_polls: app.state.t1_mun_polls,
            t1_mun_abstention: app.state.t1_mun_abstention,
            t1_mun_nulls: app.state.t1_mun_nulls,
            t1_mun_mults: app.state.t1_mun_mults,
            t2_migr: app.state.t2_migr, 
            t2_mults: app.state.t2_mults, 
            active_candidates: app.state.active_candidates, 
            abstention: app.state.abstention,
            null_votes: app.state.null_votes,
            t2_mode: app.state.t2_mode 
        };
        saveAs(new Blob([JSON.stringify(config, null, 2)], {type: "application/json;charset=utf-8"}), "eleicoes_2026_config.json");
    },
    importConfig: (input) => {
        const file = input.files[0]; if(!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                app.loadScenario(JSON.parse(e.target.result));
                app.renderUI();
                app.runSimulation();
                alert("Configuração importada com sucesso!");
            } catch(err) { alert("Erro ao importar arquivo JSON: " + err.message); }
        };
        reader.readAsText(file); input.value = '';
    },
    
    processZonasGeoJson: () => {
        app.data.base22.zonas = {};
        app.data.zonasGeoJson.features.forEach(f => {
            const p = f.properties; const id = String(p.CD_MUN_I) + '_' + String(p.ZE_NUM);
            app.data.base22.zonas[id] = { LULA: p.PS22_113 || 0, JAIR: p.PS22_122 || 0, CIRO: p.PS22_112 || 0, SIMONE: p.PS22_115 || 0 };
        });
    },

    setTurn: (t) => {
        app.state.turn = t;
        document.getElementById('tab1').className = `mode-tab ${t===1?'active':''}`;
        document.getElementById('tab2').className = `mode-tab ${t===2?'active':''}`;
        document.getElementById('controlsT1').style.display = t===1?'flex':'none';
        document.getElementById('controlsT2').style.display = t===2?'flex':'none';
        
        if(t === 2 && app.state.t2_finalists.length === 0 && app.data.round1) {
            const sorted = Object.entries(app.data.round1.nacional).sort((a,b)=>b[1]-a[1]);
            if(sorted.length >= 2) { app.state.t2_finalists = [sorted[0][0], sorted[1][0]]; app.updateT2UI(); }
        }
        app.runSimulation();
    },

    toggleT2Mode: (isOrganic) => {
        app.state.t2_mode = isOrganic ? 'organic' : 'manual';
        document.getElementById('lblT2Votes').innerText = isOrganic ? "Resultado Projetado (Orgânico)" : "Resultado Alvo (Manual)";
        app.updateT2UI(); app.runSimulation();
    },

    handleViewChange: async () => {
        app.state.view = document.getElementById('viewModeSelect').value;
        if(app.state.view === 'all_cities') await app.loadAllMunicipalities();
        else app.resetSelection();
    },
    
    getFeatureId: (feature, scope) => {
        const p = feature.properties;
        if (scope === 'zonas') return String(p.CD_MUN_I) + '_' + String(p.ZE_NUM);
        if (scope === 'municipios') return String(p.CD_MUN || p.id || p.geocodigo || p.CD_MUN_I || '');
        return String(p.CD_UF || (STATES.find(x => x.sigla === p.sigla)||{}).id || p.id || '');
    },

    // PRESERVAÇÃO TOTAL DO DRILLDOWN DO MAPA (ZOOM EM MUNICÍPIOS AO CLICAR EM ESTADOS)
    loadBrazilLayer: async () => {
        if(app.layers.brazil) {
            if(!app.map.hasLayer(app.layers.brazil)) app.layers.brazil.addTo(app.map);
            app.layers.brazil.setStyle((f) => app.getStyle(f, 'estados')); return;
        }
        const res = await fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson');
        app.data.brazilGeoJson = await res.json();
        app.layers.brazil = L.geoJSON(app.data.brazilGeoJson, {
            style: (f) => app.getStyle(f, 'estados'),
            smoothFactor: 0,
            onEachFeature: (f, l) => {
                l.on('click', () => {
                    const ufId = app.getFeatureId(f, 'estados');
                    const ufName = f.properties.NM_UF || f.properties.name;
                    if(app.state.view === 'states') {
                        app.loadStateCities(ufId, ufName);
                    } else {
                        app.selectRegion(ufId, ufName, 'estados');
                    }
                });
                app.bindTooltip(l, 'estados');
            }
        }).addTo(app.map);
    },
    
    loadAllMunicipalities: async () => {
        const loader = document.getElementById('loader'); loader.classList.remove('hidden');
        if(app.layers.brazil && app.map.hasLayer(app.layers.brazil)) app.map.removeLayer(app.layers.brazil);
        if(app.layers.zones) { app.map.removeLayer(app.layers.zones); app.layers.zones = null; }
        if(app.layers.cities) app.map.removeLayer(app.layers.cities); app.layers.cities = null;

        if(!app.data.geoJson) {
            const r = await fetch("https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-100-mun.json");
            app.data.geoJson = await r.json();
        }
        app.layers.cities = L.geoJSON(app.data.geoJson, {
            style: (f) => app.getStyle(f, 'municipios'),
            smoothFactor: 0,
            onEachFeature: (f, l) => {
                l.on('click', (e) => {
                    L.DomEvent.stopPropagation(e);
                    const cityId = app.getFeatureId(f, 'municipios');
                    const cityName = f.properties.NM_MUN||f.properties.name;
                    if (app.data.zonasGeoJson && app.data.zonasGeoJson.features.some(zf => String(zf.properties.CD_MUN_I) === cityId)) {
                        app.loadCityZones(cityId, cityName); return;
                    }
                    app.selectRegion(cityId, cityName, 'municipios');
                });
                app.bindTooltip(l, 'municipios');
            }
        }).addTo(app.map);
        if (app.layers.cities.getBounds().isValid()) app.map.fitBounds(app.layers.cities.getBounds());
        loader.classList.add('hidden');
    },
    
    loadStateCities: async (ufId, ufName) => {
        if(app.state.view === 'all_cities') return;
        const loader = document.getElementById('loader'); loader.classList.remove('hidden');
        document.getElementById('loaderMsg').innerText = `Carregando ${ufName}...`;
        if(app.layers.zones) { app.map.removeLayer(app.layers.zones); app.layers.zones = null; }
        if(app.layers.cities) { app.map.removeLayer(app.layers.cities); app.layers.cities = null; }
        if(app.layers.brazil) app.map.removeLayer(app.layers.brazil);

        if(!app.data.geoJson) {
            const r = await fetch("https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-100-mun.json");
            app.data.geoJson = await r.json();
        }
        const feats = app.data.geoJson.features.filter(f => app.getFeatureId(f, 'municipios').startsWith(ufId));
        app.layers.cities = L.geoJSON({ type:"FeatureCollection", features:feats }, {
            style: (f) => app.getStyle(f, 'municipios'),
            smoothFactor: 0,
            onEachFeature: (f, l) => {
                l.on('click', (e) => {
                    L.DomEvent.stopPropagation(e);
                    const cityId = app.getFeatureId(f, 'municipios');
                    const cityName = f.properties.NM_MUN||f.properties.name;
                    if (app.data.zonasGeoJson && app.data.zonasGeoJson.features.some(zf => String(zf.properties.CD_MUN_I) === cityId)) {
                        app.loadCityZones(cityId, cityName); return;
                    }
                    app.selectRegion(cityId, cityName, 'municipios');
                });
                app.bindTooltip(l, 'municipios');
            }
        }).addTo(app.map);
        if (app.layers.cities.getBounds().isValid()) app.map.fitBounds(app.layers.cities.getBounds());
        app.selectRegion(ufId, ufName, 'estados'); loader.classList.add('hidden');
    },
    
    loadCityZones: (cityId, cityName) => {
        const loader = document.getElementById('loader'); loader.classList.remove('hidden');
        document.getElementById('loaderMsg').innerText = `Carregando Zonas de ${cityName}...`;
        if(app.layers.cities) { app.map.removeLayer(app.layers.cities); app.layers.cities = null; }
        if(app.layers.zones) { app.map.removeLayer(app.layers.zones); app.layers.zones = null; }
        if(app.layers.brazil) app.map.removeLayer(app.layers.brazil);

        const feats = app.data.zonasGeoJson.features.filter(f => String(f.properties.CD_MUN_I) === cityId);
        app.layers.zones = L.geoJSON({ type: "FeatureCollection", features: feats }, {
            style: (f) => app.getStyle(f, 'zonas'),
            smoothFactor: 0,
            onEachFeature: (f, l) => {
                l.on('click', (e) => {
                    L.DomEvent.stopPropagation(e);
                    const zoneId = app.getFeatureId(f, 'zonas');
                    const zName = `Zona ${f.properties.ZE_NUM} - ${cityName}`;
                    app.selectRegion(zoneId, zName, 'zonas');
                });
                app.bindTooltip(l, 'zonas');
            }
        }).addTo(app.map);
        if (app.layers.zones.getBounds().isValid()) app.map.fitBounds(app.layers.zones.getBounds());
        app.selectRegion(cityId, cityName, 'municipios'); app.state.activeCityId = cityId; loader.classList.add('hidden');
    },

    goBack: () => {
        if (app.layers.zones) {
            const ufId = app.state.activeCityId.substring(0,2);
            const ufName = (STATES.find(s=>s.id === ufId)||{}).nome || "Estado";
            app.map.removeLayer(app.layers.zones); app.layers.zones = null;
            app.loadStateCities(ufId, ufName);
        } else app.resetSelection();
    },

    resetSelection: () => {
        app.state.selectedId = null; app.state.selectedName = "Brasil"; app.state.selectedScope = null; app.state.activeCityId = null;
        document.getElementById('btnBack').style.display = 'none';
        if (app.layers.zones) { app.map.removeLayer(app.layers.zones); app.layers.zones = null; }
        if (app.layers.cities) { app.map.removeLayer(app.layers.cities); app.layers.cities = null; }
        if (app.layers.brazil) {
            if (!app.map.hasLayer(app.layers.brazil)) app.layers.brazil.addTo(app.map);
            app.layers.brazil.setStyle((f) => app.getStyle(f, 'estados'));
        } else app.loadBrazilLayer();
        app.map.setView([-15, -50], 4);
        document.getElementById('viewModeSelect').value = 'states'; app.state.view = 'states';
        if(window.innerWidth <= 768) app.mobileNav('config');
        app.updateSidebarRight();
    },
    
    // ESTILO DE FRONTEIRA POLIGONAL DE ALTA PRECISÃO
    getStyle: (feature, scope) => {
        const id = app.getFeatureId(feature, scope);
        return { 
            fillColor: app.getColorForId(id, scope).fill, 
            weight: scope === 'estados' ? 1.2 : 0.35, 
            color: '#ffffff', 
            opacity: 0.9, 
            fillOpacity: 0.95 
        };
    },
    getColorForId: (id, scope) => {
        if (!id) return { fill: '#333' };
        const dataset = app.state.turn === 1 ? app.data.round1 : app.data.round2; if(!dataset) return { fill: '#333' };
        let votes;
        if (scope === 'zonas') votes = dataset.zonas ? dataset.zonas[id] : null;
        else if (id.length === 2 && scope === 'estados') votes = dataset.estados[id];
        else votes = dataset.municipios[id];
        if(!votes) return { fill: '#333' };

        let max = -1, winner = null, total = 0;
        for(let c in votes) { total += votes[c]; if(votes[c] > max) { max = votes[c]; winner = c; } }
        const cand = CONFIG.candidates.find(c => c.id === winner);
        return { fill: app.getDiscreteColor(cand ? cand.color : '#555', total > 0 ? (max/total)*100 : 0) };
    },
    
    generateStaticMap: async (format) => {
        const loader = document.getElementById('loader'); loader.classList.remove('hidden');
        setTimeout(() => {
            try {
                let features = []; let scope = 'municipios';
                if (app.layers.zones && app.state.activeCityId) {
                    features = app.data.zonasGeoJson.features.filter(f => String(f.properties.CD_MUN_I) === app.state.activeCityId); scope = 'zonas';
                } else if (app.state.view === 'states' && !app.state.selectedId) {
                    features = app.data.brazilGeoJson.features; scope = 'estados';
                } else if (app.state.selectedId && app.state.selectedId.length === 2) {
                    features = app.data.geoJson.features.filter(f => app.getFeatureId(f, 'municipios').startsWith(app.state.selectedId)); scope = 'municipios';
                } else {
                    features = app.data.brazilGeoJson.features; scope = 'estados';
                }
                if (features.length === 0) throw new Error("Nenhum dado encontrado.");

                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                features.forEach(f => { const scan = (coords) => { coords.forEach(pt => { if(typeof pt[0]==='number'){ if(pt[0]<minX)minX=pt[0]; if(pt[0]>maxX)maxX=pt[0]; if(pt[1]<minY)minY=pt[1]; if(pt[1]>maxY)maxY=pt[1]; } else scan(pt); }); }; if(f.geometry && f.geometry.type.includes('Polygon')) scan(f.geometry.coordinates); });
                const w = 3840, latD = maxY - minY, lonD = maxX - minX, h = w / (lonD/latD); const proj = (x,y) =>[(x-minX)*(w/lonD), (maxY-y)*(h/latD)];
                let svg = '';
                features.forEach(f => { const id = app.getFeatureId(f, scope); const col = app.getColorForId(id, scope).fill; let d = ''; const draw = (r) => { let p=''; r.forEach((pt,i)=>{ const[px,py]=proj(pt[0],pt[1]); p+=(i===0?'M':'L')+px.toFixed(1)+','+py.toFixed(1); }); return p+'Z '; }; if(f.geometry.type==='Polygon') f.geometry.coordinates.forEach(r=>d+=draw(r)); else if(f.geometry.type==='MultiPolygon') f.geometry.coordinates.forEach(p=>p.forEach(r=>d+=draw(r))); svg+=`<path d="${d}" fill="${col}" stroke="#fff" stroke-width="${scope==='estados'? 2 : 0.5}"/>`; });
                const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${svg}</svg>`;
                const fname = `mapa_eleicoes_${app.state.selectedName}`;
                if(format==='svg') saveAs(new Blob([finalSvg],{type:"image/svg+xml;charset=utf-8"}), `${fname}.svg`);
                else {
                    const img = new Image();
                    img.onload = () => { const c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(img,0,0); c.toBlob(b=>saveAs(b,`${fname}.png`)); };
                    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(finalSvg)));
                }
            } catch(e) { alert("Erro ao gerar mapa: " + e.message); } loader.classList.add('hidden');
        }, 100);
    },

    getDiscreteColor: (hex, pct) => {
        let config = CONFIG.scheme[0];
        for (let i = 0; i < CONFIG.scheme.length; i++) if (pct >= CONFIG.scheme[i].min) config = CONFIG.scheme[i];
        return app.mixColor(hex, config.mix, config.ratio);
    },
    mixColor: (hex1, hex2, amount) => {
        const c1 = app.hexToRgb(hex1), c2 = app.hexToRgb(hex2);
        return `rgb(${Math.round(c1.r + (c2.r - c1.r) * amount)}, ${Math.round(c1.g + (c2.g - c1.g) * amount)}, ${Math.round(c1.b + (c2.b - c1.b) * amount)})`;
    },
    hexToRgb: (hex) => {
        let c = hex.substring(1).split('');
        if(c.length==3) c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        c = '0x'+c.join('');
        return { r: (c>>16)&255, g: (c>>8)&255, b: c&255 };
    },

    bindTooltip: (l, s) => {
        l.bindTooltip(() => {
            const id = app.getFeatureId(l.feature, s);
            const dataset = app.state.turn === 1 ? app.data.round1 : app.data.round2; if(!dataset) return "Sem dados";
            let votes;
            if (s === 'zonas') votes = dataset.zonas ? dataset.zonas[id] : null;
            else if (id.length===2 && s==='estados') votes = dataset.estados[id];
            else votes = dataset.municipios[id];
            if(!votes) return `Sem dados`;

            const sorted = Object.entries(votes).sort((a,b)=>b[1]-a[1]);
            const winnerCand = CONFIG.candidates.find(c=>c.id===sorted[0][0]);
            let title = l.feature.properties.NM_MUN || l.feature.properties.NM_UF || l.feature.properties.name;
            if (s === 'zonas') title = `Zona ${l.feature.properties.ZE_NUM} - ${l.feature.properties.MUN_NOME}`;
            const pct = (sorted[0][1] / (sorted.reduce((a,b)=>a+b[1],0)||1)) * 100;
            const photoUrl = LOCAL_PHOTOS[winnerCand.id];

            return `
                <div class="custom-tooltip">
                    <div class="tt-head">${title}</div>
                    <div class="tt-body">
                        <img src="${photoUrl}" style="width: 28px; height: 28px; border-radius: 50%; border: 2px solid ${winnerCand.color}" onerror="app.handleImgFallback(this, '${winnerCand.id}')">
                        <div>
                            <div style="color:${winnerCand.color}; font-weight:800">${winnerCand.name}</div>
                            <div style="font-weight:900;">${pct.toFixed(2)}% dos votos válidos</div>
                            <div style="font-size:0.65rem; color:var(--accent-blue); margin-top:2px;"><i class="fas fa-mouse-pointer"></i> Clique para ver município/região</div>
                        </div>
                    </div>
                </div>
            `;
        }, { sticky: true });
    },

    refreshMap: () => {
        if(app.layers.brazil) app.layers.brazil.setStyle((f) => app.getStyle(f, 'estados'));
        if(app.layers.cities) app.layers.cities.setStyle((f) => app.getStyle(f, 'municipios'));
        if(app.layers.zones) app.layers.zones.setStyle((f) => app.getStyle(f, 'zonas'));
    },

    renderLegend: () => {
        const el = document.getElementById('legendColors'); el.innerHTML = '';
        CONFIG.scheme.forEach(s => {
            if(s.min >= 20) {
                const d = document.createElement('div'); d.className = 'legend-item'; d.style.background = s.ref; el.appendChild(d);
            }
        });
    },

    // RENDERIZAR PAINEL E SLIDERS (ONINPUT = TEMPO REAL, ONCHANGE = RECALCULAR MAPA APÓS SOLTAR SLIDER)
    renderUI: () => {
        const c = document.getElementById('slidersT1'); c.innerHTML = '';
        CONFIG.candidates.forEach(cand => {
            const isActive = app.state.active_candidates[cand.id] !== false;
            const val = app.state.t1_polls[cand.id] !== undefined ? app.state.t1_polls[cand.id] : 0.00;
            const photoUrl = LOCAL_PHOTOS[cand.id];
            const partyBadge = app.getPartyLogoHtml(cand.party);

            const div = document.createElement('div');
            div.className = `slider-box ${isActive ? '' : 'inactive'}`;
            div.innerHTML = `
                <div class="slider-header">
                    <div class="cand-info-group">
                        <input type="checkbox" ${isActive ? 'checked' : ''} onchange="app.toggleCandidate('${cand.id}', this.checked)">
                        <img src="${photoUrl}" class="cand-avatar" style="--cand-color: ${cand.color}" onerror="app.handleImgFallback(this, '${cand.id}')">
                        <div class="cand-name-party">
                            <span class="cand-name-text">${cand.name}</span>
                            <div class="cand-party-tag" style="color:${cand.color}">
                                ${partyBadge}
                            </div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:2px;">
                        <input type="text" id="input_t1_${cand.id}" class="pct-input-field" value="${val.toFixed(2)}" ${isActive ? '' : 'disabled'} oninput="app.handleT1Input('${cand.id}', this.value)" onblur="app.handleT1Blur('${cand.id}', this.value)">
                        <span style="font-size:0.75rem; color:var(--text-muted); font-weight:800">%</span>
                    </div>
                </div>
                <input type="range" id="slider_t1_${cand.id}" min="0" max="100" step="0.01" value="${val}" ${isActive ? '' : 'disabled'} oninput="app.updateT1Poll('${cand.id}', this.value)" onchange="app.runSimulation()">
            `;
            c.appendChild(div);
        });

        const c1 = document.getElementById('candFinal1'), c2 = document.getElementById('candFinal2');
        const activeCands = CONFIG.candidates.filter(c => app.state.active_candidates[c.id] !== false);
        const opts = activeCands.map(c => `<option value="${c.id}">${c.name} (${c.party})</option>`).join('');
        c1.innerHTML = opts; c2.innerHTML = opts;

        if(activeCands.length >= 2) {
            if(!activeCands.find(c=>c.id === app.state.t2_finalists[0])) app.state.t2_finalists[0] = activeCands[0].id;
            if(!activeCands.find(c=>c.id === app.state.t2_finalists[1])) app.state.t2_finalists[1] = activeCands[1].id;
            c1.value = app.state.t2_finalists[0]; c2.value = app.state.t2_finalists[1];
        }

        // ATUALIZA SLIDERS DE ABSTENÇÃO E NULOS/BRANCOS
        document.getElementById('abstentionInput').value = (app.state.abstention||20.50).toFixed(2);
        document.getElementById('abstentionSlider').value = app.state.abstention||20.50;
        document.getElementById('nullVotesInput').value = (app.state.null_votes||5.80).toFixed(2);
        document.getElementById('nullVotesSlider').value = app.state.null_votes||5.80;

        app.updateTotalT1Label(); app.updateT2UI();
    },

    toggleCandidate: (id, checked) => {
        app.state.active_candidates[id] = checked;
        if(checked && app.state.t1_polls[id] === 0) app.state.t1_polls[id] = 5.00;
        app.renderUI(); app.runSimulation();
    },

    updateT1Poll: (id, val) => {
        let num = parseFloat(parseFloat(val).toFixed(2)); if (isNaN(num)) num = 0.00;
        app.state.t1_polls[id] = num;
        const input = document.getElementById(`input_t1_${id}`); if (input) input.value = num.toFixed(2);
        app.updateTotalT1Label();
    },
    handleT1Input: (id, val) => {
        let num = parseFloat(val.replace(',', '.'));
        if (!isNaN(num)) {
            num = Math.max(0, Math.min(100, num));
            app.state.t1_polls[id] = num;
            const slider = document.getElementById(`slider_t1_${id}`); if (slider) slider.value = num;
            app.updateTotalT1Label();
        }
    },
    handleT1Blur: (id, val) => {
        let num = parseFloat(val.replace(',', '.')); if (isNaN(num)) num = 0.00;
        num = Math.max(0, Math.min(100, num));
        app.state.t1_polls[id] = num;
        app.renderUI(); app.runSimulation();
    },

    // CONTROLE DA TAXA DE ABSTENÇÃO E VOTOS BRANCOS/NULOS
    updateAbstention: (val) => {
        let num = parseFloat(parseFloat(val).toFixed(2)); if (isNaN(num)) num = 0.00;
        app.state.abstention = num;
        document.getElementById('abstentionInput').value = num.toFixed(2);
    },
    handleAbstentionInput: (val) => {
        let num = parseFloat(val.replace(',', '.'));
        if (!isNaN(num)) {
            num = Math.max(0, Math.min(50, num));
            app.state.abstention = num;
            document.getElementById('abstentionSlider').value = num;
        }
    },
    handleAbstentionBlur: (val) => {
        let num = parseFloat(val.replace(',', '.')); if (isNaN(num)) num = 0.00;
        app.state.abstention = Math.max(0, Math.min(50, num));
        app.runSimulation();
    },

    updateNullVotes: (val) => {
        let num = parseFloat(parseFloat(val).toFixed(2)); if (isNaN(num)) num = 0.00;
        app.state.null_votes = num;
        document.getElementById('nullVotesInput').value = num.toFixed(2);
    },
    handleNullVotesInput: (val) => {
        let num = parseFloat(val.replace(',', '.'));
        if (!isNaN(num)) {
            num = Math.max(0, Math.min(30, num));
            app.state.null_votes = num;
            document.getElementById('nullVotesSlider').value = num;
        }
    },
    handleNullVotesBlur: (val) => {
        let num = parseFloat(val.replace(',', '.')); if (isNaN(num)) num = 0.00;
        app.state.null_votes = Math.max(0, Math.min(30, num));
        app.runSimulation();
    },

    updateTotalT1Label: () => {
        const tot = CONFIG.candidates.filter(c => app.state.active_candidates[c.id]!==false).reduce((a,c) => a + (app.state.t1_polls[c.id]||0), 0);
        const el = document.getElementById('totalSimVal'); el.innerText = tot.toFixed(2) + "%";
        el.style.color = Math.abs(tot - 100) < 0.05 ? 'var(--accent-green)' : '#facc15';
    },

    normalizePcts: (turn) => {
        if(turn === 1) {
            const active = CONFIG.candidates.filter(c => app.state.active_candidates[c.id] !== false);
            const tot = active.reduce((a,c) => a + (app.state.t1_polls[c.id]||0), 0) || 1;
            active.forEach(c => { app.state.t1_polls[c.id] = parseFloat(((app.state.t1_polls[c.id] / tot) * 100).toFixed(2)); });
            app.renderUI(); app.runSimulation();
        } else {
            const [id1, id2] = app.state.t2_finalists; if(!id1 || !id2) return;
            const tot = (app.state.t2_polls[id1]||0) + (app.state.t2_polls[id2]||0) || 1;
            app.state.t2_polls[id1] = parseFloat(((app.state.t2_polls[id1] / tot) * 100).toFixed(2));
            app.state.t2_polls[id2] = parseFloat(((app.state.t2_polls[id2] / tot) * 100).toFixed(2));
            app.updateT2UI(); app.runSimulation();
        }
    },

    loadPresetScenario: (key) => {
        if (!key || !PRESETS[key]) return;
        const preset = PRESETS[key];
        CONFIG.candidates.forEach(cand => {
            app.state.t1_polls[cand.id] = preset.polls[cand.id] !== undefined ? preset.polls[cand.id] : 0.00;
            app.state.active_candidates[cand.id] = preset.active[cand.id] !== undefined ? preset.active[cand.id] : false;
        });
        app.renderUI(); app.runSimulation();
    },

    updateT2UI: () => {
        const c1 = document.getElementById('candFinal1'), c2 = document.getElementById('candFinal2');
        if(!c1.value || !c2.value) return;
        if (c1.value === c2.value) {
            const active = CONFIG.candidates.filter(c => app.state.active_candidates[c.id]!==false);
            if(active.length > 1) c2.value = active.find(c => c.id !== c1.value).id;
        }
        app.state.t2_finalists = [c1.value, c2.value];
        const slidersDiv = document.getElementById('slidersT2'); slidersDiv.innerHTML = '';

        [CONFIG.candidates.find(c=>c.id===c1.value), CONFIG.candidates.find(c=>c.id===c2.value)].forEach(cand => {
            if(!cand) return;
            const current = app.state.t2_polls[cand.id] !== undefined ? app.state.t2_polls[cand.id] : 50.00;
            const photoUrl = LOCAL_PHOTOS[cand.id];
            const partyBadge = app.getPartyLogoHtml(cand.party);

            const div = document.createElement('div');
            div.className = `slider-box ${app.state.t2_mode === 'organic' ? 'inactive' : ''}`;
            div.innerHTML = `
                <div class="slider-header">
                    <div class="cand-info-group">
                        <img src="${photoUrl}" class="cand-avatar" style="--cand-color: ${cand.color}" onerror="app.handleImgFallback(this, '${cand.id}')">
                        <div class="cand-name-party">
                            <span class="cand-name-text">${cand.name}</span>
                            <div class="cand-party-tag" style="color:${cand.color}">${partyBadge}</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:2px;">
                        <input type="text" id="input_t2_${cand.id}" class="pct-input-field" value="${current.toFixed(2)}" ${app.state.t2_mode === 'organic' ? 'disabled' : ''} oninput="app.handleT2Input('${cand.id}', this.value)" onblur="app.handleT2Blur('${cand.id}', this.value)">
                        <span style="font-size:0.75rem; color:var(--text-muted); font-weight:800">%</span>
                    </div>
                </div>
                <input type="range" id="slider_t2_${cand.id}" min="0" max="100" step="0.01" value="${current}" ${app.state.t2_mode === 'organic' ? 'disabled' : ''} oninput="app.updateT2Poll('${cand.id}', this.value)" onchange="app.runSimulation()">
            `;
            slidersDiv.appendChild(div);
        });
        app.checkT2Total();
    },

    updateT2Poll: (id, val) => {
        let num = parseFloat(parseFloat(val).toFixed(2)); if (isNaN(num)) num = 0.00;
        app.state.t2_polls[id] = num;
        const input = document.getElementById(`input_t2_${id}`); if (input) input.value = num.toFixed(2);
        app.checkT2Total();
    },
    handleT2Input: (id, val) => {
        let num = parseFloat(val.replace(',', '.'));
        if (!isNaN(num)) {
            num = Math.max(0, Math.min(100, num));
            app.state.t2_polls[id] = num;
            const slider = document.getElementById(`slider_t2_${id}`); if (slider) slider.value = num;
            app.checkT2Total();
        }
    },
    handleT2Blur: (id, val) => {
        let num = parseFloat(val.replace(',', '.')); if (isNaN(num)) num = 0.00;
        num = Math.max(0, Math.min(100, num));
        app.state.t2_polls[id] = num;
        app.updateT2UI(); app.runSimulation();
    },

    checkT2Total: () => {
        const[id1, id2] = app.state.t2_finalists;
        const tot = (app.state.t2_polls[id1]||0) + (app.state.t2_polls[id2]||0);
        const el = document.getElementById('totalSimValT2'); el.innerText = tot.toFixed(2) + "%";
        el.style.color = Math.abs(tot - 100) < 0.05 ? 'var(--accent-green)' : '#facc15';
    },

    selectRegion: (id, name, scope) => {
        app.state.selectedId = id; app.state.selectedName = name; app.state.selectedScope = scope;
        document.getElementById('btnBack').style.display = 'flex';
        if(window.innerWidth <= 768) app.mobileNav('results');
        app.updateSidebarRight();
    },

    // POP-UP / MODAL DE EDIÇÃO DIRETA INICIALIZADO COM O RESULTADO REAL ATUAL DA REGIÃO
    openLocalEditorModal: (id, name, scope) => {
        const isState = scope === 'estados' || id.length === 2;
        const activeCands = CONFIG.candidates.filter(c => app.state.active_candidates[c.id] !== false);
        
        // Pega os resultados simulados atuais da região
        const dataset = app.state.turn === 1 ? app.data.round1 : app.data.round2;
        let votes = {};
        if (dataset) {
            if (scope === 'zonas') votes = dataset.zonas ? dataset.zonas[id] : {};
            else if (isState) votes = dataset.estados[id] || {};
            else votes = dataset.municipios[id] || {};
        }

        const sortedVotes = Object.entries(votes).sort((a,b)=>b[1]-a[1]);
        const localTotalValid = sortedVotes.reduce((a,b)=>a+b[1], 0);

        // Pega valores locais salvos (OU INICIALIZA COM O RESULTADO REAL ATUAL DA REGIÃO, NÃO COM O NACIONAL)
        const pollsStore = isState ? app.state.t1_state_polls : app.state.t1_mun_polls;
        const absStore = isState ? app.state.t1_state_abstention : app.state.t1_mun_abstention;
        const nullsStore = isState ? app.state.t1_state_nulls : app.state.t1_mun_nulls;

        const currentAbs = (absStore && absStore[id] !== undefined) ? absStore[id] : app.state.abstention;
        const currentNulls = (nullsStore && nullsStore[id] !== undefined) ? nullsStore[id] : app.state.null_votes;

        // INICIALIZA DICIONÁRIO COMPLETO PARA A REGIÃO CASO AINDA NÃO EXISTA
        if (!pollsStore[id]) {
            pollsStore[id] = {};
            activeCands.forEach(cand => {
                if (localTotalValid > 0 && votes[cand.id] !== undefined) {
                    pollsStore[id][cand.id] = parseFloat(((votes[cand.id] / localTotalValid) * 100).toFixed(2));
                } else {
                    pollsStore[id][cand.id] = app.state.t1_polls[cand.id] || 0.00;
                }
            });
        }

        // PARTE 1: CARD DO RESULTADO ATUAL PROJETADO NA REGIÃO
        let html = `
            <div class="card-subgroup" style="margin-bottom:12px; background:rgba(0,0,0,0.25);">
                <div style="font-size:0.75rem; font-weight:800; color:var(--accent-blue); text-transform:uppercase; margin-bottom:8px;">
                    <i class="fas fa-chart-pie"></i> Resultado Atual Projetado (${name})
                </div>
        `;

        if (sortedVotes.length > 0 && localTotalValid > 0) {
            const winnerCand = CONFIG.candidates.find(c => c.id === sortedVotes[0][0]);
            const winnerPct = (sortedVotes[0][1] / localTotalValid) * 100;
            const winnerPhoto = LOCAL_PHOTOS[winnerCand.id];

            html += `
                <div style="display:flex; align-items:center; gap:12px; padding-bottom:8px; border-bottom:1px solid var(--card-border); margin-bottom:8px;">
                    <img src="${winnerPhoto}" style="width:40px; height:42px; border-radius:50%; object-fit:cover; border:2px solid ${winnerCand.color}" onerror="app.handleImgFallback(this, '${winnerCand.id}')">
                    <div>
                        <div style="font-size:0.65rem; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Líder na Região</div>
                        <div style="font-size:0.95rem; font-weight:800; color:${winnerCand.color}">${winnerCand.name} (${winnerCand.party})</div>
                        <div style="font-size:0.85rem; font-weight:900;">${winnerPct.toFixed(2)}% <small style="font-weight:600; color:var(--text-muted);">(${sortedVotes[0][1].toLocaleString('pt-BR')} votos)</small></div>
                    </div>
                </div>
            `;

            sortedVotes.slice(0, 4).forEach(([cid, v]) => {
                const cand = CONFIG.candidates.find(c => c.id === cid); if(!cand) return;
                const pct = (v / localTotalValid) * 100;
                html += `
                    <div style="margin-bottom:4px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.72rem; font-weight:700;">
                            <span>${cand.name} <small style="color:${cand.color}">(${cand.party})</small></span>
                            <span style="color:${cand.color}">${pct.toFixed(2)}%</span>
                        </div>
                        <div class="progress-bar" style="height:4px; margin-top:2px;">
                            <div class="progress-fill" style="width:${pct}%; background:${cand.color}"></div>
                        </div>
                    </div>
                `;
            });
        } else {
            html += `<div style="font-size:0.78rem; color:var(--text-muted);">Sem votos registrados.</div>`;
        }
        html += `</div>`;

        // PARTE 2: EDITORES LOCAIS DE PORCENTAGEM, ABSTENÇÃO E NULOS
        html += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--card-bg); padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--card-border); margin-bottom:12px;">
                <span style="font-size:0.85rem; font-weight:800; color:var(--accent-blue)">
                    <i class="${isState ? 'fas fa-map-marker-alt' : 'fas fa-city'}"></i> Personalizar ${name.toUpperCase()}
                </span>
                <button class="btn-normalize" onclick="app.resetLocalRegion('${id}', '${scope}')" style="background:rgba(239,68,68,0.15); color:#ef4444; border-color:rgba(239,68,68,0.3)">
                    <i class="fas fa-undo"></i> Resetar para Padrão
                </button>
            </div>

            <!-- CONTROLE DE ABSTENÇÃO E NULOS DA REGIÃO -->
            <div class="card-subgroup" style="margin-bottom:12px;">
                <div class="subgroup-row">
                    <span class="subgroup-label"><i class="fas fa-user-clock"></i> Taxa de Abstenção (${name})</span>
                    <div class="input-unit-group">
                        <input type="text" id="local_abs_input_${id}" class="pct-input-field" value="${currentAbs.toFixed(2)}" oninput="app.updateLocalAbstention('${id}', '${scope}', this.value)">
                        <span class="unit-tag">%</span>
                    </div>
                </div>
                <input type="range" min="0" max="50" step="0.1" value="${currentAbs}" oninput="app.updateLocalAbstention('${id}', '${scope}', this.value)" onchange="app.runSimulation()">

                <div class="subgroup-row" style="margin-top:8px;">
                    <span class="subgroup-label"><i class="fas fa-times-circle"></i> Brancos & Nulos (${name})</span>
                    <div class="input-unit-group">
                        <input type="text" id="local_null_input_${id}" class="pct-input-field" value="${currentNulls.toFixed(2)}" oninput="app.updateLocalNulls('${id}', '${scope}', this.value)">
                        <span class="unit-tag">%</span>
                    </div>
                </div>
                <input type="range" min="0" max="30" step="0.1" value="${currentNulls}" oninput="app.updateLocalNulls('${id}', '${scope}', this.value)" onchange="app.runSimulation()">
            </div>

            <!-- PORCENTAGEM DE CADA CANDIDATO NA REGIÃO -->
            <div class="poll-total-card" style="margin-bottom:10px;">
                <div>
                    <div class="poll-total-title">Soma Votos Válidos Locais</div>
                    <div id="localTotalSimVal_${id}" class="poll-total-val">100.00%</div>
                </div>
                <button class="btn-normalize" onclick="app.normalizeLocalPcts('${id}', '${scope}')">
                    <i class="fas fa-balance-scale"></i> Normalizar 100%
                </button>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px;">
        `;

        activeCands.forEach(cand => {
            const localVal = pollsStore[id][cand.id] !== undefined ? pollsStore[id][cand.id] : 0.00;
            const photoUrl = LOCAL_PHOTOS[cand.id];

            html += `
                <div class="slider-box">
                    <div class="slider-header">
                        <div class="cand-info-group">
                            <img src="${photoUrl}" class="cand-avatar" style="--cand-color:${cand.color}" onerror="app.handleImgFallback(this, '${cand.id}')">
                            <span style="font-weight:700;">${cand.name} <small style="color:${cand.color}">(${cand.party})</small></span>
                        </div>
                        <div style="display:flex; align-items:center; gap:2px;">
                            <input type="text" id="input_local_${id}_${cand.id}" class="pct-input-field" value="${localVal.toFixed(2)}" oninput="app.handleLocalCandPctInput('${id}', '${scope}', '${cand.id}', this.value)">
                            <span style="font-size:0.75rem; color:var(--text-muted); font-weight:800">%</span>
                        </div>
                    </div>
                    <input type="range" id="slider_local_${id}_${cand.id}" min="0" max="100" step="0.01" value="${localVal}" oninput="app.updateLocalCandPct('${id}', '${scope}', '${cand.id}', this.value)" onchange="app.runSimulation()">
                </div>
            `;
        });

        html += `</div>`;
        app.openModal(`<i class="fas fa-edit"></i> Ajustar Votos em ${name}`, html);
        app.updateLocalTotalLabel(id, scope);
    },

    // MANIPULAÇÃO DE DADOS LOCAIS NO POP-UP
    updateLocalCandPct: (id, scope, candId, val) => {
        let num = parseFloat(parseFloat(val).toFixed(2)); if (isNaN(num)) num = 0.00;
        const isState = scope === 'estados' || id.length === 2;
        const store = isState ? app.state.t1_state_polls : app.state.t1_mun_polls;
        if (!store[id]) store[id] = {};
        store[id][candId] = num;

        const input = document.getElementById(`input_local_${id}_${candId}`);
        if (input) input.value = num.toFixed(2);
        app.updateLocalTotalLabel(id, scope);
    },

    handleLocalCandPctInput: (id, scope, candId, val) => {
        let num = parseFloat(val.replace(',', '.'));
        if (!isNaN(num)) {
            num = Math.max(0, Math.min(100, num));
            const isState = scope === 'estados' || id.length === 2;
            const store = isState ? app.state.t1_state_polls : app.state.t1_mun_polls;
            if (!store[id]) store[id] = {};
            store[id][candId] = num;

            const slider = document.getElementById(`slider_local_${id}_${candId}`);
            if (slider) slider.value = num;
            app.updateLocalTotalLabel(id, scope);
        }
    },

    updateLocalAbstention: (id, scope, val) => {
        let num = parseFloat(val.replace(',', '.')); if (isNaN(num)) num = 0.00;
        num = Math.max(0, Math.min(50, num));
        const isState = scope === 'estados' || id.length === 2;
        const store = isState ? app.state.t1_state_abstention : app.state.t1_mun_abstention;
        if (!store[id]) store[id] = {};
        store[id] = num;

        const input = document.getElementById(`local_abs_input_${id}`);
        if (input) input.value = num.toFixed(2);
    },

    updateLocalNulls: (id, scope, val) => {
        let num = parseFloat(val.replace(',', '.')); if (isNaN(num)) num = 0.00;
        num = Math.max(0, Math.min(30, num));
        const isState = scope === 'estados' || id.length === 2;
        const store = isState ? app.state.t1_state_nulls : app.state.t1_mun_nulls;
        if (!store[id]) store[id] = {};
        store[id] = num;

        const input = document.getElementById(`local_null_input_${id}`);
        if (input) input.value = num.toFixed(2);
    },

    updateLocalTotalLabel: (id, scope) => {
        const isState = scope === 'estados' || id.length === 2;
        const store = isState ? app.state.t1_state_polls : app.state.t1_mun_polls;
        const activeCands = CONFIG.candidates.filter(c => app.state.active_candidates[c.id] !== false);
        
        const tot = activeCands.reduce((sum, cand) => sum + ((store[id] && store[id][cand.id] !== undefined) ? store[id][cand.id] : (app.state.t1_polls[cand.id] || 0)), 0);
        const el = document.getElementById(`localTotalSimVal_${id}`);
        if (el) {
            el.innerText = tot.toFixed(2) + "%";
            el.style.color = Math.abs(tot - 100) < 0.05 ? 'var(--accent-green)' : '#facc15';
        }
    },

    normalizeLocalPcts: (id, scope) => {
        const isState = scope === 'estados' || id.length === 2;
        const store = isState ? app.state.t1_state_polls : app.state.t1_mun_polls;
        if (!store[id]) store[id] = {};

        const activeCands = CONFIG.candidates.filter(c => app.state.active_candidates[c.id] !== false);
        const currentTot = activeCands.reduce((sum, cand) => sum + ((store[id] && store[id][cand.id] !== undefined) ? store[id][cand.id] : (app.state.t1_polls[cand.id] || 0)), 0) || 1;

        activeCands.forEach(cand => {
            const val = (store[id] && store[id][cand.id] !== undefined) ? store[id][cand.id] : (app.state.t1_polls[cand.id] || 0);
            store[id][cand.id] = parseFloat(((val / currentTot) * 100).toFixed(2));
        });

        app.openLocalEditorModal(id, app.state.selectedName, scope);
        app.runSimulation();
    },

    resetLocalRegion: (id, scope) => {
        const isState = scope === 'estados' || id.length === 2;
        if (isState) {
            delete app.state.t1_state_polls[id];
            delete app.state.t1_state_abstention[id];
            delete app.state.t1_state_nulls[id];
        } else {
            delete app.state.t1_mun_polls[id];
            delete app.state.t1_mun_abstention[id];
            delete app.state.t1_mun_nulls[id];
        }
        app.openLocalEditorModal(id, app.state.selectedName, scope);
        app.runSimulation();
    },

    // ATUALIZAÇÃO DO PAINEL DIREITO COM BOTÃO DE EDIÇÃO E SOMA NACIONAL REAL
    updateSidebarRight: () => {
        const title = document.getElementById('regionName'), sub = document.getElementById('regionType'), list = document.getElementById('resultsContainer');
        title.innerText = app.state.selectedName;
        let subTxt = "Nacional"; if (app.state.selectedId) { if (app.state.selectedScope === 'zonas') subTxt = "Zona Eleitoral"; else if (app.state.selectedId.length === 2) subTxt = "Estado"; else subTxt = "Município"; }
        sub.innerText = subTxt; list.innerHTML = '';

        // BOTÃO DE EDITAR A REGIÃO SELECIONADA
        if (app.state.selectedId) {
            const editBtn = document.createElement('button');
            editBtn.className = 'btn-primary';
            editBtn.style.marginBottom = '12px';
            editBtn.innerHTML = `<i class="fas fa-edit"></i> Personalizar Votos em ${app.state.selectedName}`;
            editBtn.onclick = () => app.openLocalEditorModal(app.state.selectedId, app.state.selectedName, app.state.selectedScope);
            list.appendChild(editBtn);
        }

        const dataset = app.state.turn === 1 ? app.data.round1 : app.data.round2; if(!dataset) return;
        let votes = {};
        if(app.state.selectedId) {
            if (app.state.selectedScope === 'zonas') votes = dataset.zonas ? dataset.zonas[app.state.selectedId] : {};
            else if(app.state.selectedId.length === 2) votes = dataset.estados[app.state.selectedId];
            else votes = dataset.municipios[app.state.selectedId];
        } else votes = dataset.nacional;
        if(!votes) return;

        const sorted = Object.entries(votes).sort((a,b)=>b[1]-a[1]); 
        const totalValid = sorted.reduce((a,b)=>a+b[1],0);
        
        // CÁLCULO DE ELEITORES TOTAIS, ABSTENÇÕES E BRANCOS/NULOS LOCAIS
        const selectedId = app.state.selectedId;
        const isState = app.state.selectedScope === 'estados' || (selectedId && selectedId.length === 2);
        
        let abstentionPct = app.state.abstention || 20.50;
        let nullPct = app.state.null_votes || 5.80;

        if (selectedId) {
            if (isState && app.state.t1_state_abstention[selectedId] !== undefined) abstentionPct = app.state.t1_state_abstention[selectedId];
            else if (!isState && app.state.t1_mun_abstention[selectedId] !== undefined) abstentionPct = app.state.t1_mun_abstention[selectedId];

            if (isState && app.state.t1_state_nulls[selectedId] !== undefined) nullPct = app.state.t1_state_nulls[selectedId];
            else if (!isState && app.state.t1_mun_nulls[selectedId] !== undefined) nullPct = app.state.t1_mun_nulls[selectedId];
        }

        const validPct = Math.max(1, 100 - abstentionPct - nullPct);
        const totalElectors = Math.round((totalValid / (validPct / 100)));
        const totalAbstentions = Math.round(totalElectors * (abstentionPct / 100));
        const totalNulls = Math.round(totalElectors * (nullPct / 100));

        if(document.getElementById('totalVotesVal')) document.getElementById('totalVotesVal').innerText = totalValid.toLocaleString('pt-BR');
        if(document.getElementById('totalAbstentionsVal')) document.getElementById('totalAbstentionsVal').innerText = totalAbstentions.toLocaleString('pt-BR');
        if(document.getElementById('totalNullVal')) document.getElementById('totalNullVal').innerText = totalNulls.toLocaleString('pt-BR');
        if(document.getElementById('totalElectorsVal')) document.getElementById('totalElectorsVal').innerText = totalElectors.toLocaleString('pt-BR');

        sorted.forEach(([cid, v]) => {
            const cand = CONFIG.candidates.find(c=>c.id===cid); if(!cand) return;
            if(app.state.turn===1 && app.state.active_candidates[cand.id] === false && v === 0) return;
            const pct = totalValid > 0 ? (v/totalValid)*100 : 0;
            const photoUrl = LOCAL_PHOTOS[cand.id];

            const row = document.createElement('div'); row.className = 'cand-row';
            row.innerHTML = `
                <img src="${photoUrl}" class="cand-avatar" style="--cand-color:${cand.color}" onerror="app.handleImgFallback(this, '${cand.id}')">
                <div class="cand-info">
                    <div class="cand-head">
                        <span>${cand.name} <small style="color:${cand.color}">(${cand.party})</small></span>
                        <span style="color:${cand.color}; font-weight:900;">${pct.toFixed(2)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width:${pct}%; background:${cand.color}"></div>
                    </div>
                    <div style="text-align:right; font-size:0.68rem; color:var(--text-muted); margin-top:3px; font-weight:700;">${v.toLocaleString('pt-BR')} votos válidos</div>
                </div>
            `;
            list.appendChild(row);
        });
    },

    filterResultsList: (term) => {
        const rows = document.querySelectorAll('#resultsContainer .cand-row');
        term = term.toLowerCase();
        rows.forEach(r => {
            const text = r.innerText.toLowerCase();
            r.style.display = text.includes(term) ? 'flex' : 'none';
        });
    },

    openModal: (title, html) => {
        document.getElementById('modalTitle').innerHTML = title;
        document.getElementById('modalBody').innerHTML = html;
        document.getElementById('modalOverlay').classList.add('active');
    },
    closeModal: () => { document.getElementById('modalOverlay').classList.remove('active'); },
    
    // COMPARTILHAMENTO DE CENÁRIOS VIA URL ENCODADA
    openShareModal: () => {
        const config = { 
            t1_polls: app.state.t1_polls, 
            t1_matrix: app.state.t1_matrix, 
            t1_matrix_state: app.state.t1_matrix_state, 
            t1_mults: app.state.t1_mults, 
            t1_state_polls: app.state.t1_state_polls,
            t1_state_abstention: app.state.t1_state_abstention,
            t1_state_nulls: app.state.t1_state_nulls,
            t1_mun_polls: app.state.t1_mun_polls,
            t1_mun_abstention: app.state.t1_mun_abstention,
            t1_mun_nulls: app.state.t1_mun_nulls,
            t1_mun_mults: app.state.t1_mun_mults,
            t2_migr: app.state.t2_migr, 
            t2_mults: app.state.t2_mults, 
            active_candidates: app.state.active_candidates, 
            abstention: app.state.abstention,
            null_votes: app.state.null_votes,
            t2_mode: app.state.t2_mode 
        };
        const encoded = btoa(encodeURIComponent(JSON.stringify(config)));
        const shareUrl = `${window.location.origin}${window.location.pathname}#scenario=${encoded}`;
        
        const html = `
            <div style="display:flex; flex-direction:column; gap:12px; align-items:center; text-align:center;">
                <p style="font-size:0.85rem; color:var(--text-muted)">Copie o link abaixo para compartilhar exatamente este cenário de simulação com outras pessoas:</p>
                <input type="text" id="shareUrlInput" value="${shareUrl}" readonly style="width:100%; text-align:center; font-size:0.8rem; font-weight:700;">
                <button class="btn-primary" onclick="navigator.clipboard.writeText('${shareUrl}'); alert('Link copiado para a área de transferência!');">
                    <i class="fas fa-copy"></i> Copiar Link do Cenário
                </button>
            </div>
        `;
        app.openModal("<i class='fas fa-share-alt'></i> Compartilhar Cenário", html);
    },

    openMunicipalAdjustModal: (turn) => {
        let html = `
            <div style="margin-bottom:12px">
                <label style="font-size:0.72rem; font-weight:800; color:var(--text-muted)">BUSCAR MUNICÍPIO (NOME OU CÓDIGO IBGE):</label>
                <input type="text" id="munSearchInput" placeholder="Ex: São Paulo, Belo Horizonte, 3550308..." oninput="app.searchMunicipalitiesForAdjust(${turn}, this.value)" style="margin-top:4px;">
            </div>
            <div id="munSearchResults" style="max-height:140px; overflow-y:auto; display:flex; flex-direction:column; gap:4px; margin-bottom:12px;"></div>
        `;
        app.openModal(turn === 1 ? "<i class='fas fa-city'></i> Buscar Município para Ajuste" : "<i class='fas fa-city'></i> Buscar Município (2º Turno)", html);
    },

    searchMunicipalitiesForAdjust: (turn, query) => {
        const resultsDiv = document.getElementById('munSearchResults');
        if (!query || query.length < 2 || !app.data.geoJson) { resultsDiv.innerHTML = ''; return; }
        query = query.toLowerCase();
        
        const matches = app.data.geoJson.features.filter(f => {
            const name = (f.properties.NM_MUN || f.properties.name || '').toLowerCase();
            const id = app.getFeatureId(f, 'municipios');
            return name.includes(query) || id.startsWith(query);
        }).slice(0, 10);

        resultsDiv.innerHTML = matches.map(f => {
            const id = app.getFeatureId(f, 'municipios');
            const name = f.properties.NM_MUN || f.properties.name;
            return `<div class="btn-secondary" onclick="app.closeModal(); app.selectRegion('${id}', '${name}', 'municipios'); app.openLocalEditorModal('${id}', '${name}', 'municipios');" style="padding:6px 10px; cursor:pointer;">
                <span>${name} (${id})</span><i class="fas fa-edit"></i>
            </div>`;
        }).join('');
    },

    // MATRIZ COM TODOS OS 11 CANDIDATOS DE 2022 COMO OPÇÃO DE ORIGEM
    openMatrixModal: () => {
        let html = `
            <div style="display:flex; gap:10px; margin-bottom:15px;">
                <div style="flex:1">
                    <label style="font-size:0.75rem; font-weight:800; color:var(--text-muted)">ELEITORADO DE 2022 (FONTE):</label>
                    <select id="modalSrcSelect" onchange="app.renderModalMatrix()" style="width:100%">
                        ${SOURCES_2022.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                    </select>
                </div>
                <div style="flex:1">
                    <label style="font-size:0.75rem; font-weight:800; color:var(--text-muted)">ESTADO:</label>
                    <select id="modalUfSelect" onchange="app.renderModalMatrix()" style="width:100%">
                        <option value="">Nacional (Padrão)</option>
                        ${STATES.map(s => `<option value="${s.id}">${s.sigla}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div id="modalMatrixContent" style="display:flex; flex-direction:column; gap:8px;"></div>
        `;
        app.openModal("<i class='fas fa-network-wired'></i> Matriz de Herança de Votos (2022)", html); app.renderModalMatrix();
    },
    renderModalMatrix: () => {
        const src = document.getElementById('modalSrcSelect') ? document.getElementById('modalSrcSelect').value : 'LULA';
        const ufId = document.getElementById('modalUfSelect') ? document.getElementById('modalUfSelect').value : '';
        const c = document.getElementById('modalMatrixContent'); c.innerHTML = '';

        CONFIG.candidates.forEach(dest => {
            let val = ufId ? (app.state.t1_matrix_state[ufId] && app.state.t1_matrix_state[ufId][src] ? app.state.t1_matrix_state[ufId][src][dest.id] : app.state.t1_matrix[src]?.[dest.id]) : (app.state.t1_matrix[src]?.[dest.id]);
            val = Math.round((val||0) * 100);
            const photoUrl = LOCAL_PHOTOS[dest.id];

            const div = document.createElement('div'); div.className = 'slider-box';
            div.innerHTML = `
                <div class="slider-header">
                    <div class="cand-info-group">
                        <img src="${photoUrl}" class="cand-avatar" style="--cand-color:${dest.color}" onerror="app.handleImgFallback(this, '${dest.id}')">
                        <span style="font-weight:700;">${dest.name}</span>
                    </div>
                    <span id="mod_mtx_${dest.id}" style="font-weight:900; color:var(--accent-blue)">${val}%</span>
                </div>
                <input type="range" min="0" max="100" value="${val}" oninput="app.updateMatrixValue('${src}', '${ufId}', '${dest.id}', this.value); document.getElementById('mod_mtx_${dest.id}').innerText=this.value+'%';">
            `;
            c.appendChild(div);
        });
    },
    updateMatrixValue: (src, ufId, destId, val) => {
        const ratio = parseInt(val)/100;
        if(ufId) {
            if(!app.state.t1_matrix_state[ufId]) app.state.t1_matrix_state[ufId] = {};
            if(!app.state.t1_matrix_state[ufId][src]) app.state.t1_matrix_state[ufId][src] = {...(app.state.t1_matrix[src]||{})};
            app.state.t1_matrix_state[ufId][src][destId] = ratio;
        } else {
            if(!app.state.t1_matrix[src]) app.state.t1_matrix[src] = {};
            app.state.t1_matrix[src][destId] = ratio;
        }
    },

    openStateModal: (turn) => {
        let html = `
            <div style="margin-bottom:15px"><label style="font-size:0.75rem; font-weight:800; color:var(--text-muted)">SELECIONE O ESTADO:</label><select id="modalStateSelect" onchange="app.closeModal(); app.selectRegion(this.value, STATES.find(s=>s.id===this.value).nome, 'estados'); app.openLocalEditorModal(this.value, STATES.find(s=>s.id===this.value).nome, 'estados');" style="width:100%"><option value="">Selecione...</option>${STATES.map(s => `<option value="${s.id}">${s.nome} (${s.sigla})</option>`).join('')}</select></div>
        `;
        app.openModal(turn === 1 ? "<i class='fas fa-map-marker-alt'></i> Ajustes por Estado" : "<i class='fas fa-map-marker-alt'></i> Ajustes por Estado (2º Turno)", html);
    },

    openMigrationModal: () => {
        const[id1, id2] = app.state.t2_finalists;
        const cand1 = CONFIG.candidates.find(c=>c.id===id1), cand2 = CONFIG.candidates.find(c=>c.id===id2);
        let html = `
            <div style="text-align:center; font-size:0.8rem; color:var(--text-muted); margin-bottom:15px">
                Arraste para direcionar a transferência de votos dos candidatos eliminados no 1º turno.<br>
                <strong style="color:${cand1.color}">${cand1.name} (0%)</strong> &bull; <strong style="color:${cand2.color}">${cand2.name} (100%)</strong>
            </div>
            <div id="modalMigContent" style="display:flex; flex-direction:column; gap:8px;"></div>
        `;
        app.openModal("<i class='fas fa-exchange-alt'></i> Transferência de Votos (2º Turno)", html);
        const c = document.getElementById('modalMigContent');

        CONFIG.candidates.forEach(cand => {
            if(cand.id === id1 || cand.id === id2 || app.state.active_candidates[cand.id] === false) return;
            const ratio = app.state.t2_migr[cand.id] !== undefined ? app.state.t2_migr[cand.id] : 0.5;
            const photoUrl = LOCAL_PHOTOS[cand.id];

            const div = document.createElement('div'); div.className = 'slider-box';
            div.innerHTML = `
                <div class="slider-header">
                    <div class="cand-info-group">
                        <img src="${photoUrl}" class="cand-avatar" style="--cand-color:${cand.color}" onerror="app.handleImgFallback(this, '${cand.id}')">
                        <span style="font-weight:700;">Votos de ${cand.name}</span>
                    </div>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:800; margin-bottom:4px;">
                    <span style="color:${cand1.color}">${cand1.name}</span>
                    <span style="color:${cand2.color}">${cand2.name}</span>
                </div>
                <input type="range" min="0" max="100" value="${ratio*100}" oninput="app.state.t2_migr['${cand.id}'] = this.value/100;" onchange="app.runSimulation()">
            `;
            c.appendChild(div);
        });
    },

    getMatrixValue: (ufId, src, destId) => {
        return (app.state.t1_matrix_state[ufId] && app.state.t1_matrix_state[ufId][src] && app.state.t1_matrix_state[ufId][src][destId] !== undefined) ? app.state.t1_matrix_state[ufId][src][destId] : (app.state.t1_matrix[src] ? (app.state.t1_matrix[src][destId] || 0) : 0);
    },

    runSimulation: () => {
        if(!app.data.base22) return;
        const loader = document.getElementById('loader'); loader.classList.remove('hidden');
        document.getElementById('loaderMsg').innerText = "Processando Matemática Eleitoral...";
        setTimeout(() => {
            if(app.state.turn === 1) app.calculateTurn1();
            else { if(!app.data.round1) app.calculateTurn1(); app.calculateTurn2(); }
            app.refreshMap(); app.updateSidebarRight(); loader.classList.add('hidden');
        }, 50);
    },

    // CÁLCULO DE 1º TURNO: ENGINE ELEITORAL HIERÁRQUICO CONSISTENTE (BOTTOM-UP)
    calculateTurn1: () => {
        const base = app.data.base22.municipios;
        const activeIds = CONFIG.candidates.filter(c => app.state.active_candidates[c.id] !== false).map(c => c.id);
        const rawSliderTotal = activeIds.reduce((sum, id) => sum + (app.state.t1_polls[id]||0), 0);
        const targetPcts = {}; activeIds.forEach(id => { targetPcts[id] = (app.state.t1_polls[id]||0) / (rawSliderTotal || 1); });

        const res = { municipios: {}, estados: {}, nacional: {}, zonas: {} }; 
        const src2022Keys = SOURCES_2022.map(s => s.id);
        
        // PASSO 1: CÁLCULO MUNICIPAL BASE (MATRIZ DE HERANÇA + MULTIPLICADORES)
        for(let ibge in base) {
            const votes22 = base[ibge], ufId = ibge.substring(0,2), mVotes = {};
            
            activeIds.forEach(candId => {
                let sum = 0; 
                src2022Keys.forEach(srcKey => {
                    const rawVal = app.getMatrixValue(ufId, srcKey, candId);
                    let totalActiveWeight = 0; activeIds.forEach(cid => { totalActiveWeight += app.getMatrixValue(ufId, srcKey, cid); });
                    let finalFactor = totalActiveWeight > 0 ? rawVal / totalActiveWeight : 0;
                    sum += app.getVotes22(votes22, srcKey) * finalFactor;
                });
                
                // MULTIPLICADORES ESTADUAIS E MUNICIPAIS
                if(app.state.t1_mults[ufId] && app.state.t1_mults[ufId][candId]) sum *= app.state.t1_mults[ufId][candId];
                if(app.state.t1_mun_mults && app.state.t1_mun_mults[ibge] && app.state.t1_mun_mults[ibge][candId]) sum *= app.state.t1_mun_mults[ibge][candId];
                
                mVotes[candId] = sum;
            });

            // PASSO 2: APLICAÇÃO DE AJUSTE DIRETO POR PORCENTAGEM MUNICIPAL (SE BLOQUEADO/PERSONALIZADO)
            if (app.state.t1_mun_polls && app.state.t1_mun_polls[ibge]) {
                const munPolls = app.state.t1_mun_polls[ibge];
                const munSumPcts = activeIds.reduce((a, cid) => a + (munPolls[cid] !== undefined ? munPolls[cid] : (app.state.t1_polls[cid]||0)), 0) || 1;
                const totalMunVotes = activeIds.reduce((a, cid) => a + mVotes[cid], 0) || 1;
                activeIds.forEach(candId => {
                    const targetPct = (munPolls[candId] !== undefined ? munPolls[candId] : (app.state.t1_polls[candId]||0)) / munSumPcts;
                    mVotes[candId] = totalMunVotes * targetPct;
                });
            }

            res.municipios[ibge] = mVotes;
        }

        // PASSO 3: AGREGAR TOTAIS ESTADUAIS INICIAIS
        for(let ibge in res.municipios) {
            const ufId = ibge.substring(0,2);
            if(!res.estados[ufId]) res.estados[ufId] = {};
            for(let cid in res.municipios[ibge]) {
                res.estados[ufId][cid] = (res.estados[ufId][cid]||0) + res.municipios[ibge][cid];
            }
        }

        // PASSO 4: APLICAÇÃO DE AJUSTE DIRETO POR PORCENTAGEM ESTADUAL (SE BLOQUEADO/PERSONALIZADO)
        STATES.forEach(st => {
            const ufId = st.id;
            if (app.state.t1_state_polls && app.state.t1_state_polls[ufId]) {
                const statePolls = app.state.t1_state_polls[ufId];
                const stateSumPcts = activeIds.reduce((a, cid) => a + (statePolls[cid] !== undefined ? statePolls[cid] : (app.state.t1_polls[cid]||0)), 0) || 1;
                const totalStateVotes = activeIds.reduce((a, cid) => a + (res.estados[ufId][cid]||0), 0) || 1;

                const stateScale = {};
                activeIds.forEach(candId => {
                    const targetPct = (statePolls[candId] !== undefined ? statePolls[candId] : (app.state.t1_polls[candId]||0)) / stateSumPcts;
                    const targetVotes = totalStateVotes * targetPct;
                    const currentVotes = res.estados[ufId][candId] || 1;
                    stateScale[candId] = targetVotes / currentVotes;
                });

                for(let ibge in res.municipios) {
                    if (ibge.startsWith(ufId)) {
                        for(let cid in res.municipios[ibge]) {
                            res.municipios[ibge][cid] *= stateScale[cid];
                        }
                    }
                }
            }
        });

        // PASSO 5: ESCALONAMENTO DE CORREÇÃO PROPORCIONAL DAS REGIÕES NÃO-BLOQUEADAS EM RELAÇÃO À META NACIONAL
        let unadjustedNacional = {}, unadjustedTotal = 0;
        for(let ibge in res.municipios) {
            const ufId = ibge.substring(0,2);
            const isCustomState = app.state.t1_state_polls && app.state.t1_state_polls[ufId];
            const isCustomMun = app.state.t1_mun_polls && app.state.t1_mun_polls[ibge];
            
            if (!isCustomState && !isCustomMun) {
                for(let cid in res.municipios[ibge]) {
                    unadjustedNacional[cid] = (unadjustedNacional[cid]||0) + res.municipios[ibge][cid];
                    unadjustedTotal += res.municipios[ibge][cid];
                }
            }
        }

        const corrections = {};
        if (unadjustedTotal > 0) {
            activeIds.forEach(id => {
                const currPct = unadjustedNacional[id] / (unadjustedTotal||1);
                corrections[id] = (currPct > 0) ? targetPcts[id]/currPct : 1;
            });

            for(let ibge in res.municipios) {
                const ufId = ibge.substring(0,2);
                const isCustomState = app.state.t1_state_polls && app.state.t1_state_polls[ufId];
                const isCustomMun = app.state.t1_mun_polls && app.state.t1_mun_polls[ibge];

                if (!isCustomState && !isCustomMun) {
                    for(let cid in res.municipios[ibge]) {
                        res.municipios[ibge][cid] *= corrections[cid];
                    }
                }
            }
        }

        // PASSO 6: ARREDONDAMENTO FINAL E AGREGAÇÃO EXATA DO BRASIL (SOMA REAL DOS ESTADOS/MUNICÍPIOS)
        res.estados = {}; res.nacional = {};
        for(let ibge in res.municipios) {
            const ufId = ibge.substring(0,2); if(!res.estados[ufId]) res.estados[ufId] = {};
            for(let cid in res.municipios[ibge]) {
                let v = Math.round(res.municipios[ibge][cid]);
                res.municipios[ibge][cid] = v;
                res.estados[ufId][cid] = (res.estados[ufId][cid]||0) + v;
                res.nacional[cid] = (res.nacional[cid]||0) + v;
            }
        }
        
        // PASSO 7: CÁLCULO E CORREÇÃO RIGOROSA DAS ZONAS ELEITORAIS (SINCRO COM CANDIDATOS ZERADOS/INATIVOS)
        if (app.data.base22.zonas) {
            for(let zId in app.data.base22.zonas) {
                const votes22 = app.data.base22.zonas[zId];
                const ibge = zId.split('_')[0];
                const ufId = ibge.substring(0,2);
                const zVotes = {};

                // Calcula a proporção relativa de cada candidato na zona dentro do seu município
                const totalMunVotes = activeIds.reduce((sum, cid) => sum + (res.municipios[ibge] ? (res.municipios[ibge][cid] || 0) : 0), 0) || 1;

                activeIds.forEach(candId => {
                    let sum = 0; 
                    src2022Keys.forEach(srcKey => {
                        const rawVal = app.getMatrixValue(ufId, srcKey, candId);
                        let totalActiveWeight = 0; activeIds.forEach(cid => { totalActiveWeight += app.getMatrixValue(ufId, srcKey, cid); });
                        let finalFactor = totalActiveWeight > 0 ? rawVal / totalActiveWeight : 0;
                        sum += (votes22[srcKey] || 0) * finalFactor;
                    });

                    if(app.state.t1_mults[ufId] && app.state.t1_mults[ufId][candId]) sum *= app.state.t1_mults[ufId][candId];
                    if(app.state.t1_mun_mults && app.state.t1_mun_mults[ibge] && app.state.t1_mun_mults[ibge][candId]) sum *= app.state.t1_mun_mults[ibge][candId];

                    zVotes[candId] = sum;
                });

                const totalZoneRaw = activeIds.reduce((sum, cid) => sum + zVotes[cid], 0) || 1;

                // Escala a zona para que a soma das zonas seja estritamente coerente com o município e zere se o candidato for 0%
                activeIds.forEach(candId => {
                    const munCandVotes = res.municipios[ibge] ? (res.municipios[ibge][candId] || 0) : 0;
                    if (munCandVotes === 0 || targetPcts[candId] === 0 || app.state.t1_polls[candId] === 0 || app.state.active_candidates[candId] === false) {
                        zVotes[candId] = 0;
                    } else {
                        const zoneShare = zVotes[candId] / totalZoneRaw;
                        zVotes[candId] = Math.round(munCandVotes * zoneShare);
                    }
                });

                res.zonas[zId] = zVotes;
            }
        }
        
        app.data.round1 = res;
    },

    calculateTurn2: () => {
        if(!app.data.round1) app.calculateTurn1(); const r1 = app.data.round1;
        const[id1, id2] = app.state.t2_finalists; if(!id1 || !id2) return;
        const isOrganic = app.state.t2_mode === 'organic';

        const res = { municipios: {}, estados: {}, nacional: {}, zonas: {} }; let tempNacional = {[id1]:0, [id2]:0}, grandTotal = 0;
        for(let ibge in r1.municipios) {
            const v1 = r1.municipios[ibge], ufId = ibge.substring(0,2); let vA = 0, vB = 0;
            for(let cid in v1) {
                const votos = v1[cid];
                if(cid === id1) vA += votos;
                else if(cid === id2) vB += votos;
                else {
                    let ratio = app.state.t2_migr[cid] !== undefined ? app.state.t2_migr[cid] : 0.5;
                    vA += votos * (1 - ratio); vB += votos * ratio;
                }
            }
            if(app.state.t2_mults[ufId]) {
                if(app.state.t2_mults[ufId][id1]) vA *= app.state.t2_mults[ufId][id1];
                if(app.state.t2_mults[ufId][id2]) vB *= app.state.t2_mults[ufId][id2];
            }
            vA = Math.round(vA); vB = Math.round(vB); tempNacional[id1] += vA; tempNacional[id2] += vB; grandTotal += (vA + vB);
            res.municipios[ibge] = { [id1]: vA, [id2]: vB };
        }

        if(!isOrganic) {
            const totalSlider = (app.state.t2_polls[id1]||0) + (app.state.t2_polls[id2]||0);
            const targetPcts = { [id1]: (app.state.t2_polls[id1]||0)/(totalSlider||1), [id2]: (app.state.t2_polls[id2]||0)/(totalSlider||1) };
            const corrections = {}; [id1, id2].forEach(id => { const currPct = tempNacional[id] / (grandTotal||1); corrections[id] = (app.state.t2_polls[id]<=0) ? 0 : (currPct>0 ? targetPcts[id]/currPct : 1); });
            res.nacional = {};
            for(let ibge in res.municipios) {
                const ufId = ibge.substring(0,2); if(!res.estados[ufId]) res.estados[ufId] = {};
                [id1, id2].forEach(id => {
                    let v = Math.round(res.municipios[ibge][id] * corrections[id]);
                    res.municipios[ibge][id] = v; res.estados[ufId][id] = (res.estados[ufId][id]||0) + v; res.nacional[id] = (res.nacional[id]||0) + v;
                });
            }
        } else {
            res.nacional = tempNacional;
            for(let ibge in res.municipios) {
                const ufId = ibge.substring(0,2); if(!res.estados[ufId]) res.estados[ufId] = {};
                [id1, id2].forEach(id => { let v = res.municipios[ibge][id]; res.estados[ufId][id] = (res.estados[ufId][id]||0) + v; });
            }
            const t = grandTotal || 1;
            app.state.t2_polls[id1] = parseFloat(((tempNacional[id1]/t)*100).toFixed(2));
            app.state.t2_polls[id2] = parseFloat(((tempNacional[id2]/t)*100).toFixed(2));
            if(document.getElementById(`input_t2_${id1}`)) document.getElementById(`input_t2_${id1}`).value = app.state.t2_polls[id1].toFixed(2);
            if(document.getElementById(`input_t2_${id2}`)) document.getElementById(`input_t2_${id2}`).value = app.state.t2_polls[id2].toFixed(2);
            app.checkT2Total();
        }

        if (r1.zonas) {
            for(let zId in r1.zonas) {
                const v1 = r1.zonas[zId], ufId = String(zId).substring(0,2); let vA = 0, vB = 0;
                for(let cid in v1) {
                    const votos = v1[cid];
                    if(cid === id1) vA += votos; else if(cid === id2) vB += votos;
                    else { let ratio = app.state.t2_migr[cid] !== undefined ? app.state.t2_migr[cid] : 0.5; vA += votos * (1 - ratio); vB += votos * ratio; }
                }
                if(app.state.t2_mults[ufId]) {
                    if(app.state.t2_mults[ufId][id1]) vA *= app.state.t2_mults[ufId][id1];
                    if(app.state.t2_mults[ufId][id2]) vB *= app.state.t2_mults[ufId][id2];
                }
                vA = Math.round(vA); vB = Math.round(vB); res.zonas[zId] = { [id1]: vA, [id2]: vB };
            }
            if(!isOrganic) {
                const totalSlider = (app.state.t2_polls[id1]||0) + (app.state.t2_polls[id2]||0);
                const targetPcts = { [id1]: (app.state.t2_polls[id1]||0)/(totalSlider||1), [id2]: (app.state.t2_polls[id2]||0)/(totalSlider||1) };
                const corrections = {}; [id1, id2].forEach(id => { const currPct = tempNacional[id] / (grandTotal||1); corrections[id] = (app.state.t2_polls[id]<=0) ? 0 : (currPct>0 ? targetPcts[id]/currPct : 1); });
                for(let zId in res.zonas) { [id1, id2].forEach(id => { res.zonas[zId][id] = Math.round(res.zonas[zId][id] * corrections[id]); }); }
            }
        }
        app.data.round2 = res;
    },

    // EXTRAÇÃO DE VOTOS BASE DA ELEIÇÃO DE 2022 USANDO NÚMEROS E SIGLAS
    getVotes22: (obj, key) => {
        let sum = 0;
        const aliases = CAND_2022_ALIASES[key] || [key];
        for (let k in obj) {
            const kUpper = k.toUpperCase();
            if (aliases.some(alias => kUpper.includes(alias))) {
                sum += obj[k];
            }
        }
        return sum;
    }
};

document.addEventListener('DOMContentLoaded', app.init);

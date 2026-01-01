# ==============================================================================
# GERADOR DE CENÁRIO BASE 2026 (OTIMIZADO)
# ==============================================================================

import json
import os

# --- CONFIGURAÇÃO MANUAL DE PESQUISAS (OPCIONAL) ---
# Se você quiser alterar o ponto de partida base (hoje é o resultado real de 2022)
# Exemplo: Se uma pesquisa diz que a Esquerda tem 48% hoje, coloque 0.48
PESQUISA_ATUAL = {
    "usar_pesquisa": False, # Mude para True para ativar
    "pct_esquerda": 0.48,   # 48%
    "pct_direita": 0.52     # 52%
}

def carregar_dados_2022():
    caminho_arquivo = 'data/2022_president.json'
    
    if not os.path.exists(caminho_arquivo):
        print(f"❌ Erro: Arquivo '{caminho_arquivo}' não encontrado.")
        print("Certifique-se de que a pasta 'data' está junto com este script.")
        return None

    print("📂 Carregando arquivo bruto de 2022...")
    try:
        with open(caminho_arquivo, 'r', encoding='utf-8') as f:
            dados = json.load(f)
        return dados
    except Exception as e:
        print(f"❌ Erro ao ler JSON: {e}")
        return None

def processar_cenario(dados_brutos):
    print("⚙️ Processando dados e calculando tendências...")
    
    # Pega apenas o 2º Turno (chave "2")
    turno_2 = dados_brutos.get('2')
    if not turno_2:
        print("❌ Dados do 2º turno não encontrados.")
        return None

    municipios_otimizados = {}
    total_esquerda = 0
    total_valido = 0
    
    # Metadados de nomes
    nomes_cidades = turno_2.get('meta_nomes', {})

    # Itera sobre cada município para extrair apenas Lula vs Bolsonaro
    # e calcular o "Viés Local" (o quanto a cidade é mais esq/dir que a média)
    for ibge, votos in turno_2.get('municipios', {}).items():
        v_esq = 0
        v_dir = 0
        
        # Soma inteligente (procura por palavras-chave)
        for cand, qtd in votos.items():
            cand_upper = cand.upper()
            # Identifica Esquerda (Lula/PT/13)
            if 'LULA' in cand_upper or 'PT' in cand_upper or '13' in cand_upper:
                v_esq += qtd
            # Identifica Direita (Bolsonaro/PL/22)
            elif 'BOLSONARO' in cand_upper or 'PL' in cand_upper or '22' in cand_upper:
                v_dir += qtd
        
        total_mun = v_esq + v_dir
        
        if total_mun > 0:
            # Salva apenas o essencial: % da Esquerda na cidade
            # Isso reduz drasticamente o tamanho do arquivo
            pct_esq = round(v_esq / total_mun, 4)
            
            # Estrutura super compacta: [PercentualPT, TotalVotos]
            municipios_otimizados[ibge] = [pct_esq, total_mun]
            
            total_esquerda += v_esq
            total_valido += total_mun

    # Calcula a média nacional real de 2022
    media_nacional_2022 = total_esquerda / total_valido
    print(f"📊 Média Nacional Real 2022 (Esq): {media_nacional_2022:.4%}")

    # Ajuste de Pesquisa (Se ativado)
    ponto_partida = media_nacional_2022
    if PESQUISA_ATUAL['usar_pesquisa']:
        print(f"⚠️ Ajustando base para pesquisa recente: {PESQUISA_ATUAL['pct_esquerda']:.1%}")
        ponto_partida = PESQUISA_ATUAL['pct_esquerda']

    # Monta o JSON final
    cenario_2026 = {
        "meta": {
            "base_nacional": round(ponto_partida, 4),
            "origem": "TSE 2022 + Ajuste Manual" if PESQUISA_ATUAL['usar_pesquisa'] else "TSE 2022 Real",
            "total_votos_base": total_valido
        },
        "dados": municipios_otimizados, # { "3550308": [0.55, 10000], ... }
        "nomes": nomes_cidades
    }

    return cenario_2026

def salvar_arquivo(dados):
    with open('cenario_base_2026.json', 'w', encoding='utf-8') as f:
        json.dump(dados, f, separators=(',', ':')) # Minifica o JSON
    print("✅ Arquivo 'cenario_base_2026.json' gerado com sucesso!")
    print(f"   Total de Cidades: {len(dados['dados'])}")

# Execução
dados = carregar_dados_2022()
if dados:
    cenario = processar_cenario(dados)
    if cenario:
        salvar_arquivo(cenario)
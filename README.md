# lasp-iiam-drnd
Sistema de Interpretação de Análises de Solo e Plantas

![LASP Banner](https://images.unsplash.com/photo-1720202194910-75fd3bc2b820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200)

## 🎯 Sobre o Projeto

O LASP é uma plataforma web desenvolvida para o **Instituto de Investigação Agrária de Moçambique (IIAM)** - Delegação Regional de Nampula. O sistema oferece interpretação automatizada de análises de solo e plantas, gerando recomendações técnicas personalizadas para diferentes culturas.

### ✨ Funcionalidades Principais

- 🧪 **Análise Química Completa de Solo**
  - pH em água
  - Macronutrientes (N, P, K, Ca, Mg, S)
  - Micronutrientes (B, Cu, Fe, Mn, Zn)
  - Matéria orgânica, CTC, V%
  - Fósforo remanescente (P-rem)

- 🌿 **Análise Foliar**
  - Teores de macro e micronutrientes
  - Interpretação por cultura e estádio fenológico
  - Diagnóstico nutricional

- 📊 **Recomendações Técnicas**
  - Cálculo de necessidade de calagem
  - Recomendação de gessagem
  - Doses de NPK personalizadas por cultura
  - Parcelamento e fontes de fertilizantes
  - Recomendações de micronutrientes

- 📈 **Visualização Gráfica**
  - Gráficos interativos com níveis de nutrientes
  - Classificação colorida (Muito Baixo a Muito Bom)
  - Interface intuitiva e responsiva

## 🔬 Metodologia

O sistema utiliza a **5ª Aproximação de Recomendação de Calagem e Adubação** desenvolvida pela Comissão de Fertilidade do Solo do Estado de Minas Gerais (CFSEMG):

> Ribeiro, A.C.; Guimarães, P.T.G.; Alvarez V., V.H. (Eds.) **Recomendações para o uso de corretivos e fertilizantes em Minas Gerais - 5ª Aproximação.** Viçosa: CFSEMG, 1999. 359p.

Esta metodologia é amplamente reconhecida e utilizada no Brasil e outros países de agricultura tropical.

## 🚀 Tecnologias Utilizadas

- **React 18** - Framework JavaScript para construção da interface
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS v4** - Framework CSS utility-first
- **Radix UI** - Componentes acessíveis e customizáveis
- **Recharts** - Biblioteca para gráficos e visualizações
- **Lucide React** - Ícones modernos e leves
- **Vite** - Build tool rápido e moderno

## 📦 Instalação e Uso

### Pré-requisitos

- Node.js 18+ 
- npm ou pnpm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/lasp-iiam.git

# Entre no diretório
cd lasp-iiam

# Instale as dependências
npm install
# ou
pnpm install

# Execute o projeto em modo de desenvolvimento
npm run dev
# ou
pnpm dev
```

### Build para Produção

```bash
npm run build
# ou
pnpm build
```

## 🌐 Publicação no GitHub Pages

Para publicar o site no GitHub Pages:

1. Faça o build do projeto:
```bash
npm run build
```

2. O conteúdo da pasta `dist/` será o site estático

3. Configure o GitHub Pages:
   - Vá em Settings > Pages
   - Selecione a branch `gh-pages` (ou main com pasta /docs)
   - O site estará disponível em `https://seu-usuario.github.io/lasp-iiam`

Ou use o GitHub Actions para deploy automático (arquivo `.github/workflows/deploy.yml` incluído).

## 📋 Culturas Suportadas

O sistema oferece interpretação e recomendações para as seguintes culturas:

- Milho
- Soja
- Café
- Cana-de-açúcar
- Feijão
- Trigo
- Algodão
- Arroz
- Pastagens
- Horticultura
- Eucalipto
- Citros

## 🎨 Estrutura do Projeto

```
lasp-iiam/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/              # Componentes de UI base
│   │   │   ├── soil-analysis-form.tsx
│   │   │   ├── soil-interpretation-5th.tsx
│   │   │   ├── fertilization-5th.tsx
│   │   │   ├── plant-analysis-form.tsx
│   │   │   ├── plant-interpretation.tsx
│   │   │   └── nutrient-chart.tsx
│   │   └── App.tsx             # Componente principal
│   └── styles/
│       ├── theme.css           # Tema global
│       └── fonts.css           # Fontes
├── public/                     # Arquivos estáticos
├── package.json
└── README.md
```

## 👨‍🔬 Sobre o Autor

**Eng. Agrônomo Munir Jussub**
- 📧 Email: munir.jussub@outlook.com
- 🏢 IIAM - Delegação Regional de Nampula
- 🌍 Moçambique

## 📄 Licença

Este projeto foi desenvolvido para o IIAM - Instituto de Investigação Agrária de Moçambique.

## ⚠️ Aviso Legal

Este sistema fornece orientações técnicas baseadas em metodologias validadas científicamente. As recomendações geradas são orientativas e devem ser validadas por um Engenheiro Agrônomo registrado, considerando as condições específicas de cada área.

Para recomendações definitivas e Receituário Agronômico, consulte um profissional habilitado.

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

## 📞 Contato

Para dúvidas sobre análises ou serviços do laboratório:

**LASP - Laboratório de Análise de Solos e Plantas**
- 📍 IIAM - Delegação Regional de Nampula, Moçambique
- 📧 lasp@iiam.gov.mz
- 📧 munir.jussub@outlook.com

---

<p align="center">
  Desenvolvido com ❤️ para a agricultura moçambicana
</p>

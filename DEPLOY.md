# 🚀 Guia de Publicação no GitHub Pages

Este guia explica como publicar o sistema LASP no GitHub Pages para torná-lo acessível publicamente na internet.

## 📋 Pré-requisitos

- Conta no GitHub
- Git instalado no seu computador
- Node.js e npm/pnpm instalados

## 🔧 Passo 1: Preparar o Repositório

### 1.1 Criar um Repositório no GitHub

1. Acesse [GitHub](https://github.com) e faça login
2. Clique em **"New repository"** (Novo repositório)
3. Configure o repositório:
   - **Nome**: `lasp-iiam` (ou outro nome de sua preferência)
   - **Descrição**: "Sistema de Interpretação de Análises de Solo e Plantas"
   - **Visibilidade**: Public (Público)
   - ✅ Marque "Add a README file"
   - Clique em **"Create repository"**

### 1.2 Clonar e Adicionar o Código

```bash
# Clone o repositório criado
git clone https://github.com/SEU-USUARIO/lasp-iiam.git
cd lasp-iiam

# Copie todos os arquivos do projeto para esta pasta
# (App.tsx, components/, package.json, etc.)

# Adicione os arquivos ao Git
git add .

# Faça o primeiro commit
git commit -m "Adiciona sistema LASP completo"

# Envie para o GitHub
git push origin main
```

## ⚙️ Passo 2: Configurar GitHub Pages

### Método 1: Deploy Automático com GitHub Actions (Recomendado)

O projeto já inclui um arquivo `.github/workflows/deploy.yml` que automatiza o deploy.

1. Vá no seu repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - Source: **GitHub Actions**
5. Faça um push para a branch `main` e o deploy será automático!

### Método 2: Deploy Manual

Se preferir fazer deploy manual:

```bash
# 1. Instale as dependências
npm install

# 2. Gere o build de produção
npm run build

# 3. A pasta 'dist' contém os arquivos estáticos
# Você pode usar o GitHub Pages apontando para essa pasta
```

Depois, no GitHub:
1. Vá em **Settings** > **Pages**
2. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/dist` (você precisará commitar a pasta dist)

## 🌐 Passo 3: Acessar o Site

Após o deploy (leva alguns minutos):

1. O site estará disponível em:
   ```
   https://SEU-USUARIO.github.io/lasp-iiam/
   ```

2. Você pode conferir o status do deploy em:
   - **Actions** > Aba "All workflows"
   - Verifique se o workflow "Deploy to GitHub Pages" completou com sucesso ✅

## 🔄 Atualizações Futuras

Para atualizar o site após fazer alterações:

```bash
# 1. Faça suas alterações nos arquivos
# 2. Adicione e commite as mudanças
git add .
git commit -m "Descrição das alterações"

# 3. Envie para o GitHub
git push origin main

# 4. O GitHub Actions fará o deploy automaticamente!
```

## 🎨 Personalização do Domínio (Opcional)

Se você tiver um domínio próprio:

1. Vá em **Settings** > **Pages**
2. Em **Custom domain**, adicione seu domínio
3. Configure o DNS do seu domínio:
   - Tipo A apontando para IPs do GitHub:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Ou CNAME apontando para `SEU-USUARIO.github.io`

## 🛠️ Solução de Problemas

### Problema: Site não carrega corretamente

**Solução**: Verifique se o `base` no `vite.config.ts` está correto:
- Para `https://SEU-USUARIO.github.io/lasp-iiam/`: `base: '/lasp-iiam/'`
- Para domínio próprio: `base: '/'`
- Para root do GitHub Pages: `base: '/'`

### Problema: Deploy falha no GitHub Actions

**Solução**:
1. Vá em **Settings** > **Actions** > **General**
2. Em **Workflow permissions**, selecione:
   - ✅ "Read and write permissions"
3. Salve e tente novamente

### Problema: 404 ao acessar o site

**Solução**:
1. Verifique se o deploy foi concluído em **Actions**
2. Confirme a URL correta do GitHub Pages em **Settings** > **Pages**
3. Aguarde alguns minutos para propagação

## 📊 Estatísticas e Monitoramento

Após publicado, você pode:

1. **Monitorar acessos**: Use GitHub Insights ou Google Analytics
2. **Ver histórico de deploys**: Aba **Actions**
3. **Configurar notificações**: Settings > Notifications

## 🔒 Segurança

- ✅ Sempre use HTTPS (GitHub Pages fornece automaticamente)
- ✅ Não commite senhas ou chaves de API
- ✅ Mantenha dependências atualizadas
- ✅ Use variáveis de ambiente para dados sensíveis

## 📞 Suporte

Se encontrar problemas:

1. Verifique a [documentação oficial do GitHub Pages](https://docs.github.com/pages)
2. Consulte a [documentação do Vite](https://vitejs.dev/guide/static-deploy.html)
3. Entre em contato: munir.jussub@outlook.com

---

## ✅ Checklist de Deploy

- [ ] Repositório criado no GitHub
- [ ] Código commitado e enviado
- [ ] GitHub Actions configurado
- [ ] GitHub Pages ativado
- [ ] Deploy concluído com sucesso
- [ ] Site acessível na URL
- [ ] Todas as funcionalidades testadas
- [ ] README.md atualizado com link do site

**Parabéns! Seu sistema LASP está online! 🎉**

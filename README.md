# PointPro RH - Sistema de Gerenciamento de Funcionários

![PointPro RH](https://img.shields.io/badge/PointPro%20RH-v1.0.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Sobre o Projeto

O **PointPro RH** é um sistema ERP completo e moderno para gerenciamento de funcionários, desenvolvido com HTML5, CSS3 e JavaScript puro. O sistema oferece uma interface intuitiva e responsiva para administração de recursos humanos, incluindo cadastro de funcionários, geração de relatórios e configurações administrativas.

## ✨ Funcionalidades Principais

### 🔐 Sistema de Autenticação
- Login seguro com validação de credenciais
- Armazenamento de sessão no Local Storage
- Proteção de rotas e redirecionamento automático
- Opção "Lembrar-me" para persistência de login

### 📊 Dashboard Interativo
- Visão geral com estatísticas em tempo real
- Cards informativos com total de funcionários, ativos e departamentos
- Lista de funcionários recentes
- Gráficos de distribuição por departamento
- Ações rápidas para navegação

### 👥 Gerenciamento de Funcionários
- **Listagem completa** com visualização em tabela e grid
- **Filtros avançados** por nome, departamento e status
- **Cadastro de novos funcionários** com validação completa
- **Edição de dados** existentes
- **Exclusão** com confirmação de segurança
- **Máscaras automáticas** para telefone e CPF

### 📈 Sistema de Relatórios
- **Relatórios personalizados** com filtros por período, departamento e status
- **Relatórios rápidos** pré-configurados
- **Múltiplos formatos** de exportação (PDF, Excel, CSV)
- **Gráficos visuais** de distribuição e estatísticas
- **Histórico de relatórios** gerados
- **Download e re-geração** de relatórios anteriores

### ⚙️ Configurações Administrativas
- **Perfil do usuário** com edição de dados pessoais
- **Alteração de senha** com validação
- **Dados da empresa** (CNPJ, contatos, endereço)
- **Gerenciamento de departamentos** (criar, editar, excluir)
- **Preferências do sistema** (tema, notificações, formato de data)
- **Sistema de backup** completo com restauração
- **Informações de suporte** e contato

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica com tags apropriadas
- **CSS3**: Estilização moderna com Grid, Flexbox e animações
- **JavaScript ES6+**: Lógica de negócio e interatividade
- **Local Storage**: Persistência de dados no navegador
- **CSS Grid & Flexbox**: Layout responsivo e organizado
- **Media Queries**: Responsividade para todos os dispositivos

## 📁 Estrutura do Projeto

```
pointpro-rh/
├── index.html              # Página de login
├── dashboard.html          # Dashboard principal
├── funcionarios.html       # Listagem de funcionários
├── cadastro.html          # Cadastro/edição de funcionários
├── relatorios.html        # Sistema de relatórios
├── configuracoes.html     # Configurações do sistema
├── styles/
│   ├── main.css           # Estilos globais e layout
│   ├── login.css          # Estilos da página de login
│   ├── dashboard.css      # Estilos do dashboard
│   ├── funcionarios.css   # Estilos da listagem
│   ├── forms.css          # Estilos dos formulários
│   ├── relatorios.css     # Estilos dos relatórios
│   └── configuracoes.css  # Estilos das configurações
├── scripts/
│   ├── auth.js            # Sistema de autenticação
│   ├── employees.js       # Gerenciamento de funcionários
│   ├── login.js           # Lógica da página de login
│   ├── dashboard.js       # Lógica do dashboard
│   ├── funcionarios.js    # Lógica da listagem
│   ├── forms.js           # Validação de formulários
│   ├── cadastro.js        # Lógica do cadastro
│   ├── relatorios.js      # Sistema de relatórios
│   └── configuracoes.js   # Lógica das configurações
└── README.md              # Documentação do projeto
```

## 🚀 Como Executar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/pointpro-rh.git
   cd pointpro-rh
   ```

2. **Abra o projeto**:
   - Abra o arquivo `index.html` em um navegador web moderno
   - Ou use um servidor local como Live Server (VS Code) ou Python SimpleHTTPServer

3. **Credenciais de acesso**:
   - **E-mail**: admin@pointprorh.com
   - **Senha**: admin123

## 💻 Requisitos do Sistema

- **Navegador moderno** com suporte a ES6+ (Chrome 60+, Firefox 55+, Safari 12+)
- **JavaScript habilitado**
- **Local Storage disponível** (habilitado por padrão)

## 📱 Responsividade

O sistema é totalmente responsivo e otimizado para:

- **Desktop**: 1024px+ (layout completo com sidebar)
- **Tablet**: 768px - 1024px (layout adaptado)
- **Mobile**: < 768px (menu colapsível, layout vertical)

### Breakpoints Principais:
- `@media (max-width: 480px)`: Smartphones
- `@media (max-width: 768px)`: Tablets portrait
- `@media (max-width: 1024px)`: Tablets landscape
- `@media (min-width: 1025px)`: Desktop

## 🎨 Design System

### Paleta de Cores:
- **Primary**: #2563eb (Azul principal)
- **Success**: #16a34a (Verde para ações positivas)
- **Warning**: #ea580c (Laranja para avisos)
- **Danger**: #dc2626 (Vermelho para ações destrutivas)
- **Background**: #f8fafc (Fundo principal)
- **Surface**: #ffffff (Fundo de cards)

### Tipografia:
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Tamanhos**: 14px (base), 16px (médio), 24px (títulos)
- **Pesos**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 🔧 Funcionalidades Técnicas

### Armazenamento Local:
- `pointprorh_auth`: Dados de autenticação
- `pointprorh_employees`: Lista de funcionários
- `pointprorh_settings`: Configurações do sistema
- `pointprorh_departments`: Departamentos cadastrados
- `pointprorh_report_history`: Histórico de relatórios

### Validações Implementadas:
- **CPF**: Validação com dígitos verificadores
- **E-mail**: Regex para formato válido
- **Telefone**: Máscara automática (11) 99999-9999
- **Campos obrigatórios**: Validação em tempo real
- **Senhas**: Mínimo 6 caracteres

### Recursos de UX:
- **Loading states**: Indicadores visuais durante operações
- **Toast notifications**: Feedback imediato para ações
- **Modais de confirmação**: Para ações destrutivas
- **Auto-save**: Salvamento automático de rascunhos
- **Máscaras de input**: Formatação automática de dados

## 📊 Dados de Demonstração

O sistema vem com dados pré-cadastrados para demonstração:

- **5 funcionários** de diferentes departamentos
- **5 departamentos** padrão (Tecnologia, RH, Financeiro, Marketing, Vendas)
- **Configurações** básicas do sistema
- **Histórico** de relatórios de exemplo

## 🔒 Segurança

- **Validação client-side** para todos os formulários
- **Sanitização** de dados de entrada
- **Proteção de rotas** com redirecionamento
- **Armazenamento seguro** no Local Storage
- **Validação de sessão** em todas as páginas

## 🚧 Melhorias Futuras

- [ ] Integração com API backend
- [ ] Sistema de permissões por usuário
- [ ] Notificações push
- [ ] Exportação de relatórios em PDF real
- [ ] Sistema de anexos para funcionários
- [ ] Controle de ponto integrado
- [ ] Dashboard com gráficos interativos (Chart.js)
- [ ] Sistema de backup automático

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**PointPro RH Team**
- Website: [www.pointprorh.com](https://www.pointprorh.com)
- Email: contato@pointprorh.com
- Suporte: suporte@pointprorh.com

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o sistema:

- **E-mail**: suporte@pointprorh.com
- **Telefone**: (11) 3333-4444
- **Website**: www.pointprorh.com

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**
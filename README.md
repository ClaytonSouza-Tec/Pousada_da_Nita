# Pousada da Nita

Site institucional e protótipo de painel administrativo da Pousada da Nita. O projeto permite conhecer a pousada, consultar acomodações e serviços, verificar uma estimativa de hospedagem e entrar em contato com a equipe.

> **Importante:** esta versão é principalmente uma interface demonstrativa. Ela não usa um servidor nem um banco de dados. Reservas, indicadores financeiros e parte das informações do painel são exemplos; uma consulta no site não confirma uma reserva.

## O que o site faz

### Área pública

- **Início (`/`)**: apresenta a pousada, destaques, acomodações, serviços, galeria, avaliações, mapa e formulário para consultar uma estadia.
- **Sobre (`/sobre`)**: conta a proposta e a experiência da pousada.
- **Acomodações (`/acomodacoes`)**: mostra quartos e chalés, capacidade, comodidades, preço por noite e situação informada.
- **Serviços (`/servicos`)**: lista os serviços e as comodidades divulgados.
- **Galeria (`/galeria`)**: exibe imagens da pousada.
- **Localização (`/localizacao`)**: mostra o endereço e um mapa incorporado do Google Maps.
- **Contato (`/contato`)**: exibe telefone, WhatsApp, e-mail e endereço.
- **Políticas**: apresenta as políticas de reservas (`/politica-reservas`), cancelamento (`/cancelamento`) e privacidade (`/privacidade`).

### Consulta de hospedagem

O formulário da página inicial permite escolher datas, número de adultos e crianças e uma acomodação. Ele:

1. calcula a quantidade de noites e uma estimativa com base no preço cadastrado;
2. verifica se a data de saída é posterior à entrada e se a quantidade de hóspedes cabe na acomodação;
3. considera disponível somente uma acomodação marcada como **Disponível** nos dados do site;
4. se a consulta passar pelas validações, prepara uma mensagem com os detalhes para enviar pelo WhatsApp.

Essa verificação usa os dados estáticos do projeto. Ela não consulta um calendário real nem bloqueia datas; a equipe ainda precisa confirmar a disponibilidade.

### Área administrativa

O acesso começa em `/login`. Após a autenticação demonstrativa, o painel `/admin` oferece:

- **Dashboard**: indicadores, situação dos quartos e gráficos demonstrativos; permite imprimir/exportar a tela pelo navegador.
- **Reservas**: lista de exemplos de reservas. O botão para cadastrar uma nova reserva ainda não está integrado.
- **Clientes**: permite cadastrar, buscar, editar e remover clientes, além de registrar e consultar o histórico de hospedagens.
- **Quartos**: permite editar e remover acomodações existentes. O cadastro de novas acomodações ainda não está integrado.
- **Financeiro**: apresenta números ilustrativos, não lançamentos financeiros reais.
- **Configurações**: exibe os dados de contato usados pelo site; nesta versão eles não são editáveis pelo painel.

Os cadastros de clientes e as alterações nos quartos são guardados no `localStorage` do navegador. Isso significa que ficam naquele navegador e dispositivo, não são sincronizados entre usuários e podem ser apagados quando os dados locais forem removidos.

> **Segurança:** o login e a proteção das rotas são apenas demonstrativos e executados no próprio navegador. Não use esta autenticação para proteger informações reais ou dados de hóspedes. Um sistema de produção precisa de autenticação e autorização no servidor.

## Tecnologias

- React e TypeScript para a interface.
- Vite para desenvolvimento e geração da versão de produção.
- React Router para navegação entre páginas.
- CSS próprio em `src/styles/global.css`.
- `localStorage` para guardar alguns dados administrativos no navegador.

## Como executar

É necessário ter Node.js e npm instalados.

1. Abra um terminal na pasta do projeto.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor local:

   ```bash
   npm run dev
   ```

4. Abra no navegador o endereço exibido pelo Vite (por padrão, `http://localhost:5173`).

### Outros comandos

```bash
npm run build
```

Verifica os tipos TypeScript e cria a versão de produção na pasta `dist/`.

```bash
npm run preview
```

Inicia uma prévia local da versão compilada. Para usá-la, execute primeiro `npm run build`.

## Organização do projeto

```text
src/
  components/       Componentes compartilhados, como cabeçalho, rodapé e formulário de reserva
    admin/          Componentes específicos do painel administrativo
  data/             Textos, contatos, acomodações, serviços e outros dados de exemplo
  pages/            Páginas públicas, login e painel administrativo
  styles/           Estilos globais
public/             Arquivos públicos, como ícones e logotipos
index.html          Documento HTML inicial da aplicação
vite.config.ts      Configuração do servidor de desenvolvimento e do Vite
```

### Onde fazer alterações comuns

- Para mudar contatos, acomodações, serviços, avaliações ou políticas, consulte `src/data/siteData.ts`.
- Para alterar o menu e os endereços das páginas, consulte `src/App.tsx` e `src/data/siteData.ts`.
- Para ajustar a aparência global, consulte `src/styles/global.css`.
- Para alterar uma página específica, procure seu componente em `src/pages/`.

## Dados e integrações

Os conteúdos principais são definidos no código em `src/data/siteData.ts`. Algumas fotos vêm do Unsplash e os mapas são incorporados do Google Maps, então esses recursos dependem de conexão com a internet. O formulário de contato é apenas visual nesta versão: ele ainda não envia os dados para um serviço ou para a equipe.

Para transformar o protótipo em um sistema real, será necessário integrar um backend e um banco de dados, implementar autenticação segura, conectar reservas e disponibilidade a dados reais e configurar o envio do formulário de contato.

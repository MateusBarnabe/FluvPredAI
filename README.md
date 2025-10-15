# FluvPred - Sistema de Apoio à Decisão para Resiliência Climática

FluvPred é um sistema de apoio à decisão para gestão urbana e mudanças climáticas, funcionando como um "gêmeo digital" da cidade. Ele permite simular cenários climáticos, gerar relatórios de risco e obter recomendações de mitigação utilizando inteligência artificial.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:
*   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
*   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento.

### 1. Clone o Repositório

Primeiro, clone este repositório do GitHub para a sua máquina local:

```bash
git clone <URL_DO_SEU_REPOSITORIO_AQUI>
cd <NOME_DO_DIRETORIO_DO_PROJETO>
```

### 2. Instale as Dependências

Em seguida, instale todas as dependências do projeto usando npm ou yarn:

```bash
npm install
```
ou
```bash
yarn install
```

### 3. Configure as Variáveis de Ambiente

Este projeto utiliza a API do Google Gemini para suas funcionalidades de IA. Você precisará de uma chave de API para que funcione.

1.  Crie um arquivo chamado `.env` na raiz do projeto.
2.  Adicione a seguinte variável a este arquivo, substituindo `<SUA_CHAVE_DE_API_DO_GEMINI>` por sua chave real:

    ```
    GEMINI_API_KEY=<SUA_CHAVE_DE_API_DO_GEMINI>
    ```

    Você pode obter uma chave de API no [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Rode a Aplicação

O projeto requer dois processos rodando simultaneamente:
1.  A aplicação Next.js (o frontend).
2.  O servidor Genkit para as funcionalidades de IA.

Abra dois terminais na pasta do projeto e execute os seguintes comandos:

**No primeiro terminal (para a aplicação Next.js):**

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:9002`.

**No segundo terminal (para o Genkit):**

```bash
npm run genkit:watch
```

Este comando inicia o servidor Genkit e o mantém observando por alterações nos arquivos de IA.

### 5. Tudo Pronto!

Agora você pode acessar `http://localhost:9002` em seu navegador e utilizar a aplicação completa.

## Outros Scripts Disponíveis

*   `npm run build`: Compila a aplicação para produção.
*   `npm run start`: Inicia o servidor de produção após a compilação.
*   `npm run lint`: Executa o linter para verificar a qualidade do código.

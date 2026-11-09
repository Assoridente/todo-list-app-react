# Tarefas e Foco · React

Aplicação de produtividade que reúne lista de tarefas, sessões de concentração e um painel de inspiração personalizável.

Projeto de estudo de componentes React, estado, efeitos e construção de interfaces com Material UI.

## Funcionalidades

- Adicionar tarefas e validar entradas vazias ou duplicadas.
- Concluir tarefas com animação e retorno sonoro.
- Configurar uma sessão de foco, pausar, retomar e reiniciar o temporizador.
- Exibir ou ocultar o tempo restante.
- Alternar entre temas claro e escuro.
- Escolher uma imagem de fundo.
- Personalizar o painel de inspiração com texto e imagens.
- Receber aviso sonoro e, quando autorizado no navegador, notificação ao terminar uma sessão.

## Tecnologias

React 18 · JavaScript · Material UI 5 · Emotion · React Transition Group · Create React App.

## Como executar

Pré-requisitos: Node.js e npm compatíveis com as dependências do projeto.

```bash
git clone https://github.com/Assoridente/todo-list-app-react.git
cd todo-list-app-react
npm ci
npm start
```

Abra [http://localhost:3000](http://localhost:3000).

O repositório usa a branch padrão `master`. O arquivo `package-lock.json` registra as versões utilizadas.

## Comandos disponíveis

| Comando | Resultado |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção em `build/` |
| `npm test` | Abre o executor de testes do projeto |

O comando de testes existe no projeto, mas sua presença não significa que todos os fluxos tenham cobertura automatizada.

## Organização

```text
src/
  App.jsx                      estado das tarefas, tema e fundo
  index.jsx                    inicialização da aplicação
  components/
    TaskList.jsx               tarefas e conclusão
    Timer.jsx                  sessão de foco e notificações
    InspirationPanel.jsx       texto e imagens de inspiração
    App.css                    estilos da aplicação
    Timer.css                  transições do temporizador
public/                        página HTML e recursos públicos
```

## Dados e limitações

Os dados ficam no estado da aplicação durante a sessão. Tarefas, imagens e preferências não são salvos após recarregar a página; não há back-end, autenticação ou sincronização entre dispositivos.

O som e as notificações dependem das permissões e das políticas do navegador. A aplicação utiliza uma base Create React App existente; atualizar o ambiente de build é uma possível etapa de manutenção.

## Evolução

Esta aplicação amplia a proposta da [Lista de Tarefas Web](https://github.com/Assoridente/Projeto-trilha-todolist), organizada aqui com componentes e novas interações.

Próximas melhorias: persistência local, acessibilidade dos controles, cobertura dos fluxos de tarefas e temporizador e revisão das dependências.

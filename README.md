E-mail Menager ✔ <br>

> Descrição:
Projeto destinado ao desenvolvimento de uma API responsável por controlar os registros de clientes em uma base de dados, assim como registros de templates de e-mails relacionados ao envio periódico de e-mails aos clientes da base.

- [x] - Rota de criação de Inscritos com [name] e [e-mail].
- [x] - Rota de visualização dos Inscritos na base de dados.
- [x] - Rota de criação de template de e-mail com [template_name] e [position].
- [x] - Rota de visualização de todos os templates.
- [x] - Rota de visualização dos Inscritos que estão ativos [active].

**IMPORTANTE** - É possível testar todas as rotas por meio do localhost:3300/docs onde se encontra a página do SwaggerUI.

<img src="./src/img/print-swagger.PNG" alt="Rotas Swagger" /> 

> API ainda conta com uma rotina diária de atualização das mensagens que devem ser enviadas a seguir para os inscritos;

O projeto foi criado em:

- [x] - NodeJs
- [x] - Banco de dados [PostgreSQL]

### Como Executar o Projeto:

- Certifique-se de que você possua o SGBD PostgreSQL instalado em sua máquina.
- Certifique-se de que você possua o NodeJS instalado em sua máquina.
- Crie um banco de dados com o nome subscriptions ou o que você preferir, lembrando de modifcar os dados de conexão nas configurações do projeto.
- Crie 2 tabelas:
  [subscribers] = id, name, email, subscription_date, last_message, active.
  [message_flow] = id, template_name, position.
- Instale as dependências com yarn install ou npm install;
- Execute o projeto com yarn start ou npm run start;

## 🤝 Colaboradores

Pessoa que contribuiu para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://kain-prog.github.io/kain">
        <img src="./src/img/kain perfil 2 branco azul.jpeg" width="100px;" alt="Foto Kain"/><br>
        <sub>
          <b>Matheus Santos [Kain Developer]</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

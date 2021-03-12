import React from "react";
import styled from "styled-components";
import Background from "../components/background.png";

const ContainerPai = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  width: 40vw;
  border: 1px solid black;
  margin: 0 auto;
  box-sizing: border-box;
  background-image: url(${Background});
`;

const ContainerMensagens = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
`;

const ContainerInputs = styled.div`
  display: flex;
  margin: 5px;
`;
const InputUsuario = styled.input`
  width: 20%;
`;

const InputMensagem = styled.input`
  flex: 1;
`;

const BotaoEnviar = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  background-color: #4caf50; /* Green */
  color: white;
  margin-left: 5px;
  transition-duration: 0.4s;
  &:hover {
    background-color: #008000;
  }
`;

const BalaoDeMensagem = styled.div`
  max-width: 60%;
  min-width: 8%;
  margin-bottom: 1em;
  word-wrap: break-word;
  padding: 0.9em 0.8em;
  border-radius: 0.5em;
  font-weight: 450;
  line-height: 1.3;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.2);

  background-color: ${(props) => {
    if (props.tipo === "eu") {
      return "#DDF7C8";
    } else if (props.tipo === "outro") {
      return "#ffffff";
    }
  }};

  align-self: ${(props) => {
    if (props.tipo === "eu") {
      return "flex-end";
    } else {
      return "flex-start";
    }
  }};
`;

const ContainerUsuario = styled.div`
  color: #9aac8c;
  font-size: 0.8em;
  font-weight: 600;
  margin-bottom: 0.2em;
`;

export class Whats extends React.Component {
  state = {
    mensagens: [],
    valorInputUsuario: "",
    valorInputMensagem: "",
  };

  adicionaMensagem = () => {
    const novaMensagem = {
      usuario: this.state.valorInputUsuario,
      mensagem: this.state.valorInputMensagem,
    };
    if (novaMensagem.mensagem === "") {
      alert("Seu campo de mensagem está vazio!");
    } else {
      const novasMensagens = [...this.state.mensagens, novaMensagem];
      this.setState({ mensagens: novasMensagens });
      this.setState({ valorInputMensagem: "" });
    }
  };

  onChangeInputUsuario = (event) => {
    this.setState({ valorInputUsuario: event.target.value });
  };

  onChangeInputMensagem = (event) => {
    this.setState({ valorInputMensagem: event.target.value });
  };

  onClickEnter = (event) => {
    if (event.key === "Enter") {
      this.adicionaMensagem();
    }
  };

  excluiMensagem = (event) => {
    const novaListaDeMensagem = this.state.mensagens.filter((item) => {
      return item.mensagem !== event;
    });
    this.setState({
      mensagens: novaListaDeMensagem,
    });
  };

  render() {
    const listaDeMensagens = this.state.mensagens.map((mensagem) => {
      if (mensagem.usuario === "eu") {
        return (
          <BalaoDeMensagem
            tipo={"eu"}
            onDoubleClick={() => {
              this.excluiMensagem(mensagem.mensagem);
            }}
          >
            {mensagem.mensagem}
          </BalaoDeMensagem>
        );
      } else {
        return (
          <BalaoDeMensagem
            tipo={"outro"}
            onDoubleClick={() => {
              this.excluiMensagem(mensagem.mensagem);
            }}
          >
            <ContainerUsuario>{mensagem.usuario}</ContainerUsuario>
            {mensagem.mensagem}
          </BalaoDeMensagem>
        );
      }
    });

    return (
      <ContainerPai>
        <ContainerMensagens>{listaDeMensagens}</ContainerMensagens>
        <ContainerInputs>
          <InputUsuario
            type="text"
            placeholder={"Usuário"}
            onChange={this.onChangeInputUsuario}
            value={this.state.valorInputUsuario}
          />
          <InputMensagem
            type="text"
            placeholder={"Mensagem"}
            onChange={this.onChangeInputMensagem}
            value={this.state.valorInputMensagem}
            onKeyPress={this.onClickEnter}
          />
          <BotaoEnviar onClick={this.adicionaMensagem}>Enviar</BotaoEnviar>
        </ContainerInputs>
      </ContainerPai>
    );
  }
}

export default Whats;

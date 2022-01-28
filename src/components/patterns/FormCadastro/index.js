/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Lottie } from '@crello/react-lottie';
import PropTypes from 'prop-types';
import Grid from '../../foundation/layout/Grid';
import Box from '../../foundation/layout/Box';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';
import Text from '../../foundation/Text';
import loadingAnimation from './animations/loading.json';
import errorAnimation from './animations/error.json';
import successAnimation from './animations/success.json';

function FormContent() {
  const formStates = {
    DEFAULT: 'DEFAULT',
    DONE: 'DONE',
    LOADING: 'LOADING',
    ERROR: 'ERROR',
  };

  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState(formStates.DEFAULT);

  const [userInfo, setUserInfo] = React.useState({
    nome: 'anderson floriano',
    usuario: 'Anso2022-2',
  });

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  }

  const isFormInvalid = userInfo.nome.length === 0 || userInfo.usuario.length === 0;

  return (
    <form onSubmit={(event) => {
      event.preventDefault();

      setIsFormSubmitted(true);
      setSubmissionStatus(formStates.LOADING);

      const userDTO = {
        name: userInfo.nome,
        username: userInfo.usuario,
      };

      fetch('https://instalura-api.vercel.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDTO),
      })
        .then((result) => {
          if (result.ok) {
            return result.json();
          }

          throw new Error('Não foi possível cadastrar o usuário');
        })
        .then(() => {
          setSubmissionStatus(formStates.DONE);
        })
        .catch(() => {
          setSubmissionStatus(formStates.ERROR);

          setTimeout(() => {
            setSubmissionStatus(formStates.DEFAULT);
          }, 3000);
        });
    }}
    >
      <Text
        variant="title"
        tag="h1"
        color="tertiary.main"
      >
        Pronto para saber da vida dos outros?
      </Text>
      <Text
        variant="paragraph1"
        tag="p"
        color="tertiary.light"
        marginBottom="32px"
      >
        Você está a um passo de saber tudoo que está
        rolando no bairro, complete seu cadastro agora!
      </Text>

      <div>
        <TextField
          placeholder="Nome"
          name="nome"
          value={userInfo.nome}
          onChange={handleChange}
        />
      </div>

      <div>
        <TextField
          placeholder="Usuário"
          name="usuario"
          value={userInfo.usuario}
          onChange={handleChange}

        />
      </div>

      <Button fullWidth variant="primary.main" type="submit" disabled={isFormInvalid}>Cadastrar</Button>

      {isFormSubmitted && submissionStatus === formStates.LOADING && (
        <Box display="flex" justifyContent="center">
          <Lottie
            width="150px"
            height="150px"
            config={{
              animationData: loadingAnimation,
              loop: true,
              autoplay: true,
            }}
          />
        </Box>
      )}

      {isFormSubmitted && submissionStatus === formStates.DONE && (
      <Box display="flex" justifyContent="center">
        <Lottie
          width="150px"
          height="150px"
          config={{
            animationData: successAnimation,
            loop: false,
            autoplay: true,
          }}
        />
      </Box>
      )}

      {isFormSubmitted && submissionStatus === formStates.ERROR && (
      <Box display="flex" justifyContent="center">
        <Lottie
          width="150px"
          height="150px"
          config={{
            animationData: errorAnimation,
            loop: false,
            autoplay: true,
          }}
        />
      </Box>

      )}
    </form>
  );
}

export default function FormCadastro({ propsDoModal }) {
  return (
    <Grid.Row
      marginLeft={0}
      marginRight={0}
      flex={1}
      justifyContent="flex-end"
    >
      <Grid.Col
        display="flex"
        paddingRight={{ md: '0' }}
        flex={1}
        value={{ xs: 12, md: 5, lg: 4 }}
      >
        <Box
          boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flex={1}
          padding={{
            xs: '16px',
            md: '85px',
          }}
          backgroundColor="white"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...propsDoModal}
        >
          <FormContent />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}

FormCadastro.propTypes = {
  propsDoModal: PropTypes.object.isRequired,
};

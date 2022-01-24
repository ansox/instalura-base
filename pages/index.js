/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Menu from '../src/components/commons';
import Footer from '../src/components/commons/Footer';
import Text from '../src/components/foundation/Text';
import Button from '../src/components/commons/Button';
import Grid from '../src/components/foundation/layout/Grid';
import Box from '../src/components/foundation/layout/Box';
import Modal from '../src/components/commons/Modal';

export default function Home() {
  const [isModalOpen, setModalOpen] = React.useState(false);

  return (
    <Box
      flex="1"
      display="flex"
      flexWrap="wrap"
      flexDirection="column"
      justifyContent="space-between"
      backgroundImage="url(/images/bubbles.svg)"
      backgroundRepeat="no-repeat"
      backgroundPosition="bottom right"
    >

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {(propsDoModal) => (
          <Box
            backgroundColor="white"
            {...propsDoModal}
          >
            Conteudo 2
          </Box>
        )}
      </Modal>

      <Menu />

      <Grid.Container>
        <Grid.Row>
          <Grid.Col
            offset={{
              xs: 0,
              md: 1,
            }}
            value={{
              xs: 12,
              md: 5,
            }}
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            flexDirection="column"
          >
            <Text
              variant="title"
              tag="h1"
              color="tertiary.main"
              textAlign={{
                xs: 'center',
                md: 'left',
              }}
            >
              Compartilhe momentos e conecte-se com amigos
            </Text>
            <Text
              variant="paragraph1"
              tag="p"
              color="tertiary.light"
              textAlign={{
                xs: 'center',
                md: 'left',
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s.
            </Text>

            <Button
              display="block"
              margin={{
                xs: 'auto',
                md: 'initial',
              }}
              variant="primary.main"
              onClick={() => setModalOpen(!isModalOpen)}
            >
              Cadastrar
            </Button>
          </Grid.Col>
          <Grid.Col
            value={{
              xs: 12,
              md: 6,
            }}
          >
            <img
              alt="Imagem do site dentro de um celular"
              style={{ display: 'block', margin: 'auto' }}
              src="https://bootcamp-alura-01-git-modulo01.omariosouto.vercel.app/images/phones.png"
            />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>

      <Footer />
    </Box>
  );
}

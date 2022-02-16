import React from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';
import useForm from '../../../infra/hooks/forms/useForm';
import loginService from '../../../services/login/login.service';

const loginSchema = yup.object().shape({
  usuario: yup
    .string()
    .required('O usuário é obrigatório')
    .min(3, 'Preencha ao menos 3 caracteres'),
  senha: yup
    .string()
    .required('A senha é obrigatória')
    .min(8, 'Preencha ao menos 8 caracteres'),
});

export default function LoginForm() {
  const router = useRouter();

  const initialValues = {
    usuario: '',
    senha: '',
  };

  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      form.setIsFormDisabled(true);
      loginService.login({
        username: values.usuario,
        password: values.senha,
      })
        .then(() => {
          router.push('/app/profile/');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          form.setIsFormDisabled(false);
        });
    },
    async validateSchema(values) {
      return loginSchema.validate(values, { abortEarly: false });
    },
  });

  return (
    <form id="formCadastro" onSubmit={form.handleSubmit}>
      <TextField
        placeholder="Usuário"
        name="usuario"
        value={form.values.usuario}
        onChange={form.handleChange}
        error={form.errors.usuario}
        isTouched={form.touched.usuario}
        onBlur={form.handleBlur}
      />
      <TextField
        placeholder="Senha"
        name="senha"
        type="password"
        value={form.values.senha}
        onChange={form.handleChange}
        error={form.errors.senha}
        isTouched={form.touched.senha}
        onBlur={form.handleBlur}
      />

      <Button
        type="submit"
        variant="primary.main"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        fullWidth
        disabled={form.isFormDisabled}
      >
        Entrar
      </Button>
    </form>
  );
}

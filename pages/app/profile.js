/* eslint-disable react/destructuring-assignment */
import React from 'react';
import authService from '../../src/services/auth/authService';
import userService from '../../src/services/user/userService';

export default function ProfilePage(props) {
  return (
    <div>
      Página de Profile!
      {' '}
      {JSON.stringify(props)}
      <img src="https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif" alt="Nicolas Cage" />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);

  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    const profilePage = await userService.getProfilePage(ctx);

    return {
      props: {
        user: {
          name: session,
          posts: profilePage.posts,
        },
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login' });
  ctx.res.end();

  return {
    props: {},
  };
}

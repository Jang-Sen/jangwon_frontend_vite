import React from 'react';
import { useUserStore } from '../store/user-store.ts';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const { user: data, removeCredentials } = useUserStore();
  console.log('use User Store', useUserStore());
  console.log('profile user', data?.accessToken);

  const logoutHandler = (e) => {
    e.preventDefault();

    removeCredentials();

    navigate('/login');
  };

  return (
    <Container>
      {data?.user?.username}
      {data?.user?.email}

      <Button variant="primary" onClick={logoutHandler}>
        로그아웃
      </Button>
    </Container>
  );
};

export default Profile;

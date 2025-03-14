import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user-store.ts';
import { useGetProfile } from '../hooks/useAuthentication.ts';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const { removeCredentials } = useUserStore();

  const { data } = useGetProfile();

  console.log('@!@#!@#!@#!@#!@#!@#AAFEGE', data);

  const logoutHandler = (e) => {
    e.preventDefault();

    removeCredentials();

    navigate('/login');
  };

  return (
    <Container>
      {/*{data?.user?.username}*/}
      {/*{data?.user?.email}*/}

      <Button variant="primary" onClick={logoutHandler}>
        로그아웃
      </Button>
    </Container>
  );
};

export default Profile;

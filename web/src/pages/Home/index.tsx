import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

import logo from '../../assets/logo.svg';

const Home: React.FC = () => {
  return (
    <Container>
      <Content>
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>

        <main>
          <h1>Your waste collection marketplace</h1>
          <p>We help people find collection points efficiently.</p>

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Register a colect point</strong>
          </Link>
        </main>
      </Content>
    </Container>
  );
};

export default Home;

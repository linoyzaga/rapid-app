import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import LoginPage from 'containers/LoginPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  const token = localStorage.getItem('token');

  return (
    <AppWrapper>
      <Helmet
        defaultTitle="RapidAPI"
      >
        <meta name="description" content="RapidAPI project" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        {(token !== null)
          ? <Route path="/home" component={HomePage} />
          : <Redirect from="/home" to="/" />}
      </Switch>
    </AppWrapper>
  );
}

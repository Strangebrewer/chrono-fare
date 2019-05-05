import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import { GlobalStyle, Themes } from './styles';
import store from './store';
import App from './App';

const render = (
  <ThemeProvider theme={Themes.nightmode}>
    <ReduxProvider store={store}>
      <GlobalStyle />
      <App />
    </ReduxProvider>
  </ThemeProvider>
)

ReactDOM.render(render, document.getElementById('root'));
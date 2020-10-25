import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import styled from 'styled-components';

import Matrix from './Matrix';
import store from './store';

import reportWebVitals from './reportWebVitals';

import initData from './initData.json';

// try {
//   (async () => {
//     initData = await import('./initData.json');
//   })();
// } catch {
//   // Error('missing init data')
// }

const {M = 0, N = 0, X = 0} = initData;

const StyledMatrix = styled(Matrix)`
  display: grid;
  grid-template-rows: repeat(${initData.M + 1}, 1fr);
  grid-gap: 20px;

  & .matrix__row {
    display: grid;
    grid-template-columns: repeat(${initData.N + 2}, 1fr);
    grid-gap: 20px;
  }

  & .matrix__cell.highlighted {
    background-color: lightgreen;
  }

  & .matrix__cell.with-background {
    position: relative;

    & .matrix__cell-deco {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: lightgrey;
      z-index: -1;
    }
  }

  & .matrix__cell.with-background::after {
    content: ' %';
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledMatrix M={M} N={N} X={X} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

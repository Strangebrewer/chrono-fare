import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Inner } from './DesignCSS/navbar';
import Navbar from '../components/Navbar';

class Design extends Component {
   render() {
      return (
         <>
            <Navbar />
            <Content>
               Narf!
            </Content>
         </>
      );
   }
}

export default Design;

const Content = styled.div`
   width: 900px;
   min-height: 100vh;
   margin: auto;
   background: #111;
`;
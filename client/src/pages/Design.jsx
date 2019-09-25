import React, { Component } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

class Design extends Component {
    state = {
        squares: []
    }

    renderSquares = (row_num) => {
        const squares = [];
        for (let i = 0; i < 12; i++) {
            let color;
            if ((row_num + i) % 2 === 0) color = '#26a3ec'
            else color = '#0baa82';
            squares.push(<Square key={(i + 1) * row_num} row={`${row_num}`} column={`${i + 1}`} bg={`${color}`} rotate={`-${row_num * i}deg`} radius="5px" />)
        }
        return squares;
    }

    render() {

        return (
            <>
                <Navbar />
                <Content>
                    {this.renderSquares(1)}
                    {this.renderSquares(2)}
                    {this.renderSquares(3)}
                    {this.renderSquares(4)}
                    {this.renderSquares(5)}
                    {this.renderSquares(6)}
                    {this.renderSquares(7)}
                    {this.renderSquares(8)}
                    {this.renderSquares(9)}
                    {this.renderSquares(10)}
                    {this.renderSquares(11)}
                    {this.renderSquares(12)}
                    <Square row="1/5" column="1/5" bg="blue" style={{ boxShadow: '20px 20px 20px #000' }} radius="50%" nabro />
                    <Square row="1/4" column="5/8" bg="blue" style={{ boxShadow: '20px 20px 20px #000' }} radius="50%" nabro />
                    <Square row="1/3" column="8/10" bg="blue" style={{ boxShadow: '20px 20px 20px #000' }} radius="50%" nabro />
                    <Square row="6/12" column="1/7" bg="blue" style={{ boxShadow: '20px 20px 20px #000' }} radius="50%" nabro />
                    <Square row="4/8" column="6/10" bg="blue" style={{ boxShadow: '20px 20px 20px #000' }} radius="50%" nabro />
                    <Square row="2/4" column="10/12" bg="blue" style={{ boxShadow: '20px 20px 20px #000' }} radius="50%" nabro />
                    <Square row="9/13" column="7/11" bg="blue" style={{ boxShadow: '20px 20px 20px #000' }} radius="50%" nabro />
                    <Square row="7/10" column="10/13" bg="blue" style={{ boxShadow: '20px 20px 20px #000' }} radius="50%" nabro />
                    <Square row="4/6" column="11/13" bg="blue" style={{ boxShadow: '20px 20px 20px #000' }} radius="50%" nabro />
                </Content>
            </>
        );
    }
}

export default Design;

const Content = styled.div`
   border-radius: 100px;
   display: grid;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: repeat(12, 1fr);
   grid-gap: 40px;
   width: 800px;
   height: 800px;
   margin: 30px auto;
   padding: 30px;
   background: linear-gradient(60deg, #000, #d0ff00, #000, #1bff54, #000, #1c5ae0, #000, #8221f0, #000, #bb1717, #000, #e76921, #000);
`;

const Square = styled.div`
   width: 100%;
   height: 100%;
   margin: auto;
   grid-row: ${props => props && props.row};
   grid-column: ${props => props && props.column};
   border: 1px solid ${props => props.bg};
   background-color: ${props => props.bg};
   box-shadow: 9px 9px 5px #000;
   transform: ${props => props.rotate && `rotate(${props.rotate})`};
   border-radius: ${props => props.radius};
   border: ${props => props.nabro ? '4px dotted white' : '2px solid #ff00f2'};
`;
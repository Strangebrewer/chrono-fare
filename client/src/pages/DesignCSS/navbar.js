import styled from 'styled-components';

export const Container = styled.div`
width: 100%;
background: #ffffff22;
`;

export const Inner = styled.div`
width: 800px;
max-width: 80%;
margin: auto;
font-size: 18px;
text-align: center;
display: flex;
justify-self: end;
a {
  text-decoration: none;
}
button {
  background: none;
  border: 0;
  color: #26a3ec;
  cursor: pointer;
  height: 50px;
  min-width: 75px;
  padding: 0 12px;
  display: flex;
  justify-content: center;
  position: relative;
  &:before {
    content: '';  
    width: 2px;
    height: 100%;
    left: 0;
    position: absolute;
    transform: skew(-20deg);
    top: 0;
    bottom: 0;
    background-color: #0baa82;
  }
  &:after {
    height: 2px;
    background: red;
    content: '';
    width: 0;
    position: absolute;
    transform: translateX(-50%);
    transition: width 0.4s;
    transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
    left: 50%;
    margin-top: 2rem;
  }
  &:hover {
    color: #fff;
    transition: color .15s ease-in-out;
  }
}
`;
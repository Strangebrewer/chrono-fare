import React, { Fragment, useState } from "react";
import styled from 'styled-components';

const ModalLogic = props => {

   const [isOpen, setIsOpen] = useState(false);
   const [body, setBody] = useState('');
   const [buttons, setButtons] = useState('');
   const [style, setStyle] = useState({});

   const closeModal = () => {
      setIsOpen(false);
      setBody('');
      setButtons('');
      setStyle({});
   };

   const setModal = modalInput => {
      setIsOpen(true);
      setBody(modalInput.body);
      setButtons(modalInput.buttons);
      setStyle(modalInput.style);
   };

   const outsideClick = event => {
      if (event.target.className.includes("modal"))
         closeModal();
   };

   return (
      <Fragment>
         {isOpen &&
            <Outer className="modal" onClick={outsideClick}>
               <Content style={style}>
                  <Button onClick={closeModal}>&times;</Button>
                  <Body>
                     {body}
                     <Buttons>
                        {buttons}
                     </Buttons>
                  </Body>
               </Content>
            </Outer>
         }
         {props.children({ closeModal, setModal })}
      </Fragment>
   )
}

export default ModalLogic;

// styles
const Outer = styled.div`
   background-color: rgba(0, 0, 0, 0.4);
   display: flex;
   height: 100%;
   overflow: auto;
   position: fixed;
   left: 0;
   top: 0;
   width: 100%;
   z-index: 99;
`;

const Content = styled.div`
   animation-duration: 0.4s;
   animation-name: fadein;
   background: linear-gradient(rgba(38, 212, 204, 0.267), rgba(38, 212, 204, 0.267)),
    linear-gradient(rgb(0,0,0), rgb(0,0,0));
   background-color: #181818;
   border: 1px solid ${props => props.theme.green};
   border-radius: 12px;
   font-size: 1.8rem;
   max-width: 60%;
   min-width: 300px;
   margin: auto;
   padding: 0;
   position: relative;
   img {
      border: 1px solid black;
   }
   @keyframes fadein {
      from { opacity: 0; }
      to { opacity: 1; }
   }
`;

const Button = styled.button`
   background-color: transparent;
   border: none;
   color: #1d928c;
   font-size: 20px;
   outline: transparent;
   position: absolute;
   top: 5px;
   right: 5px;
   &:hover, &:focus {
      color: #26d4cc;
      cursor: pointer;
      text-decoration: none;
   }
`;

const Body = styled.div`
   margin: auto;
   max-width: 100%;
   padding: 40px;
   z-index: 999;
`;

const Buttons = styled.div`
   text-align: center;
   width: 100%;
   button, a {
      background-color: #1d928c;
      border: none;
      border-radius: 5px;
      color: #fff;
      display: ${props => props.center ? 'block' : 'inline'};
      font-size: ${props => props.full && '1.8rem'};
      height: ${props => props.full && '40px'};
      margin: 15px 15px 0 0;
      outline: transparent;
      padding: 8px 12px;
      text-shadow: 0 0 5px #000;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      width: ${props => props.full && '100%'};
   }
   button:hover, a:hover {
      background-color: #26d4cc;
   }
   button:last-child {
      margin: 15px 0 0 0;
   }
`;
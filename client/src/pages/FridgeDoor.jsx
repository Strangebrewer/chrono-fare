import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { searchUsersAction } from '../redux/actions/user_actions';

const FridgeDoor = props => {

   console.log('FridgeDoor props:::', props);

   const userSearch = () => {
      props.searchUsersAction({
         search_term: 'gmail', // fix search to exclude: '@', the domain (i.e. 'gmail'), and '.com', '.net', etc.
         page: 1,
         limit: 10
      });
   }
   return (
      <Container>
         <Navbar />
         <Header>
            <img src="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/59286203_10156753407078591_2112737826431827968_n.jpg?_nc_cat=108&_nc_oc=AQmW55ETi3C-kRF3y_SNJdEjwDslJaL4A3BO_ZpWqVWBvtJoSgijJKnkenzSy-WZhVQ&_nc_ht=scontent-sjc3-1.xx&oh=9ccf629e0213924ce3605a8ef71f2fe3&oe=5D2B2184" alt="" />
            <h2>Carrie</h2>
            <button onClick={userSearch}>Derp!</button>
         </Header>
         <FriendsList>
            {/* {props.friends.map(friend => (
                  <p>{friend.name}</p>
               ))} */}
            <p>Jimbob</p>
            <p>Bubba</p>
            <p>Calypso</p>
         </FriendsList>
         <div>
            {props.user_search.map((user, index) => (
               <div key={index}>
                  <h2>{user.username}</h2>
                  <p>{user.email}</p>
               </div>
            ))}
         </div>
      </Container>
   )
}

function mapStateToProps(state) {
   return {
      user_search: state.user_search
   }
}

function mapDispatchToProps(dispatch) {
   return {
      searchUsersAction: search_criteria => {
         dispatch(searchUsersAction(search_criteria));
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(FridgeDoor);

const Container = styled.div`
   /* width: 100%; */
   min-height: 100vh;
   display: flex;
   flex-direction: column;
`;

const Header = styled.div`
   img {
      width: 120px;
      height: 120px;
      margin: 20px auto 0 auto;
      display: block;
      border-radius: 50%;
      /* border: 3px solid ${props => props.theme.blue}; */
   }
   h2 {
      font-size: 24px;
      margin: 10px 0;
      text-align: center;
   }
`;

const FriendsList = styled.div`
   width: 50%;
   float: left;
`;
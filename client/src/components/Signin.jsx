import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signInAction } from '../redux/actions';
import { connect } from 'react-redux';

class Signin extends Component {
  submit = values => {
    console.log("Values: ", values);
    this.props.signInAction(values, this.props.history);
  }

  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    console.log("Signin props: ", this.props)
    const { handleSubmit } = this.props;
    return (
      <div className='form'>
        <div className="container">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit(this.submit)}>
            <Field
              name="username"
              component="input"
              type="text"
            />
            <Field
              name="password"
              component="input"
              type="password"
            />
            <button type="submit" className="blue">Sign In</button>
          </form>
          {this.errorMessage()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const reduxFormSignin = reduxForm({ form: 'signin' })(Signin);

export default connect(mapStateToProps, {signInAction})(reduxFormSignin);
import React, { Component } from 'react';
import Field from 'components/form/field';
import Label from 'components/form/label';
import Control from 'components/form/control';
import TextInput from 'components/form/text-input';
import PasswordInput from 'components/form/password-input';
import Validation from 'components/form/validation';
import SessionService from 'services/session-service';
import reject from 'lib/reject';
import extend from 'lib/extend';
import AccountService from 'services/account-service';
import AccountContext from 'contexts/account-context';
import { withRouter } from 'react-router-dom';
import Paths from 'paths';
import SubmitButton from 'components/submit-button';

class LoginView extends Component {
  static contextType = AccountContext
  state = {
    email: null,
    password: null,
    loading: false,
    errors: {},
  }

  render() {
    return (
      <form onSubmit={e => {e.preventDefault(); this.submit()}}>
        <span>Log in</span>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Control>
            <TextInput
              id="email"
              isDanger={this.state.errors.base != null}
              disabled={this.state.loading}
              onChange={e => this.setState({ email: e.target.value })}
              autoComplete="username"
            />
          </Control>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Control>
            <PasswordInput
              id="password"
              isDanger={this.state.errors.base != null}
              disabled={this.state.loading}
              onChange={e => this.setState({ password: e.target.value })}
              autoComplete="current-password"
            />
          </Control>
          <Validation error={this.state.errors.base} />
        </Field>
        <SubmitButton
          isPrimary={true}
          onClick={this.submit}
          isLoading={this.state.loading}
          disabled={this.state.loading}
        >
          Submit
        </SubmitButton>
      </form>
    )
  }

  submit = () => {
    const { email, password, errors } = this.state
    this.setState({ loading: true, errors: reject(errors, 'base') })

    SessionService.logIn({ email, password })
      .then(() => {
        AccountService
          .current()
          .then(this.context.setCurrentAccount)
          .then(() => {
            this.props.history.push(Paths.Root)
          })
      })
      .catch(() => {
        this.setState(s => extend(s, { errors: { base: 'Invalid email or password'} }))
      })
      .finally(() => {
        this.setState(s => extend(s, { loading: false }))
      })
  }
}
export default withRouter(LoginView)

import React, { Component } from 'react';
import Field from 'components/form/field';
import Label from 'components/form/label';
import Control from 'components/form/control';
import TextInput from 'components/form/text-input';
import PasswordInput from 'components/form/password-input';
import Button from 'components/button';
import Validation from 'components/form/validation';
import SessionService from 'services/session-service';
import reject from 'lib/reject';
import extend from 'lib/extend';
import AccountService from 'services/account-service';
import AccountContext from 'contexts/account-context';

export default class LoginView extends Component {
  static contextType = AccountContext
  state = {
    email: null,
    password: null,
    loading: false,
    errors: {},
  }

  render() {
    return (
      <form>
      <span>Log in</span>
      <Field>
        <Label htmlFor="email">Email</Label>
        <Control>
          <TextInput
            id="email"
            isDanger={this.state.errors.base != null}
            disabled={this.state.loading}
            onChange={e => this.setState({ email: e.target.value })}
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
          />
        </Control>
        <Validation error={this.state.errors.base} />
      </Field>
      <Button
        isPrimary={true}
        onClick={this.submit}
        isLoading={this.state.loading}
        disabled={this.state.loading}
      >
        Submit
      </Button>
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
      })
      .catch(() => {
        this.setState(s => extend(s, { errors: { base: 'Invalid email or password'} }))
      })
      .finally(() => {
        this.setState(s => extend(s, { loading: false }))
      })
  }
}

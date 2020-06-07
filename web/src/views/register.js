import React, { Component } from 'react';
import Field from 'components/form/field';
import Label from 'components/form/label';
import Control from 'components/form/control';
import TextInput from 'components/form/text-input';
import PasswordInput from 'components/form/password-input';
import Button from 'components/button';
import Validation from 'components/form/validation';

import extend from 'lib/extend'
import isEmail from 'validator/es/lib/isEmail'
import reject from 'lib/reject';
import isEmpty from 'lib/is-empty';
import pipe from 'lib/pipe';
import AccountService from 'services/account-service';
import { withRouter } from 'react-router-dom';
import Paths from 'paths';

class RegisterView extends Component {
  state = {
    name: null,
    email: null,
    password: null,
    passwordConfirmation: null,
    loading: false,
    errors: {},
  }

  render() {
    const { errors } = this.state
    return (
      <form>
      <span>Create an account</span>
      <Field>
        <Label htmlFor="name">Name</Label>
        <Control>
          <TextInput
            id="name"
            isDanger={this.state.errors.name != null}
            disabled={this.state.loading}
            onBlur={() => this.setState({ errors: extend(errors, this.validateName())})}
            onFocus={() => this.clearValidation('name')}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </Control>
        <Validation error={this.state.errors.name} />
      </Field>
      <Field>
        <Label htmlFor="email">Email</Label>
        <Control>
          <TextInput
            id="email"
            isDanger={this.state.errors.email != null}
            disabled={this.state.loading}
            onBlur={() => this.setState({ errors: extend(errors, this.validateEmail())})}
            onFocus={() => this.clearValidation('email')}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </Control>
        <Validation error={this.state.errors.email} />
      </Field>
      <Field>
        <Label htmlFor="password">Password</Label>
        <Control>
          <PasswordInput
            id="password"
            isDanger={this.state.errors.password != null}
            disabled={this.state.loading}
            onBlur={() => this.setState({ errors: extend(errors, this.validatePassword())})}
            onFocus={() => this.clearValidation('password')}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </Control>
        <Validation error={this.state.errors.password} />
      </Field>
      <Field>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Control>
          <PasswordInput
            id="confirm-password"
            isDanger={this.state.errors.passwordConfirmation != null}
            disabled={this.state.loading}
            onBlur={() => this.setState({ errors: extend(errors, this.validatePasswordConfirmation())})}
            onFocus={() => this.clearValidation('passwordConfirmation')}
            onChange={e => this.setState({ passwordConfirmation: e.target.value })}
          />
        </Control>
        <Validation error={this.state.errors.passwordConfirmation} />
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

  validateName = () => {
    const { name } = this.state
    const MAX_LENGTH = 255
    if (name === '' || name == null) {
      return { name: "Must be filled" }
    } else if (name.length > MAX_LENGTH) {
      return { name: "Name may be max 255 characters long" }
    }
  }

  validateEmail = () => {
    const { email } = this.state
    const MAX_LENGTH = 255
    if (email === '' || email == null) {
      return { email: "Must be filled" }
    } else if (!isEmail(email)) {
      return { email: "Invalid email address" }
    } else if (email.length > MAX_LENGTH) {
      return { email: "Email may be max 255 characters long" }
    }
  }

  validatePassword = () => {
    const { password } = this.state
    const MIN_LENGTH = 8
    const MAX_LENGTH = 32
    if (password === '' || password == null) {
      return { password: "Must be filled" }
    } else if (password.length < MIN_LENGTH) {
      return { password: "Password must be at least 8 characters long" }
    } else if (password.length > MAX_LENGTH) {
      return { password: "Password may be max 32 characters long" }
    }
  }

  validatePasswordConfirmation = () => {
    const { passwordConfirmation, password } = this.state
    if (passwordConfirmation !== password) {
      return { passwordConfirmation: "Doesn't match password" }
    }
  }

  clearValidation = (field) => {
    this.setState({errors: reject(this.state.errors, field)})
  }

  validate = () => {
    const errors = pipe(
      {},
      x => extend(x, this.validateName()),
      x => extend(x, this.validateEmail()),
      x => extend(x, this.validatePassword()),
      x => extend(x, this.validatePasswordConfirmation())
    )
    this.setState({ errors })
    return errors
  }

  submit = () => {
    if (this.isValid()) {
      this.setState({ loading: true })
      const { name, email, password } = this.state
      AccountService
        .create({ name, email, password })
        .then(() => {
          this.props.history.push(Paths.RegisterSuccess)
        })
    }
  }

  isValid = () => isEmpty(this.validate())
}
export default withRouter(RegisterView)

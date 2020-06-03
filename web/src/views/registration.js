import React, { Component } from 'react';
import Field from 'components/form/field';
import Label from 'components/form/label';
import Control from 'components/form/control';
import TextInput from 'components/form/text-input';
import PasswordInput from 'components/form/password-input';

export default class Registration extends Component {
  render() {
    return (
      <form>
      <span>Create an account</span>
      <Field>
        <Label>Name</Label>
        <Control>
          <TextInput />
        </Control>
      </Field>
      <Field>
        <Label>Email</Label>
        <Control>
          <TextInput />
        </Control>
      </Field>
      <Field>
        <Label>Password</Label>
        <Control>
          <PasswordInput />
        </Control>
      </Field>
      <Field>
        <Label>Confirm Password</Label>
        <Control>
          <PasswordInput />
        </Control>
      </Field>
    </form>
    )
  }
}

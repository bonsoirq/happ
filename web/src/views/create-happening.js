import React, { Component } from 'react';
import Field from 'components/form/field';
import Label from 'components/form/label';
import Control from 'components/form/control';
import TextInput from 'components/form/text-input';
import Validation from 'components/form/validation';

import extend from 'lib/extend'
import reject from 'lib/reject';
import isEmpty from 'lib/is-empty';
import pipe from 'lib/pipe';
import SubmitButton from 'components/submit-button';
import Form from 'components/form/form';
import Button from 'components/button';

import ModalCard from 'components/modal/modal-card';
import ModalCardHead from 'components/modal/modal-card-head';
import ModalCardContent from 'components/modal/modal-card-content';
import ModalCardFoot from 'components/modal/modal-card-foot';
import HappeningService from 'services/happening-service';
import Textarea from 'components/form/textarea';

export default class CreateHappeningView extends Component {
  state = {
    name: null,
    description: null,
    organizerDescription: null,
    agenda: null,
    loading: false,
    errors: {}
  }

  render() {
    const { errors } = this.state
    return (
      <ModalCard>
        <ModalCardHead
          title="Create new happening"
          onClose={this.props.onClose}
        />
        <ModalCardContent>
          <Form onSubmit={this.submit}>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Control>
                <TextInput
                  id="name"
                  isDanger={this.state.errors.name != null}
                  disabled={this.state.loading}
                  onBlur={() => this.setState({ errors: extend(errors, this.validateName()) })}
                  onFocus={() => this.clearValidation('name')}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </Control>
              <Validation error={this.state.errors.name} />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Control>
                <Textarea
                  id="description"
                  isDanger={this.state.errors.description != null}
                  disabled={this.state.loading}
                  onBlur={() => this.setState({ errors: extend(errors, this.validateDescription()) })}
                  onFocus={() => this.clearValidation('description')}
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </Control>
              <Validation error={this.state.errors.description} />
            </Field>
            <Field>
              <Label htmlFor="organizer-description">Organizer description</Label>
              <Control>
                <Textarea
                  id="organizer-description"
                  isDanger={this.state.errors.organizerDescription != null}
                  disabled={this.state.loading}
                  onBlur={() => this.setState({ errors: extend(errors, this.validateOrganizerDescription()) })}
                  onFocus={() => this.clearValidation('organizerDescription')}
                  onChange={e => this.setState({ organizerDescription: e.target.value })}
                />
              </Control>
              <Validation error={this.state.errors.organizerDescription} />
            </Field>
            <Field>
              <Label htmlFor="agenda">Agenda</Label>
              <Control>
                <Textarea
                  id="agenda"
                  isDanger={this.state.errors.agenda != null}
                  disabled={this.state.loading}
                  onBlur={() => this.setState({ errors: extend(errors, this.validateAgenda()) })}
                  onFocus={() => this.clearValidation('agenda')}
                  onChange={e => this.setState({ agenda: e.target.value })}
                />
              </Control>
              <Validation error={this.state.errors.agenda} />
            </Field>
          </Form>
        </ModalCardContent>
        <ModalCardFoot>
          <Button
            onClick={this.props.onClose}
          >
            Cancel
          </Button>
          <SubmitButton
            isPrimary={true}
            onClick={this.submit}
            isLoading={this.state.loading}
            disabled={this.state.loading}
          >
            Create
          </SubmitButton>
        </ModalCardFoot>
      </ModalCard>
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

  validateDescription = () => {
    const { description } = this.state
    const MAX_LENGTH = 2047
    if (description === '' || description == null) {
      return { description: "Must be filled" }
    } else if (description.length > MAX_LENGTH) {
      return { description: "Description may be max 2047 characters long" }
    }
  }

  validateOrganizerDescription = () => {
    const { organizerDescription } = this.state
    const MAX_LENGTH = 2047
    if (organizerDescription === '' || organizerDescription == null) {
      return { organizerDescription: "Must be filled" }
    } else if (organizerDescription.length > MAX_LENGTH) {
      return { organizerDescription: "Organizer description may be max 2047 characters long" }
    }
  }

  validateAgenda = () => {
    const { agenda } = this.state
    const MAX_LENGTH = 2047
    if (agenda === '' || agenda == null) {
      return { agenda: "Must be filled" }
    } else if (agenda.length > MAX_LENGTH) {
      return { agenda: "Agenda may be max 2047 characters long" }
    }
  }

  clearValidation = (field) => {
    this.setState({ errors: reject(this.state.errors, field) })
  }

  validate = () => {
    const errors = pipe(
      {},
      x => extend(x, this.validateName()),
      x => extend(x, this.validateDescription()),
      x => extend(x, this.validateOrganizerDescription()),
      x => extend(x, this.validateAgenda())
    )
    this.setState({errors})
    return errors
  }

  submit = () => {
    if (this.isValid()) {
      this.setState({ loading: true })
      const { name, description, organizerDescription, agenda } = this.state
      HappeningService
        .create({ name, description, organizerDescription, agenda })
        .then(happening => {
          this.props.onCreate(happening)
          this.props.onClose()
        })
    }
  }

  isValid = () => isEmpty(this.validate())
}

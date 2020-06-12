import React from 'react';
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

export default function CreateHappeningView ({self, onClose}) {
  var validateName = () => {
    const { name } = self.state
    const MAX_LENGTH = 255
    if (name === '' || name == null) {
      return { name: "Must be filled" }
    } else if (name.length > MAX_LENGTH) {
      return { name: "Name may be max 255 characters long" }
    }
  }

  var validateDescription = () => {
    const { description } = self.state
    const MAX_LENGTH = 255
    if (description === '' || description == null) {
      return { description: "Must be filled" }
    } else if (description.length > MAX_LENGTH) {
      return { description: "Description may be max 255 characters long" }
    }
  }

  var validateOrganizerDescription = () => {
    const { organizerDescription } = self.state
    const MAX_LENGTH = 255
    if (organizerDescription === '' || organizerDescription == null) {
      return { organizerDescription: "Must be filled" }
    } else if (organizerDescription.length > MAX_LENGTH) {
      return { organizerDescription: "Organizer description may be max 255 characters long" }
    }
  }

  var validateAgenda = () => {
    const { agenda } = self.state
    const MAX_LENGTH = 255
    if (agenda === '' || agenda == null) {
      return { agenda: "Must be filled" }
    } else if (agenda.length > MAX_LENGTH) {
      return { agenda: "Agenda may be max 255 characters long" }
    }
  }

  var clearValidation = (field) => {
    self.setState({errors: reject(self.state.errors, field)})
  }

  var validate = () => {
    const errors = pipe(
      {},
      x => extend(x, validateName()),
      x => extend(x, validateDescription()),
      x => extend(x, validateOrganizerDescription()),
      x => extend(x, validateAgenda())
    )
    self.setState({ errors })
    return errors
  }

  var submit = () => {
    if (isValid()) {
      self.setState({ loading: true })
      const { name, description, organizerDescription, agenda } = self.state
      onClose()
    }
  }

  var isValid = () => isEmpty(validate())

  const { errors } = self.state

  return <ModalCard>
    <ModalCardHead
      title="Create new happening"
      onClose={onClose}
    />
    <ModalCardContent>
      <Form onSubmit={submit}>
        <Field>
          <Label htmlFor="name">Name</Label>
          <Control>
            <TextInput
              id="name"
              isDanger={self.state.errors.name != null}
              disabled={self.state.loading}
              onBlur={() => self.setState({ errors: extend(errors, validateName())})}
              onFocus={() => clearValidation('name')}
              onChange={e => self.setState({ name: e.target.value })}
            />
          </Control>
          <Validation error={self.state.errors.name} />
        </Field>
        <Field>
          <Label htmlFor="description">Description</Label>
          <Control>
            <TextInput
              id="description"
              isDanger={self.state.errors.description != null}
              disabled={self.state.loading}
              onBlur={() => self.setState({ errors: extend(errors, validateDescription())})}
              onFocus={() => clearValidation('description')}
              onChange={e => self.setState({ description: e.target.value })}
            />
          </Control>
          <Validation error={self.state.errors.description} />
        </Field>
        <Field>
          <Label htmlFor="organizer-description">Organizer description</Label>
          <Control>
            <TextInput
              id="organizer-description"
              isDanger={self.state.errors.organizerDescription != null}
              disabled={self.state.loading}
              onBlur={() => self.setState({ errors: extend(errors, validateOrganizerDescription())})}
              onFocus={() => clearValidation('organizerDescription')}
              onChange={e => self.setState({ organizerDescription: e.target.value })}
            />
          </Control>
          <Validation error={self.state.errors.organizerDescription} />
        </Field>
        <Field>
          <Label htmlFor="agenda">Agenda</Label>
          <Control>
            <TextInput
              id="agenda"
              isDanger={self.state.errors.agenda != null}
              disabled={self.state.loading}
              onBlur={() => self.setState({ errors: extend(errors, validateAgenda())})}
              onFocus={() => clearValidation('agenda')}
              onChange={e => self.setState({ agenda: e.target.value })}
            />
          </Control>
          <Validation error={self.state.errors.agenda} />
        </Field>
      </Form>
    </ModalCardContent>
    <ModalCardFoot>
      <Button
        onClick={onClose}
      >
        Cancel
      </Button>
      <SubmitButton
        isPrimary={true}
        onClick={submit}
        isLoading={self.state.loading}
        disabled={self.state.loading}
      >
        Create
      </SubmitButton>
    </ModalCardFoot>
  </ModalCard>
}

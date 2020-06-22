import React, { Component } from 'react';

import SubmitButton from 'components/submit-button';
import Button from 'components/button';

import ModalCard from 'components/modal/modal-card';
import ModalCardHead from 'components/modal/modal-card-head';
import ModalCardContent from 'components/modal/modal-card-content';
import ModalCardFoot from 'components/modal/modal-card-foot';
import FileInput from 'components/form/file-input';
import Form from 'components/form/form';
import Label from 'components/form/label';
import Field from 'components/form/field';
import Control from 'components/form/control';
import Validation from 'components/form/validation';
import Image from 'components/image';

import grayBackground from 'images/gray-bg.jpg';
import { readFileAsURL } from 'lib/read-file-as-url';

export default class CreateHappeningImageView extends Component {
  state = {
    loading: false,
    imagePath: grayBackground,
    errors: {}
  }

  render () {
    return (
      <ModalCard>
        <ModalCardHead
          title="Add a logo"
          onClose={this.props.onClose}
        />
        <ModalCardContent>
          <Form onSubmit={this.submit}>
            <Field>
              <Label>Preview</Label>
              <Image is3by1={true} isLoading={true} src={this.state.imagePath}/>
            </Field>
            <Field>
              <Label htmlFor="file">File</Label>
              <Control>
                <FileInput
                  id="file"
                  isDanger={this.state.errors.file != null}
                  onChange={e => {
                    const [file] = e.target.files
                    readFileAsURL(file)
                      .then(url => this.setState({ imagePath: url }))
                  }}
                  disabled={this.state.loading}
                />
              </Control>
              <Validation error={this.state.errors.file} />
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
            Save
          </SubmitButton>
        </ModalCardFoot>
      </ModalCard>
    )
  }

  submit () {
    //TODO: Implement upload once backend is ready
  }
}

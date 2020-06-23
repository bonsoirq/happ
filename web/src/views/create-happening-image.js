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
import ReadFile from 'lib/read-file/index'
import extend from 'lib/extend';
import HappeningImageService from 'services/happening-image-service';

export default class CreateHappeningImageView extends Component {
  state = {
    isLoading: false,
    imagePath: grayBackground,
    file: null,
    errors: {}
  }

  submit = () => {
    const { file } = this.state
    const { happeningId } = this.props
    ReadFile
      .asFormData(file)
      .then(data => {
        HappeningImageService.create({ happeningId, data })
      })
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
              <Image is3by1={true} src={this.state.imagePath}/>
            </Field>
            <Field>
              <Label htmlFor="file">File</Label>
              <Control>
                <FileInput
                  id="file"
                  accept=".jpg,.jpeg,.png"
                  isDanger={this.state.errors.file != null}
                  isLoading={this.state.isLoading}
                  onChange={e => {
                    const [file] = e.target.files
                    this.setState(s => extend(s, { file, isLoading: true }))
                    ReadFile.asURL(file, { name: ''})
                      .then(url => this.setState(s => extend(s, { imagePath: url, isLoading: false })))
                  }}
                  disabled={this.state.isLoading}
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
            isLoading={this.state.isLoading}
            disabled={this.state.isLoading}
          >
            Save
          </SubmitButton>
        </ModalCardFoot>
      </ModalCard>
    )
  }
}

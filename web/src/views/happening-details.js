import React, { Component } from 'react';
import Button from 'components/button';
import ModalCard from 'components/modal/modal-card';
import ModalCardHead from 'components/modal/modal-card-head';
import ModalCardContent from 'components/modal/modal-card-content';
import ModalCardFoot from 'components/modal/modal-card-foot';
import SmallTitle from 'components/small-title';
import SmallSubtitle from 'components/small-subtitle';
import grayBackground from 'images/gray-bg.jpg';
import Field from 'components/form/field';
import Image from 'components/image';
import extend from 'lib/extend';
import ReadFile from 'lib/read-file';
import Control from 'components/form/control';
import FileInput from 'components/form/file-input';
import HappeningImageService from 'services/happening-image-service';
import Label from 'components/form/label';
import Checkbox from 'components/form/checkbox';
import HappeningService from 'services/happening-service';

export default class HappeningDetailsView extends Component {
  state = {
    isLoading: false,
    imagePath: `${process.env.REACT_APP_API_URL}/happenings/${this.props.happening.id}/image`,
    file: null,
    happening: this.props.happening,
    errors: {}
  }

  submit = () => {
    const { file } = this.state
    const { happening } = this.props
    ReadFile
      .asFormData(file)
      .then(data => {
        HappeningImageService.create({ happeningId: happening.id, data })
      })
  }

  publishHappening = (isPublished) => {
    const { happening } = this.state
    happening.isPublished = isPublished
    this.setState(s => extend(s, { happening }), () => {
      HappeningService.save(happening)
    })
  }

  setDefaultPhoto = () => {
    this.setState(s => extend(s, { imagePath: grayBackground }))
  }

  render () {
    const { happening, onClose } = this.props
    return (
    <ModalCard>
      <ModalCardHead
        title={happening.name}
        onClose={onClose}
      />
      <ModalCardContent>
        <Field>
          <Image
            is3by1={true}
            src={this.state.imagePath}
            onError={this.setDefaultPhoto}
          />
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
                  .then(this.submit)
              }}
              disabled={this.state.isLoading}
            />
          </Control>
        </Field>
        <SmallTitle>{happening.agenda}</SmallTitle>
        <SmallSubtitle>{happening.description}</SmallSubtitle>
        <SmallSubtitle>{happening.organizerDescription}</SmallSubtitle>
        <Field>
          <Control>
            <Label>
              <Checkbox
                onChange={e => this.publishHappening(e.target.checked)}
                checked={happening.isPublished}
              />
              Publish happening
            </Label>
          </Control>
        </Field>
      </ModalCardContent>
      <ModalCardFoot>
        <Button
          onClick={onClose}
        >
          Close
        </Button>
      </ModalCardFoot>
    </ModalCard>
    )
  }
}

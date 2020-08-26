import React from 'react';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';

export default function ShareButtons (props) {
  return <>
    <EmailShareButton subject={props.subject} body={props.title} url={props.url}>
      <EmailIcon size={props.size} round={true} />
    </EmailShareButton>
    <FacebookShareButton quote={props.title} url={props.url}>
      <FacebookIcon size={props.size} round={true} />
    </FacebookShareButton>
    <TwitterShareButton title={props.title} url={props.url}>
      <TwitterIcon size={props.size} round={true} />
    </TwitterShareButton>
    <LinkedinShareButton title={props.title} url={props.url}>
      <LinkedinIcon size={props.size} round={true} />
    </LinkedinShareButton>
    <RedditShareButton title={props.title} url={props.url}>
      <RedditIcon size={props.size} round={true} />
    </RedditShareButton>
    <WhatsappShareButton title={props.title} url={props.url}>
      <WhatsappIcon size={props.size} round={true} />
    </WhatsappShareButton>
  </>
}

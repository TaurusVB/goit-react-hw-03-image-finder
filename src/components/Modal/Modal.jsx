import { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  handleOverayClick = e => {
    if (e.target === e.currentTarget) this.props.onClose();
  };
  render() {
    const { imgSrc, alt } = this.props;

    return (
      <Overlay onClick={this.handleOverayClick}>
        <ModalWindow>
          <img src={imgSrc} alt={alt} />
        </ModalWindow>
      </Overlay>
    );
  }
}

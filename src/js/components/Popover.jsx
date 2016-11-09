// @flow

import React, { Component, PropTypes } from 'react';
import FloatingElement, { positions, positionValues, sanitizePosition } from './FloatingElement';
import {ModalContainer} from '.';

export class Popover extends Component {

    //--------------------------------------
    //  User Interaction
    //--------------------------------------

    modalScreenClicked = () => {
        const { onDismiss } = this.props;

        if (onDismiss) {
            onDismiss();
        }
    };

    keyPressed = (event: KeyboardEvent) => {
        const { onDismiss, ignoreEscapeKey } = this.props;

        if (!ignoreEscapeKey && onDismiss && event.keyCode === 27) {
            onDismiss();
        }
    };

    //--------------------------------------
    //  React Lifecycle
    //--------------------------------------

    render() {
        const { children, style } = this.props;
        const position = sanitizePosition(this.props.position || positionValues.above);
        const pointClassName = 'Popover-point Popover-point--' + position;

        return (
            <ModalContainer onScreenClick={this.modalScreenClicked}>
                <FloatingElement
                    targetElement={this.props.targetElement}
                    position={this.props.position}
                >
                    <div className="Popover-wrapper" style={style}>
                        <svg className={pointClassName} viewBox="0 0 2 2" width="20" height="20">
                            <path d="M 1 0 L 2 1 L 1 2 L 0 1 L 1 0"/>
                        </svg>
                        <div className="Popover-content">
                            { children }
                        </div>
                    </div>
                </FloatingElement>
            </ModalContainer>
        );
    }

    componentDidMount() {
        document.addEventListener("keyup", this.keyPressed, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.keyPressed, false);
    }

    static propTypes = {
        targetElement: PropTypes.object,
        position: PropTypes.oneOf(positions),
        onDismiss: PropTypes.func,
        ignoreEscapeKey: PropTypes.bool,
        style: PropTypes.object,
        children: PropTypes.node
    }
}

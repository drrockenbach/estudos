import React, { Component } from 'react';

const WithClass = (WrappedComponent, classes) => {
    const InnerWithClass = class extends Component {
        render () {
            return (
                <div className={classes}>
                    <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
                </div>
            )
        }
    }

    return React.forwardRef((props, ref) => {
        return <InnerWithClass {...props} forwardedRef={ref} />
    });
}

export default WithClass;
import React from 'react'

export default function context(contextTypes, context) {
    // console.log(contextTypes)
    return function (DecoratedComponent) {
        class trailing extends React.Component {
            static childContextTypes = contextTypes;
            render() {
              // console.log(contextTypes)
              return (
                <DecoratedComponent {...this.props} />
              );
            }
        }
        return trailing;
    }
}
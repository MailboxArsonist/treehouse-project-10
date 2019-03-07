import React, {Component} from 'react';

class ErrorBoundary extends Component {
    state = {
        error: null,
        errorInfo : null
    }
    componentDidCatch(error, errorInfo){
        this.setState({error, errorInfo});
    }

    render(){
        if(this.state.error){
            return(
                <div>
                    <h5>Whoops, something went worng...</h5>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            )
        } else {
            //all is good here
            return this.props.children
        }
        
    }
}

export default ErrorBoundary;
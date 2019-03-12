import React, {Component} from 'react';

class ErrorBoundary extends Component {
    state = {
        error: null,
        errorInfo : null
    }
    /**
     * Will catch any uncaught errors and set state to these errors
     * @param  {Object} error - uncaught error object
     * @param  {String} e - error message
     */
    componentDidCatch(error, errorInfo){
        this.setState({error, errorInfo});
    }

    render(){
        //if there is an error display a more user friendly component
        if(this.state.error){
            return(
                <div className="error-block">
                    <h5>Whoops, something went wrong...</h5>
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
import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.sayHello = this.sayHello.bind(this);
     }
     
      sayHello() {
        this.props.history.push('/');
      }
    render() {

        return (
            <div>
                <h3>i am Login</h3>
                <button onClick={this.sayHello}>
      Click me!
    </button>
            </div>
        )
    }
}

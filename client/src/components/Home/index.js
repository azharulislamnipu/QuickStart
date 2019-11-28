import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <div className="heading">I AM hOME PAGE</div>
            </div>
        )
    }
}

import React, { Component } from 'react';

export default class AuthPage extends Component {

    render(){
        return (
            <form>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email"></input>
                </div>
            </form>  
        )
    }
}
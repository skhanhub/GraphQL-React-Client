import React, { Component } from 'react';
import './Auth.css';
import AuthContext from '../context/auth-context';
export default class AuthPage extends Component {
    private emailEl: React.RefObject<HTMLInputElement>;
    private passwordEL: React.RefObject<HTMLInputElement>;
    state: any;

    static contextType = AuthContext;
    constructor(props: any){
        super(props);
        this.emailEl = React.createRef();
        this.passwordEL = React.createRef();
        this.state = {
            isLogin: true,
        }
    }
    submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
 
        const email = this.emailEl.current!.value;
        const password = this.passwordEL.current!.value;
        if(email.trim().length === 0 || password.trim().length === 0){
            return;
        }

        const requestBodySignup = {
            query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}){
                        _id
                        email
                    }
                }
            `
        };

        const requestBodyLogin = {
            query: `
                query {
                    login(email: "${email}", password: "${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        };

        try{

            const result = await fetch('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(this.state.isLogin?requestBodyLogin:requestBodySignup),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(result.status !== 200 && result.status !== 201){
                throw new Error('Failed!')
            }
            const resultJSON = await result.json();
            if(resultJSON.errors){
                console.log(resultJSON.errors[0].message)
            }
            else{
                if(resultJSON.data.login.token){
                    this.context.login(resultJSON.data.login.token, resultJSON.data.login.userId, resultJSON.data.login.tokenExpiration);
                }
                console.log(resultJSON.data);
            }
            
        }
        catch(err){
            console.log(err);
        }
    };
    shitchModHandler = () => {
        this.setState({isLogin: !this.state.isLogin})
    }
    render(){
        return (
            <form className="auth-form" onSubmit={this.submitHandler}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" ref={this.emailEl}></input>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={this.passwordEL}></input>
                </div>
                <div className="form-actions">
                    <button type="submit" >Submit</button>
                    <button type="button" onClick={this.shitchModHandler}>Switch to {this.state.isLogin ? 'Signup': 'Login'}</button>
                </div>
            </form>  
        )
    }
}
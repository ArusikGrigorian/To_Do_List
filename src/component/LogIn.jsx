import React from "react";
import { auth, db } from "../firebase";


class LogIn extends React.Component {
    state = {
        email: '',
        password: ''
    }
    onChange = (filed, event) => {
        this.setState({
            [filed]: event.target.value,
        })
    }
    onLoginClick = () => {
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password).catch(function (error) {
            alert(error.message)
        });


    }
    onRegistreClick = () => {
        const { email, password } = this.state;
        auth.createUserWithEmailAndPassword(email, password).then((data) => {
            db.collection("users").doc(data.user.uid).set({ email, toDoItems: [] })
        }).catch(function (error) {
            alert(error.message)
        });
    }

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <input type='text' placeholder='email' value={email} onChange={e => this.onChange('email', e)} />
                <input type='text' placeholder='password' value={password} onChange={e => this.onChange('password', e)} />
                <button onClick={this.onLoginClick} >Login</button>
                <button onClick={this.onRegistreClick} >Registre</button>
            </div>
        )
    }
}
export default LogIn
import React from 'react';
import "../App.css";
import Header from "./Header";
import ThemeContext from '../contexts/ThemeContext';
import { BLACK_THEME_BACKGROUND_COLOR, BLUE_THEME_BACKGROUND_COLOR } from '../constants/style';
import { auth } from '../firebase';
import UserConstext from '../contexts/UserConstext';
import LogIn from './LogIn';
import ToDoApp from './ToDoApp';



class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            theme: "black",
        }
    }
    async componentDidMount() {
        auth.onAuthStateChanged((user) => {
            this.setState({
                user
            })
        });

    }
    onThemeChange = (color) => {
        if (this.state.theme !== color) {
            this.setState({
                theme: color
            })
        }
    };


    render() {
        const bgcolor = this.state.theme === 'black' ? BLACK_THEME_BACKGROUND_COLOR : BLUE_THEME_BACKGROUND_COLOR;

        return (
            <UserConstext.Provider value={this.state.user}>
                <ThemeContext.Provider value={this.state.theme}>
                    <div className="Main" style={{
                        backgroundColor: bgcolor
                    }}>
                        <Header onThemeChange={this.onThemeChange} />
                        {this.state.user ? <ToDoApp /> : <LogIn />}
                    </div>

                </ThemeContext.Provider>
            </UserConstext.Provider>
        );

    }

}

export default Main;
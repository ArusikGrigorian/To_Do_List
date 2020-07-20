import React from 'react';
import ThemeContext from '../contexts/ThemeContext';
import { BLACK_THEME_COLOR, BLUE_THEME_COLOR } from '../constants/style';


class AddTask extends React.Component {
    render() {
        const color = this.context === 'black' ? BLACK_THEME_COLOR : BLUE_THEME_COLOR;

        return (
            <div className="AddTask">
                <h1 style={{ color }}>Things Todo</h1>
                <div>
                    <input onChange={this.props.handleChange} value={this.props.inputValue} type="text"
                        placeholder="Add task here..." />
                    <button onClick={this.props.handleClick}>Add</button>
                </div>
            </div>
        )

        // <ThemeContext.Consumer>
        //     {(value) => {
        //         const color = value === 'black' ? BLACK_THEME_COLOR : BLUE_THEME_COLOR;

        //         return (
        //             <div className="AddTask">
        //                 <h1 style={{ color }}>Things Todo</h1>
        //                 <div>
        //                     <input onChange={this.props.handleChange} value={this.props.inputValue} type="text"
        //                         placeholder="Add task here..." />
        //                     <button onClick={this.props.handleClick}>Add</button>
        //                 </div>
        //             </div>
        //         )
        //     }}
        // </ThemeContext.Consumer>
    }
}

AddTask.contextType = ThemeContext;

export default AddTask
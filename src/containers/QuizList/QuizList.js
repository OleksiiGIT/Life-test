import React, {Component} from 'react'
import classes from './QuizList.css'
import {NavLink} from "react-router-dom";

export default class QuizList extends Component {

    renderQuizes() {
        return [1,2,3].map((quiz,index)=>{
            return (
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz}>
                        Test {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>QuizList</h1>

                    <ul>
                        {this.renderQuizes()}
                    </ul>
                </div>
            </div>
        )
    }
}
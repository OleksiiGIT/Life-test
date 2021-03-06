import React, {Component} from 'react'
import classes from './QuizCreatot.css'
import Button from '../../components/UI/Button/Button'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Auxillary from '../../hoc/Auxillary/Auxillary'
import Select from '../../components/UI/Select/Select'
import {connect} from "react-redux"
import {addTestName, createQuizQuestion, finishCreateQuiz} from "../../store/actions/create"

function createOptionControl(number) {
    return createControl({
        label: `Answer ${number}`,
        errorMessage: 'Answer cant be empty',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Fill the question',
            errorMessage: 'Question cant be empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        rightAnswer: 1,
        isFormValid: false,
        formControls: createFormControls()
    }

    submitHandler = e => {
        e.preventDefault()
    }

    addQuestionHandler = e => {
        e.preventDefault()

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswer,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            rightAnswer: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    }

    createQuizHandler = e => {
        e.preventDefault()

        const testName = [
            prompt('Enter test name','Test')
        ]
        this.props.addTestName(testName)

        this.setState({
            rightAnswer: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
        this.props.finishCreateQuiz()

    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Auxillary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr/> : null }
                </Auxillary>
            )
        })
    }

    selectChangeHandler = e => {
        this.setState({
            rightAnswer: +e.target.value
        })
    }

    render() {

        const select = <Select
            label="Select right answer"
            value={this.state.rightAnswer}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Test Creator</h1>

                    <form onSubmit={this.submitHandler}>

                        { this.renderControls() }

                        {select}

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Add question
                        </Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Create test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
        addTestName: testName => dispatch(addTestName(testName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLenght: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    render () {

        const formElemetsArray = [];

        for (let key in this.state.controls) {
            formElemetsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElemetsArray.map(element => (
            <Input 
            key={element.id} 
            elementType={element.config.elementType} 
            elementConfig={element.config.elementConfig} 
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            valueType={element.config.elementConfig.placeholder}
            value={element.config.value} />
            
            ));
        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType="Success" >Submit</Button>
                </form>
            </div>
        );
    };
};

export default Auth;
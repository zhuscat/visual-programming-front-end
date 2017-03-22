import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { createForm, FormItem } from 'react-validation-form';
import UnderlineInput from './UnderlineInput';
import Button from './Button';
import '../../styles/login.scss';
import '../../styles/link.scss';

const propTypes = {
  form: PropTypes.object,
};

class SignupForm extends Component {
  render() {
    return (
      <form className="vp-login">
        <FormItem>
          <UnderlineInput
            placeholder="用户名"
            {...this.props.form.getInputProps('username', {
              initialValue: '',
              onlyFirst: true,
              validates: [
                {
                  rules: [{
                    required: true,
                    type: 'string',
                    min: 5,
                    max: 20,
                  }],
                  trigger: ['onChange', 'onBlur'],
                },
              ],
            })}
          />
        </FormItem>
        <FormItem>
          <UnderlineInput
            placeholder="密码"
            {...this.props.form.getInputProps('password', {
              initialValue: '',
              onlyFirst: true,
              validates: [
                {
                  rules: [{
                    required: true,
                    type: 'string',
                    min: 5,
                    max: 20,
                  }],
                  trigger: ['onChange', 'onBlur'],
                },
              ],
            })}
          />
        </FormItem>
        <FormItem>
          <UnderlineInput
            placeholder="确认密码"
            {...this.props.form.getInputProps('passwordConfirm', {
              initialValue: '',
              onlyFirst: true,
              validates: [
                {
                  rules: [{
                    required: true,
                    type: 'string',
                    min: 5,
                    max: 20,
                  }],
                  trigger: ['onChange', 'onBlur'],
                },
              ],
            })}
          />
        </FormItem>
        <Button
          type="hollow"
          radius
          style={{
            width: '100px',
            display: 'block',
            margin: '16px 0',
          }}
        >
        注册
        </Button>
        <Link className="vp-link" to="/login">登录</Link>
      </form>
    );
  }
}

LoginForm.propTypes = propTypes;

export default createForm(LoginForm);

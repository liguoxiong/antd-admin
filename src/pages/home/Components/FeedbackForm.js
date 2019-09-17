import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="home-page-wrapper feedbackForm-wrapper">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="Vui lòng nhập tên"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input your title!' }],
            })(
              <Input
                prefix={<Icon type="edit" style={{ fontSize: 13 }} />}
                placeholder="Tiêu đề"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('content', {
              rules: [
                { required: true, message: 'Please input your content!' },
              ],
            })(<Input.TextArea rows={4} placeholder="Nội dung" />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Gửi yêu cầu
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default WrappedNormalLoginForm

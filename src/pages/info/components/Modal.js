import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Cascader, Icon, Upload, message } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import city from 'utils/city'
import './Modal.less'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@withI18n()
@Form.create()
class InfoModal extends Component {
  state = {
    loading: false,
  }
  componentDidMount() {
    this.setState({
      imageUrl: this.props.item.logo || null,
    })
  }

  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
        logo: this.state.imageUrl,
      }
      onOk(data)
    })
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      )
    }
  }

  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { imageUrl } = this.state
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`Tên công ty`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('company', {
              initialValue: item.company,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Địa chỉ`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: item.address,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`Số điện thoại`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('phone', {
              initialValue: item.phone,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Facebook`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('facebook', {
              initialValue: item.facebook,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Messenger`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('messenger', {
              initialValue: item.messenger,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Zalo`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('zalo', {
              initialValue: item.zalo,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Skype`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('skype', {
              initialValue: item.skype,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Viber`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('viber', {
              initialValue: item.viber,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Logo`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('logo', {
              initialValue: item.logo,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : item.logo ? (
                  <img src={item.logo} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

InfoModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default InfoModal

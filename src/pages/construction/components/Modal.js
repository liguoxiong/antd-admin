import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Cascader, Icon, Upload, message } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import city from 'utils/city'
import './Modal.less'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
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
class ConstructionModal extends Component {
  state = {
    loading: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }
  componentDidMount() {
    this.setState({
      imageUrl: this.props.item.image || null,
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
    if (this.props !== nextProps) {
      this.setState({ fileList: nextProps.item.image })
    }
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
        image: this.state.fileList,
      }
      onOk(data)
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async file => {
    if (!file.thumbUrl && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.thumbUrl || file.preview,
      previewVisible: true,
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    const { previewVisible, previewImage, fileList } = this.state
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem
            label={i18n.t`Loại sản phẩm`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('title', {
              initialValue: item.title,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Mô tả`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('description', {
              initialValue: item.description,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Hình ảnh`} hasFeedback {...formItemLayout}>
            <div className="clearfix">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              >
                {fileList && fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

ConstructionModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ConstructionModal

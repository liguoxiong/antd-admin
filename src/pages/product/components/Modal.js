import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Modal,
  Cascader,
  Upload,
  Icon,
  Select,
  Checkbox,
} from 'antd'
import { Trans, withI18n } from '@lingui/react'
import city from 'utils/city'
import './Modal.less'

const { Option } = Select

const FormItem = Form.Item
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
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
class ProductModal extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    category: '',
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
      console.log(data)
      onOk(data)
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async file => {
    if (!file.thumbUrl && !file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.thumbUrl || file.url || file.preview,
      previewVisible: true,
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  handleSelectChange = category => {
    this.setState({
      category,
    })
  }

  render() {
    const {
      item = {},
      onOk,
      form,
      i18n,
      categories,
      ...modalProps
    } = this.props
    const { getFieldDecorator } = form
    const { previewVisible, previewImage, fileList, category } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    console.log('previewImage', this.state.previewImage)
    console.log('fileList', this.state.fileLists)
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem
            label={i18n.t`Tên Sản phẩm`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`Loại sản phẩm`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('category', {
              initialValue: item.category ? item.category._id : '',
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select
                style={{ width: '100%' }}
                size="large"
                value={category}
                placeholder="Chọn loại sản phẩm"
                onChange={this.handleSelectChange}
              >
                <Option value="" disabled>
                  <em>Chọn loại sản phẩm</em>
                </Option>
                {!!categories &&
                  categories.map(item => (
                    <Option value={item._id} key={item._id}>
                      {item.title}
                    </Option>
                  ))}
              </Select>
            )}
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
          <FormItem
            label={i18n.t`Tài liệu kỹ thuật`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('documentation', {
              initialValue: item.documentation,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Xuất xứ`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('origin', {
              initialValue: item.origin,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Mã Sản phẩm`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('model_number', {
              initialValue: item.model_number,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`Thời gian giao hàng`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('dilivery_time', {
              initialValue: item.dilivery_time,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`Thời gian bảo hành`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('warranty_time', {
              initialValue: item.warranty_time,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`Hình ảnh`} hasFeedback {...formItemLayout}>
            {/* {getFieldDecorator('image', {
              initialValue: item.image,
              rules: [
                {
                  required: true,
                },
              ],
            })( */}
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
            {/* )} */}
          </FormItem>
          <FormItem label={i18n.t`Hiện ở trang chủ`} {...formItemLayout}>
            {getFieldDecorator('isShow', {
              initialValue: item.isShow,
              valuePropName: 'checked',
            })(<Checkbox />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

ProductModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ProductModal

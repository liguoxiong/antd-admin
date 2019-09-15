import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record._id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>Hình ảnh</Trans>,
        dataIndex: 'image',
        key: 'image',
        width: 72,
        fixed: 'left',
        render: text => (
          <Avatar
            style={{ marginLeft: 8 }}
            src={text.length ? text[0].thumbUrl : null}
          />
        ),
      },
      {
        title: <Trans>Tên Sản phẩm</Trans>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <Link to={`product/${record._id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Loại sản phẩm</Trans>,
        dataIndex: 'category.title',
        key: 'category._id',
      },
      {
        title: <Trans>Mô tả</Trans>,
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: <Trans>Tài liệu kỹ thuật</Trans>,
        dataIndex: 'documentation',
        key: 'documentation',
      },
      {
        title: <Trans>Xuất xứ</Trans>,
        dataIndex: 'origin',
        key: 'origin',
      },
      {
        title: <Trans>Mã Sản phẩm</Trans>,
        dataIndex: 'model_number',
        key: 'model_number',
      },
      {
        title: <Trans>Thời gian giao hàng</Trans>,
        dataIndex: 'dilivery_time',
        key: 'dilivery_time',
      },
      {
        title: <Trans>Thời gian bảo hành</Trans>,
        dataIndex: 'warranty_time',
        key: 'warranty_time',
      },
      {
        title: <Trans>Ngày tạo</Trans>,
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: i18n.t`Update` },
                { key: '2', name: i18n.t`Delete` },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record._id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List

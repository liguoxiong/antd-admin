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
        title: <Trans>Logo</Trans>,
        dataIndex: 'logo',
        key: 'logo',
        width: 72,
        fixed: 'left',
        render: text => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: <Trans>Tên công ty</Trans>,
        dataIndex: 'company',
        key: 'company',
        render: (text, record) => <Link to={`info/${record._id}`}>{text}</Link>,
      },
      {
        title: <Trans>Địa chỉ</Trans>,
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: <Trans>Email</Trans>,
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: <Trans>Số điện thoại</Trans>,
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: <Trans>Facebook</Trans>,
        dataIndex: 'facebook',
        key: 'facebook',
      },
      {
        title: <Trans>Messenger</Trans>,
        dataIndex: 'messenger',
        key: 'messenger',
      },
      {
        title: <Trans>Zalo</Trans>,
        dataIndex: 'zalo',
        key: 'zalo',
      },
      {
        title: <Trans>Viber</Trans>,
        dataIndex: 'viber',
        key: 'viber',
      },
      {
        title: <Trans>Skype</Trans>,
        dataIndex: 'skype',
        key: 'skype',
      },
      {
        title: <Trans>CreateAt</Trans>,
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

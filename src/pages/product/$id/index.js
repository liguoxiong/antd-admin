import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import styles from './index.less'

@connect(({ productDetail }) => ({ productDetail }))
class ProductDetail extends PureComponent {
  render() {
    const { productDetail } = this.props
    const { data } = productDetail
    const content = []
    for (let key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
        content.push(
          <div key={key} className={styles.item}>
            <div>{key}</div>
            <div>{String(data[key])}</div>
          </div>
        )
      }
    }
    return (
      <Page inner>
        <div className={styles.content}>{content}</div>
      </Page>
    )
  }
}

ProductDetail.propTypes = {
  productDetail: PropTypes.object,
}

export default ProductDetail

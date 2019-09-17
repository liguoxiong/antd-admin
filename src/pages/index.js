import React, { PureComponent } from 'react'
import Redirect from 'umi/redirect'
import { withI18n } from '@lingui/react'
import Home from './home/Components'

@withI18n()
class Index extends PureComponent {
  render() {
    const { i18n } = this.props
    // return <Redirect to={i18n.t`/dashboard`} />
    return <Home />
  }
}

export default Index

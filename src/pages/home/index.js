/**
 * Created by H
 * User: huangcan
 * Date: 2018/11/2
 * Time: 4:08 PM
 */
import React, {PureComponent, Fragment} from 'react'
import ReactLogo from 'components/logo'
import SearchInput from 'components/searchInput'


class Home extends PureComponent {

  render() {
    return (
        <Fragment>
          <div className={'container-wrapper'}>
            <ReactLogo/>
            <SearchInput props={{url: '/'}} navigation={this.props.history}/>
          </div>
        </Fragment>
    )
  }
}

export default Home





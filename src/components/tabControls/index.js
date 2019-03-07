/**
 * Created by H
 * User: huangcan
 * Date: 2019/2/28
 * Time: 10:39 AM
 */

import React, {PureComponent, Fragment} from 'react'

class TabControls extends PureComponent {

  constructor() {
    super()
    this.state = {
      currentIndex: 0
    }
  }

  checkTittleIndex(index, style) {
    return index === this.state.currentIndex ? `${style["tab-tittle"]}  ${ style["active"]}` : style["tab-tittle"]
  }

  checkItemIndex(index, style) {
    return index === this.state.currentIndex ? `${style["tab-item"]} ${style["show"]}` : style["tab-item"]
  }

  render() {
    const style = this.props.props
    return (
        <Fragment>

          <div className={style['tab-nav']}>
            <span className={style['source']}>来源：</span>
            {
              // 动态生成tab导航
              React.Children.map(this.props.children, (element, index) => {
                return (
                    <div onClick={() => {
                      this.setState({currentIndex: index})
                    }} className={this.checkTittleIndex(index, style)}>
                      {element.props.name}
                    </div>
                )
              })
            }
          </div>

          <div className={style["tab-item-wrap"]}>
            {
              //tab内容区域
              React.Children.map(this.props.children, (element, index) => {
                return (
                    <div className={this.checkItemIndex(index, style)}>{element}</div>
                )
              })}
          </div>

        </Fragment>
    )
  }
}

export default TabControls
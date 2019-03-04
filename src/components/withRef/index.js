/**
 * Created by H
 * User: huangcan
 * Date: 2019/2/28
 * Time: 4:51 PM
 */


import React, {Component} from "react"

export default (WrappedComponent) => {
  return class withRef extends Component {
    //static displayName = `withRef(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    render() {
      // 这里重新定义一个props的原因是:
      // 你直接去修改this.props.ref在react开发模式下会报错，不允许你去修改

      const props = {
        ...this.props,
      };


      // 在这里把getInstance赋值给ref，
      // 传给`WrappedComponent`，这样就getInstance能获取到`WrappedComponent`实例
      // 感谢评论区的[yangshenghaha]同学的完善
      props.ref = (el) => {
        this.props.getInstance && this.props.getInstance(el)
        this.props.ref && this.props.ref(el)
      }
      return (
          <WrappedComponent {...props} />
      );
    }
  };
};
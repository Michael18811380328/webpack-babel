import * as React from 'react';

// 组件：渲染一个标题，内容根据 props 动态显示
// 接口：Props 类型验证
export interface DemoProps { compiler: string, framework: string };

// 'DemoProps ' describes the shape of props.
// State is never set so we use the '{}' type.
// 没有设置 state，所以类型验证使用空对象 {}
export class Demo extends React.Component<DemoProps , {}> {
  render() {
    return (
      <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
    );
  }
}

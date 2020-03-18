import React from 'react';
import './app.less';
// 配置按需加载，可以将每个页面或组件拆成独立的包，减小首页加载内容的体积，是很好的优化策略。
// const App = import('@/app');

const App: React.FC = () => {
  return (<div>hello, world</div>);
};

export default App;
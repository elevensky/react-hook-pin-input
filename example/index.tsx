import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CodeInput from '../.';

const App = () => {
  return (
    <div>
      <CodeInput onChange={values => console.log(values)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

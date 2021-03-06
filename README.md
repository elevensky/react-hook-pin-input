# react-hook-pin-input

> 🎉A pin code input

![NPM](https://img.shields.io/npm/l/react-hook-pin-input)
![npm](https://img.shields.io/npm/v/react-hook-pin-input)

## Live demo

- [Demo](https://codesandbox.io/s/youthful-satoshi-yycii)

## Install

```bash
npm install --save react-hook-pin-input
```

## Usage

```jsx
import React, { Component } from 'react';

import PinInput from 'react-hook-pin-input';

class Example extends Component {
  render() {
    return <PinInput />;
  }
}
```

## PropTypes

|     Key     |  Type  |              Desc               |
| :---------: | :----: | :-----------------------------: |
|    type     |  text  |      one of number or text      |
|   fields    | number |     The count of characters     |
|  onChange   |  func  |   Trigger on character change   |
| onComplete  |  func  | Trigger on all character inputs |
| fieldWidth  | number |           input width           |
| fieldHeight | number |          input height           |
|  autoFocus  |  bool  | auto focus first input on init  |
|  className  | string |           class name            |
|   values    | array  |         default values          |

## License

MIT © [elevensky](https://github.com/elevensky)

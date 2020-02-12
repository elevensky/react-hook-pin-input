import React, { useState } from 'react';

import styles from './style.css';

export interface Props {
  type: string;
  onChange: (values?: string) => void;
  onComplete: (values?: string) => void;
  fields: number;
  fieldWidth: number;
  fieldHeight: number;
  autoFocus: boolean;
  className: string;
  values: string[];
  disabled: boolean;
  required: boolean;
}

const KEY_CODE = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

const CodeInput: React.SFC<Partial<Props>> = ({
  className,
  values: pValues = [],
  type = 'number',
  fields = 6,
  fieldWidth = 58,
  fieldHeight = 54,
  autoFocus = true,
  disabled = false,
  required = false,
  onChange,
  onComplete,
  ...rest
}) => {
  let valuesArray: string[];
  if (pValues.length) {
    valuesArray = [];
    for (let i = 0; i < fields; i++) {
      valuesArray.push(pValues[i] || '');
    }
  } else {
    valuesArray = Array(fields).fill('');
  }
  const [values, setValues] = useState(valuesArray);

  const inputRefs: React.RefObject<HTMLInputElement>[] = [];
  for (let i = 0; i < fields; i++) {
    inputRefs.push(React.createRef<HTMLInputElement>());
  }
  const autoFocusIndex = pValues.length >= fields ? 0 : pValues.length;

  const triggerChange = (vs = values) => {
    const val = vs.join('');
    onChange && onChange(val);
    if (onComplete && val.length >= fields) {
      onComplete(val);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.dataset.id || '0');
    if (type === 'number')
      e.target.value = e.target.value.replace(/[^\d]/gi, '');
    if (
      e.target.value === '' ||
      (type === 'number' && !e.target.validity.valid)
    )
      return;

    let next;
    const targetValue = e.target.value;
    const newValues: string[] = Object.assign([], values);
    if (targetValue.length > 1) {
      let nextIndex = targetValue.length + index - 1;
      if (nextIndex >= fields) {
        nextIndex = fields - 1;
      }
      next = inputRefs[nextIndex];
      const split = targetValue.split('');
      split.forEach((item, i: number) => {
        const cursor = index + i;
        if (cursor < fields) {
          newValues[cursor] = item;
        }
      });
    } else {
      next = inputRefs[index + 1];
      newValues[index] = targetValue;
    }
    setValues(newValues);
    if (next) {
      next.current!.focus();
      next.current!.select();
    }

    triggerChange(newValues);
  };

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    const index = parseInt((e.target as HTMLInputElement).dataset.id || '0');
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    const prev = inputRefs[prevIndex];
    const next = inputRefs[nextIndex];
    switch (e.keyCode) {
      case KEY_CODE.backspace:
        e.preventDefault();
        const newValues = [...values];
        if (values[index]) {
          newValues[index] = '';
          setValues(newValues);
          triggerChange(newValues);
        } else if (prev) {
          newValues[prevIndex] = '';
          prev.current?.focus();
          setValues(newValues);
          triggerChange(newValues);
        }
        break;
      case KEY_CODE.left:
        e.preventDefault();
        if (prev) {
          prev.current?.focus();
        }
        break;
      case KEY_CODE.right:
        e.preventDefault();
        if (next) {
          next.current?.focus();
        }
        break;
      case KEY_CODE.up:
      case KEY_CODE.down:
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  const handleOnFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const INPUT_STYLE = {
    width: fieldWidth,
    height: fieldHeight,
  };

  return (
    <div className={styles['react-code-input']}>
      {values.map((value, index) => (
        <input
          type={type === 'number' ? 'tel' : type}
          pattern={type === 'number' ? '[0-9]*' : undefined}
          autoFocus={autoFocus && index === autoFocusIndex}
          style={INPUT_STYLE}
          key={index}
          data-id={index}
          value={value}
          ref={inputRefs[index]}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onFocus={handleOnFocus}
          {...rest}
        />
      ))}
    </div>
  );
};

export default React.memo(CodeInput);

import * as React from 'react';

export function usePersistedState(name, def) {
  const getDefault = () => {
    const savedValue = window.localStorage.getItem(name);
    return savedValue || def;
  };
  const [state, setState] = React.useState(getDefault());

  const setValue = (val) => {
    window.localStorage.setItem(name, val);
    setState(val);
  };

  return [convertToTypeOf(def, state), setValue];
}

function convertToTypeOf(typedVar, input) {
  return {
    string: String.bind(null, input),
    number: Number.bind(null, input)
  }[typeof typedVar]();
}

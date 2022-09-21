export default (context, variableName, cb, interval = 50) => {
  const checkVariable = () => {
    if (context[variableName]) {
      cb();
    } else {
      setTimeout(checkVariable, interval);
    }
  };

  setTimeout(checkVariable, 0);
};

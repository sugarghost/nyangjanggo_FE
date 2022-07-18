const taskHelper = (callback: Function, interval = 3000, end?: boolean) => {
  // TODO setInterval 대신 사용할 합수 만들기
  let flag = true;

  let timeFunc;
  const tick = () => {
    timeFunc = setTimeout(() => {
      // if (!flag) return (end && end(count));
      // if (times && count >= times) return (end && end(count));

      callback();
      tick();
    }, interval);
  };
  // tick(0);

  // if(end) clearTimeout(timeFunc);

  return () => {
    flag = false;
  };
};

export default taskHelper;

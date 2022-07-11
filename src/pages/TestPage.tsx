import React, {
  ChangeEvent,
  InputHTMLAttributes,
  Suspense,
  useEffect,
  useState,
} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import userToken from "../recoil/userAtom";

const TestPage = ({}) => {
  /*
  const setUserToken = useSetRecoilState(userToken);
  setUserToken(
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZ3l1bmlAa2FrYW8uY29tIiwicm9sZXMiOiJVU0VSIiwiaWF0IjoxNjU2OTA1Nzk3LCJleHAiOjE2NTY5MTI5OTd9.Yd1s1HwSiwXofyyMzZgtIObQnG9oIh0PUhBW-xK8DxY"
  );
  */
  const [dataList, setDataList] = useState([{ data: "" }]);
  const onAdd = () => {
    const list = [...dataList];
    list.push({ data: "" });
    setDataList(list);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const list = [...dataList];
    list[index].data = e.target.value;
    setDataList(list);
  };
  const onPrint = () => {
    console.log("dataList :", dataList);
  };

  return (
    <>
      <input type="button" value="요소 추가" onClick={onAdd} />
      <br />
      {dataList.map((value, index) => (
        <div key={index}>
          <input type="text" onChange={(e) => onChange(e, index)} />
        </div>
      ))}
      <input type="button" value="data 상태 출력" onClick={onPrint} />
      <br />
      <section>
        <h1>데이터 상태</h1>
        <pre>
          <code>{JSON.stringify(dataList, null, 2)}</code>
        </pre>
      </section>
    </>
  );
};

export default TestPage;

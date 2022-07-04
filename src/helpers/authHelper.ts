import { useParams } from "react-router";

const kakaoLoginRedirect = () => {
  const params: any = useParams();

  localStorage.clear();
  localStorage.setItem("token", params.token);
};

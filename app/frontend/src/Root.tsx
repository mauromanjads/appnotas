import { useState } from "react";
import App from "./App";
import Login from "./components/Login";

type Props = {};

const Root = ({}: Props) => {

  const [logged, setLogged] = useState(
    localStorage.getItem("token") !== null
  );

  const onLogin = (token: string) => {
    localStorage.setItem("token", token);
    setLogged(true);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    setLogged(false);
  };

  return logged
    ? <App onLogout={onLogout} />
    : <Login onLogin={onLogin} />;
};

export default Root;

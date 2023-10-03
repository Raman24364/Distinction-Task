import { Link, Outlet } from 'react-router-dom';
import './DisplayQuestion.css';
import { useData } from "./Data";

function DisplayQuestion() {
  const { data } = useData();

  return (
    <>
      <nav className="Nav">
        <Link to="/">Home</Link>
        <Link to="/find">FindQuestion</Link>
      </nav>
      <Outlet />
     
    </>
  );
}

export default DisplayQuestion;

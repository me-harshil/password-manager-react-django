import Passwords from "./Passwords";
import Addpassword from "./Addpassword";

export default function Home(props) {
  return (
    <>
      <Addpassword showAlert={props.showAlert} />
      <Passwords showAlert={props.showAlert} />
    </>
  );
}

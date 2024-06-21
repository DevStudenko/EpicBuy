import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import logo from '../../../../../images/Logo.png'
import styles from "./Navigation.module.css"

function Navigation() {
  return (
    <div className="">
      <div>
        <NavLink to="/"><img className={styles.logo} src={logo} /></NavLink>
        <h5>Epic Buy</h5>
      </div>
      <div>
        <ProfileButton />
      </div>

    </div>

  );
}

export default Navigation;

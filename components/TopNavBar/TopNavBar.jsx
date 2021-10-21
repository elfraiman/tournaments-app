import styles from "./TopNavBar.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import Button from 'rsuite/Button';

const TopNavBar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  console.log(user, isAuthenticated);

  return (
    <div className={styles.container}>
      <h2>#BRANDNAME</h2>

      <div>
        {user ? (
          <div className={styles.profile}>
            <p>{user?.nickname}</p>
            <Image
              className={styles.profilePicture}
              src={user?.picture}
              alt="profile"
              width={50}
              height={50}
            />
          </div>
        ) : (
          <Button appearance="primary" onClick={() => loginWithRedirect()}>Log In</Button>
        )}
      </div>
    </div>
  );
};

export default TopNavBar;

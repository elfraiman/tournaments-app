import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'antd';
import Image from "next/image";
import router from "next/router";
import { useEffect } from "react";
import styles from "./TopNavBar.module.scss";

const TopNavBar = () => {
  const { logout, user, isAuthenticated, loginWithPopup } = useAuth0();

  const createCMSPlayer = async() => {
    await loginWithPopup()
  }

  useEffect( async () => {
    if (user || isAuthenticated) {
      console.log(user, "user to fetch")
      await fetch('/api/createPlayer', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then((response) => {
        console.log(response);
        localStorage.setItem('token', 'test')
      }).catch(error => console.error(error))
    }
  }, [user?.sub])

  return (
    <div className={styles.container}>
      <h2 onClick={() => router.push('/')}>THENEXUS</h2>

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
          <Button type="primary" color="secondary" onClick={() => createCMSPlayer()}>Log In</Button>
        )}
      </div>
    </div>
  );
};

export default TopNavBar;

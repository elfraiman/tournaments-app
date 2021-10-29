import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import Image from "next/image";
import router from "next/router";
import { useEffect } from "react";
import styles from "./TopNavBar.module.scss";

const TopNavBar = () => {
  const { logout, user, isAuthenticated, loginWithPopup } = useAuth0();

  const createCMSPlayer = async () => {
    try {
      await fetch("/api/createPlayer", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          console.log(response);
          localStorage.setItem("user-has-player", true);
        })
        .catch((error) => console.error(error));
    } catch (e) {
      console.error(e, "error");
    }
  };

  useEffect(async () => {
    if (isAuthenticated && !localStorage.getItem("user-has-player")) {
      createCMSPlayer();
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <h2 onClick={() => router.push("/")}>THENEXUS</h2>

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
          <Button
            type="primary"
            color="secondary"
            onClick={() => loginWithPopup()}
          >
            Log In
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopNavBar;

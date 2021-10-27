import { Button, Card, Divider, Tabs, notification } from "antd";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";
import MatchCard from "../../components/MatchCard/MatchCard";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import styles from "./TournamentTabs.module.scss";
import * as dayjs from "dayjs";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";

const TournamentTabs = ({ tournament }) => {
  const { TabPane } = Tabs;
  const { user } = useAuth0();
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const openNotification = (registered) => {
    if (registered) {
      notification.open({
        message: "Registration successful",
        style: {
          backgroundColor: "#5f19d1",
        },
        description: `You have registered for ${tournament.title}.   
              Starting date is ${dayjs(tournament.startDate).format(
                "MMM DD, HH:MM CEST"
              )}.
              `,
      });
    } else {
      notification.open({
        message: "You have left the tournament",
        style: {
          backgroundColor: "#f96550",
        },
        description: `You are now unregistered from ${tournament.title}. `,
      });
    }
  };

  const registerUserToTournament = async () => {
    if (user) {
      const bodyData = { email: user.email, tournamentId: tournament.id };

      await fetch("/api/attatchUserToTournament", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }).then((response) => {
        console.log(response);
        openNotification(true);
        setIsUserRegistered(true);
      });
    } else {
      console.log("Please login to register");
    }
  };

  const unregisterUser = async () => {
    if (user && isUserRegistered) {
      const bodyData = { email: user.email, tournamentId: tournament.id };

      await fetch("/api/detachUserFromTournament", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }).then((response) => {
        openNotification(false);
        setIsUserRegistered(false);
      });
    } else {
      console.log("Please login to register");
    }
  };

  useEffect(() => {
    const userInTournament = tournament.players.filter(
      (player) => player.email === user?.email
    );

    if (userInTournament.length > 0) {
      setIsUserRegistered(true);
    } else {
      setIsUserRegistered(false);
    }
  }, [user?.sub]);

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Info" key="1">
          <div className={styles.infoTab}>
            <Card className={styles.card}>
              <h3>OVERVIEW</h3>
              {ReactHtmlParser(tournament.overviewText.html)}

              <h3>REGISTRATION</h3>
              {ReactHtmlParser(tournament.registrationText.html)}

              <h3>Rules</h3>
              {ReactHtmlParser(tournament.rulesText.html)}
            </Card>

            <div>
              <Card
                className={styles.card}
                cover={
                  <Image
                    alt="tournament"
                    src={tournament.thumbnail.url}
                    width={300}
                    height={225}
                  />
                }
              >
                <p>Matches: {tournament.matches.length}</p>
                <p>Max perticipants: {tournament.maxNumberOfParticipants}</p>
                <Divider />
                {isUserRegistered ? (
                  <Button
                    type="primary"
                    className={styles.registerButton}
                    style={{ backgroundColor: "#f96550" }}
                    onClick={() => unregisterUser()}
                  >
                    Un-Register
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    color="secondary"
                    className={styles.registerButton}
                    onClick={() => registerUserToTournament()}
                  >
                    Register
                  </Button>
                )}
              </Card>

              <Card className={styles.bottomCard} title="Event dates">
                <dl>
                  <dt>Start date</dt>
                  <dd>
                    <span>
                      {dayjs(tournament.startDate).format("MMM DD, HH:MM CEST")}
                    </span>
                  </dd>
                  <dt>Match day</dt>
                  <dd>
                    <span>{dayjs(tournament.endDate).format("dddd")}</span>
                  </dd>

                  <dt>End date</dt>
                  <dd>
                    <span>
                      {dayjs(tournament.endDate).format("MMM DD, HH:MM CEST")}
                    </span>
                  </dd>
                </dl>
              </Card>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Matches" key="2">
          <div className={styles.matches}>
            {tournament.matches.map((match) => {
              return (
                <div key={match.id}>
                  <MatchCard data={match} />
                </div>
              );
            })}
          </div>
        </TabPane>
        <TabPane tab="Results" key="3">
          <Card></Card>
        </TabPane>
        <TabPane tab="Commanders" key="4">
          <div className={styles.commanders}>
            {tournament.players.map((player) => {
              return (
                <div key={player.id}>
                  <PlayerCard data={player} />
                </div>
              );
            })}
          </div>
        </TabPane>
        <TabPane tab="Standings" key="5">
          <Card></Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TournamentTabs;

import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, Divider, Tabs } from "antd";
import * as dayjs from "dayjs";
import { gql, GraphQLClient } from "graphql-request";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";
import MatchCard from "../../components/MatchCard/MatchCard";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import styles from "../../styles/TournamentPage.module.scss";

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const pageSlug = pageContext.query.slug;

  const tournamentQuery = gql`
    query ($pageSlug: String!) {
      tournament(where: { slug: $pageSlug }) {
        id
        title
        startDate
        endDate
        tags
        overviewText {
          html
        }
        registrationText {
          html
        }
        rulesText {
          html
        }
        slug
        matchType
        players {
          picture
          name
          email
          rank
        }
        maxNumberOfParticipants
        thumbnail {
          url
        }
        matches {
          title
          id
          numberOfParticipants
          maxNumberOfParticipants
          tournamentRound
          thumbnail {
            url
          }
        }
      }
    }
  `;

  const variables = {
    pageSlug,
  };

  const tournamentResponse = await graphQLClient.request(
    tournamentQuery,
    variables
  );

  return { props: { tournament: tournamentResponse.tournament } };
};

const TournamentPage = ({ tournament }) => {
  const { TabPane } = Tabs;
  const { user } = useAuth0();

  const registerUserToTournament = async () => {
    if (user) {
      const bodyData = { email: user.email, tournamentId: tournament.id };

      await fetch("/api/attatchUserToTournament", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
    } else {
      console.log("Please login to register");
    }
  };

  console.log(tournament);
  return (
    <div className={styles.container}>
      <TopNavBar />
      <div className={styles.header}>
        <h2>{tournament.title}</h2>
        <h3>
          {dayjs(tournament.startDate).format("DD-MMM")} -{" "}
          {dayjs(tournament.endDate).format("DD-MMM")}
        </h3>
        <h3>Rounds: {tournament.matches.length}</h3>
      </div>

      <div className={styles.content}>
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
                  <Button
                    type="primary"
                    color="secondary"
                    className={styles.registerButton}
                    onClick={() => registerUserToTournament()}
                  >
                    Register
                  </Button>
                </Card>

                <Card className={styles.bottomCard} title="Event dates">
                  <dl>
                    <dt>Start date</dt>
                    <dd>
                      <span>
                        {dayjs(tournament.startDate).format(
                          "MMM DD, HH:MM CEST"
                        )}
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
    </div>
  );
};

export default TournamentPage;

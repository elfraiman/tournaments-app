import { gql, GraphQLClient } from "graphql-request";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import styles from "../../styles/TournamentPage.module.scss";
import * as dayjs from "dayjs";
import { Card, Divider, Tabs, Button } from "antd";
import Image from "next/image";

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
        slug
        numberOfParticipants
        maxNumberOfParticipants
        thumbnail {
          url
        }
        matches {
          id
          slug
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
  console.log(tournament, "#");
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
          <TabPane tab="Info" key="1" className={styles.infoTab}>
            <Card className={styles.card}>
              <h3>OVERVIEW</h3>
              <p>
                Proin sed condimentum arcu. Morbi faucibus est sed nibh
                molestie, ut blandit sem interdum. In volutpat quam eu molestie
                bibendum. Vivamus in laoreet nunc, eget tempor dui. Vestibulum
                quis tincidunt velit. Etiam nulla lacus, imperdiet ac sem non,
                pharetra egestas mauris. Phasellus mi tellus, varius sit amet
                auctor eu, vestibulum in ipsum. Proin vel purus ornare,
                condimentum est sed, cursus diam. Class aptent taciti sociosqu
                ad litora torquent per conubia nostra, per inceptos himenaeos.
                Phasellus in nisi eu ex scelerisque sagittis sed vitae neque.
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Quisque laoreet condimentum sagittis.
              </p>
              <h3>REGISTRATION</h3>
              <p>
                Proin sed condimentum arcu. Morbi faucibus est sed nibh
                molestie, ut blandit sem interdum. In volutpat quam eu molestie
                bibendum. Vivamus in laoreet nunc, eget tempor dui. Vestibulum
                quis tincidunt velit. Etiam nulla lacus, imperdiet ac sem non,
                pharetra egestas mauris. Phasellus mi tellus, varius sit amet
                auctor eu, vestibulum in ipsum. Proin vel purus ornare,
                condimentum est sed, cursus diam. Class aptent taciti sociosqu
                ad litora torquent per
              </p>

              <h3>WITHDRAW & RESERVES</h3>
              <p>
                Proin sed condimentum arcu. Morbi faucibus est sed nibh
                molestie, ut blandit sem interdum. In volutpat quam eu molestie
                bibendum. Vivamus in laoreet nunc, eget tempor dui. Vestibulum
                quis tincidunt velit. Etiam nulla lacus, imperdiet ac sem non,
                pharetra egestas mauris. Phasellus mi tellus, varius sit amet
                auctor eu
              </p>

              <h3>Rules</h3>
              <p>
                Proin sed condimentum arcu. Morbi faucibus est sed nibh
                molestie, ut blandit sem interdum. In volutpat quam eu molestie
                bibendum. Vivamus in laoreet nunc, eget tempor dui. Vestibulum
                quis tincidunt velit. Etiam nulla lacus, imperdiet ac sem non,
                pharetra egestas mauris. Phasellus mi tellus, varius sit amet
                auctor eu
              </p>
            </Card>

            <div>
              <Card
                className={styles.card}
                cover={
                  <Image
                    alt="tournament"
                    src={tournament.thumbnail.url}
                    width={300}
                    height={300}
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
                >
                  Register
                </Button>
              </Card>

              <Card className={styles.bottomCard} title="Event dates">
               <dl>
                 <dt>
                   Start date
                 </dt>
                 <dd>
                   <span>
                     {dayjs(tournament.startDate).format("MMM DD, HH:MM CEST")}
                   </span>
                 </dd>
                 <dt>
                   Match day
                 </dt>
                 <dd>
                   <span>
                     {dayjs(tournament.endDate).format("dddd")}
                   </span>
                 </dd>

                 <dt>
                   End date
                 </dt>
                 <dd>
                   <span>
                     {dayjs(tournament.endDate).format("MMM DD, HH:MM CEST")}
                   </span>
                 </dd>
               </dl>
              </Card>
            </div>
          </TabPane>
          <TabPane tab="Matches" key="2">
            <Card></Card>
          </TabPane>
          <TabPane tab="Results" key="3">
            <Card></Card>
          </TabPane>
          <TabPane tab="Commanders" key="4">
            <Card></Card>
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

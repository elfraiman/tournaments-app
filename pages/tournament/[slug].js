import * as dayjs from "dayjs";
import { gql, GraphQLClient } from "graphql-request";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import TournamentTabs from "../../components/TournamentTabs/TournamentTabs";
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
        <TournamentTabs tournament={tournament} />
      </div>
    </div>
  );
};

export default TournamentPage;

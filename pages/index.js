import styles from "../styles/Home.module.scss";
import { gql, GraphQLClient } from "graphql-request";
import TopNavBar from "../components/TopNavBar/TopNavBar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import TournamentCard from "../components/TournamentCard/TournamentCard";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const tournamentsQuery = gql`
    query {
      tournaments {
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

  const data = await graphQLClient.request(tournamentsQuery);
  const tournaments = data;

  console.log();
  return {
    props: tournaments,
  };
};

function Home({ tournaments }) {
  console.log(tournaments);
  return (
    <div className={styles.container}>
      <TopNavBar />
      <div className={styles.header}>
        <p>Discover #BRANDNAME</p>
        <h2 className={styles.headerTitle}>Some tagline here is nice</h2>
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation"
        </p>
      </div>

      <div className={styles.runningEvents}>
        <h2>Running events</h2>

        <div style={{padding: 16}}>
       
            {tournaments.map((tournament) => {
              return (
                <div className={styles.carouselBlock} key={tournament.id}>
                  <TournamentCard
                    title={tournament.title}
                    thumbnailURL={tournament.thumbnail.url}
                    numberOfMatches={tournament.matches.length}
                    numberOfParticipants={tournament.numberOfParticipants}
                    maxNumberOfParticipants={tournament.maxNumberOfParticipants}
                    startDate={tournament.startDate}
                    endDate={tournament.endDate}
                  />
                </div>
              );
            })}

        </div>
      </div>
    </div>
  );
}

export default Home;

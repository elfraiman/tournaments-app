import { gql, GraphQLClient } from "graphql-request";
import Image from "next/image";
import { useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import TopNavBar from "../components/TopNavBar/TopNavBar";
import TournamentCard from "../components/TournamentCard/TournamentCard";
import downArrow from "../public/scroll-arrow.svg";
import styles from "../styles/Home.module.scss";
import { useRouter } from 'next/router'

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

  const tournamentsResponse = await graphQLClient.request(tournamentsQuery);

  const matchsQuery = gql`
    query {
      matches {
        title
        id
        numberOfParticipants
        maxNumberOfParticipants
        thumbnail {
          url
        }
      }
    }
  `;

  const matchesResponse = await graphQLClient.request(matchsQuery);

  const responses = await Promise.all([tournamentsResponse, matchesResponse]);

  return {
    props: {
      tournaments: responses[0].tournaments,
      matches: responses[1].matches,
    },
  };
};

function Home({ tournaments, matches }) {
  const scrollBtnRef = useRef();
  const router = useRouter();

  const handleScrollBtn = () => {
    scrollBtnRef.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(tournaments)
  return (
    <div className={styles.container}>
      <TopNavBar />

      <div className={styles.header}>
        <p style={{ color: "orange" }}>Discover #BRANDNAME</p>
        <h2 className={styles.headerTitle}>Some tagline here is nice</h2>
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation"
        </p>

        <Image src={downArrow} alt="arrow" onClick={() => handleScrollBtn()} />
      </div>

      <div className={styles.runningEvents}>
        <h2>Available tournaments</h2>
        <div className={styles.eventGrid} ref={scrollBtnRef}>
          {tournaments.map((tournament) => {
            return (
              <div key={tournament.id} onClick={() => router.push(`tournament/${tournament?.slug}`)}>
                <TournamentCard data={tournament} />
              </div>
            );
          })}
        </div>

        <h2>Available matches</h2>
        <div className={styles.eventGrid} ref={scrollBtnRef}>
          {matches.map((match) => {
            return (
              <div key={match.id}>
                <TournamentCard data={match} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;

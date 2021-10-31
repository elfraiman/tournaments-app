import { Select } from "antd";
import { gql, GraphQLClient } from "graphql-request";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import TopNavBar from "../components/TopNavBar/TopNavBar";
import TournamentCard from "../components/TournamentCard/TournamentCard";
import MatchCard from "../components/MatchCard/MatchCard";
import styles from "../styles/Home.module.scss";

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
        matchType
        maxNumberOfParticipants
        thumbnail {
          url
        }
        players {
          email
        }
        matches {
          id
          slug
        }
      }
    }
  `;

  const tournamentsResponse = await graphQLClient.request(tournamentsQuery);

  const matchesQuery = gql`
    query {
      matches {
        title
        id
        maxNumberOfParticipants
        tournamentRound
        startDate
        matchType
        tournament {
          id
        }
        thumbnail {
          url
        }
      }
    }
  `;

  const matchesResponse = await graphQLClient.request(matchesQuery);

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
  const [tournamentsToRender, setTournamentsToRender] = useState(tournaments);
  const [matchesToRender, setMatchesToRender] = useState(
    matches.filter((event) => !event.tournament)
  );

  const { Option } = Select;

  const handleScrollBtn = () => {
    scrollBtnRef.current.scrollIntoView({ behavior: "smooth" });
  };

  function handleFilter(value) {
    const arrayOfEvents = tournaments
      .concat(matches)
      .filter((event) => !event.tournament);

    if (value === "any") {
      setTournamentsToRender(arrayOfEvents.filter((event) => event.matches));
      setMatchesToRender(arrayOfEvents.filter((event) => !event.matches));
    } else {
      if (value === "tournament") {
        setTournamentsToRender(arrayOfEvents.filter((event) => event.matches));
        setMatchesToRender([])
      } else {
        setMatchesToRender(arrayOfEvents.filter((event) => !event.matches));
        setTournamentsToRender([])
      }
    }
  }

  useEffect(() => {
    const arrayOfEvents = tournaments
      .concat(matches)
      .filter((event) => !event.tournament); // If an event has a tournament attached it is an event specifically for that tournament

    setTournamentsToRender(() =>
      arrayOfEvents.filter((event) => event.matches)
    ); // If an event has matches it is a tournament
    setMatchesToRender(() => arrayOfEvents.filter((event) => !event.matches)); // If not it is a match
  }, [tournaments, matches]);

  useEffect(() => {
    console.log(matchesToRender, tournamentsToRender, "to render");
    return () => {};
  }, [matchesToRender, tournamentsToRender]);
  return (
    <div className={styles.container}>
      <TopNavBar />

      <div className={styles.header}>
        <p style={{ color: "orange" }}>Discover THENEXUS</p>
        <h2 className={styles.headerTitle}>Meet & Compete</h2>
        <p>
          Meet likeminded players to enjoy a friendly round with or, join one of
          our official Tournaments and climb the rankings. Its time to show the
          galaxy who the true ruler is.
        </p>
      </div>

      <div className={styles.runningEvents}>
        <div className={styles.innerRunningEvents}>
          <div className={styles.filterBar}>
            <h2>Browse events</h2>

            <div>
              <Select
                defaultValue="any"
                onChange={handleFilter}
                className={styles.select}
                placeholder="Mode"
                dropdownStyle={{ backgroundColor: "#4a14a1" }}
              >
                <Option value="any" className={styles.dropDownValue}>
                  Any
                </Option>
                <Option value="pvp" className={styles.dropDownValue}>
                  PVP
                </Option>
                <Option value="pve" className={styles.dropDownValue}>
                  PVE
                </Option>
                <Option value="rp" className={styles.dropDownValue}>
                  RP
                </Option>
              </Select>

              <Select
                defaultValue="any"
                onChange={handleFilter}
                className={styles.select}
                placeholder="Type"
                dropdownStyle={{ backgroundColor: "#4a14a1", color: "black" }}
              >
                <Option value="any" className={styles.dropDownValue}>
                  Any
                </Option>
                <Option value="match" className={styles.dropDownValue}>
                  Single match
                </Option>
                <Option value="tournament" className={styles.dropDownValue}>
                  Tournament
                </Option>
              </Select>
            </div>
          </div>

          <div className={styles.eventGrid} ref={scrollBtnRef}>
            {tournamentsToRender.map((tournament) => {
              return (
                <div
                  key={tournament.id}
                  onClick={() => router.push(`tournament/${tournament?.slug}`)}
                >
                  <TournamentCard data={tournament} />
                </div>
              );
            })}

            {matchesToRender.map((match) => {
              return (
                <div
                  key={match.id}
                  onClick={() => router.push(`match/${match?.slug}`)}
                >
                  <TournamentCard data={match} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

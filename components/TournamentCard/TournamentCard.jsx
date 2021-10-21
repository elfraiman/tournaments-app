import styles from "./TournamentCard.module.scss";
import * as dayjs from "dayjs";

const TournamentCard = (props) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${props.thumbnailURL})`,
        backgroundSize: "cover",
      }}
    >
      <span className={styles.details}>
        <p>Perticipants: {props.numberOfParticipants}</p>{" "}
        <p>Matches: {props.numberOfMatches}</p>
      </span>

      <div className={styles.innerContent}>
        <p>
          {dayjs(props.startDate).format("DD-MMM")} /{" "}
          {dayjs(props.endDate).format("DD-MMM")}
        </p>
        <h4>{props.title}</h4>
      </div>
    </div>
  );
};

export default TournamentCard;

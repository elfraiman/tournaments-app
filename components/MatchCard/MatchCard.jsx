import * as dayjs from "dayjs";
import styles from "./MatchCard.module.scss";
import { Card, Divider, Tabs, Button } from "antd";
import Image from "next/image";

const MatchCard = (props) => {
    const { Meta } = Card;
  console.log(props)
  return (
    <Card
      className={styles.card}
      cover={
        <Image
          alt="tournament"
          src={props.data.thumbnail?.url}
          width={430}
          height={250}
        />
      }
    >
        
    <Meta
      title={`Round: ${props.data.tournamentRound}`}
    />
      <span className={styles.details}>

      </span>

      <div className={styles.innerContent}>
        <p>
          {dayjs(props.data.startDate).format("MMM DD, HH:MM CEST")}
        </p>
        <h4>{props.data.title}</h4>
      </div>
    </Card>
  );
};

export default MatchCard;

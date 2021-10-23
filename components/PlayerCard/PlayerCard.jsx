import { Card } from "antd";
import Image from "next/image";
import styles from "./PlayerCard.module.scss";

const PlayerCard = (props) => {
  return (
    <Card className={styles.card} bodyStyle={{padding: 16}}>
      <div className={styles.details}>
        <Image src={props.data.picture} width={70} height={70} alt="profile" className={styles.img} />
        <div className={styles.text}>
          <p>{props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1)}</p>
          <p>Rank: <span style={{color: '#f9b150'}}>{props.data.rank}</span></p>
        </div>
      </div>
    </Card>
  );
};

export default PlayerCard;

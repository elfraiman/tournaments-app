import styles from "./TournamentCard.module.scss";
import * as dayjs from "dayjs";
import { useSpring, animated } from "react-spring";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];

const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const TournamentCard = (props) => {
  const [animationProps, setAnimationProps] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));
  return (
    <animated.div
      onMouseMove={({ clientX: x, clientY: y }) =>
        setAnimationProps({ xys: calc(x, y) })
      }
      onMouseLeave={() => setAnimationProps({ xys: [0, 0, 1] })}
      style={{ transform: animationProps.xys.to(trans) }}
    >
      <div
        className={styles.card}
        style={{
          backgroundImage: `url(${props.data.thumbnail.url})`,
          backgroundSize: "cover",
        }}
      >
        <span className={styles.details}>
          <p>Perticipants: {props.data.numberOfParticipants}</p>{" "}
          {props.data.matches?.length > 0 ? (
            <p>Matches: {props.data.matches.length}</p>
          ) : (
            <></>
          )}
        </span>

        <div className={styles.innerContent}>
          <p>
            {dayjs(props.data.startDate).format("DD-MMM")} /{" "}
            {dayjs(props.data.endDate).format("DD-MMM")}
          </p>
          <h4>{props.data.title}</h4>
        </div>
      </div>
    </animated.div>
  );
};

export default TournamentCard;

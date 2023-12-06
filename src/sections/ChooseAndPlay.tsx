import styles from "./ChooseAndPlay.module.css";
import HandSelection from "../components/HandSelection";

const ChooseAndPlay = () => {
	return (
		<>
			<div className={styles.choiceBtnCtn}>
				<HandSelection name="rock" />
				<HandSelection name="paper" />
				<HandSelection name="scissors" />
			</div>
			<button className={styles.playBtn}>Play</button>
		</>
	);
};

export default ChooseAndPlay;

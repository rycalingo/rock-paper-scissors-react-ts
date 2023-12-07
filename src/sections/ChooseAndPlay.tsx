import styles from "./ChooseAndPlay.module.css";
import HandSelection from "../components/HandSelection";
import { useOptions } from "../context/optionsContext";

const ChooseAndPlay = () => {
	const optionsContext = useOptions();

	const HandOptionsArray = optionsContext.options.map((hand) => {
		return <HandSelection name={hand.name} icon={hand.icon} />;
	});

	return (
		<>
			<div className={styles.choiceBtnCtn}>{HandOptionsArray}</div>
			<button className={styles.playBtn}>Play</button>
		</>
	);
};

export default ChooseAndPlay;

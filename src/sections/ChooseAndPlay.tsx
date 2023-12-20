import styles from "./ChooseAndPlay.module.css";
import HandSelection from "../components/HandSelection";
import { useOptions } from "../context/optionsContext";
import { randomNumber } from "../utils/randomNumber";
import { OptionActionKind } from "../reducers/scoreReducerTypes";

const ChooseAndPlay = () => {
	const optionsContext = useOptions();
	const { dispatch } = optionsContext;

	const HandOptionsArray = optionsContext.options.map((hand, i) => {
		return <HandSelection name={hand.name} icon={hand.icon} handChoiceIndex={i} />;
	});

	function play() {
		const numberRoll = randomNumber();
		dispatch({ type: OptionActionKind.UPDATE_COMPUTER_CHOICE, payload: numberRoll });
		dispatch({ type: OptionActionKind.RUN_TIMER, payload: true });
	}

	return (
		<>
			<div className={styles.choiceBtnCtn}>{HandOptionsArray}</div>
			<button className={styles.playBtn} onClick={play}>
				Play
			</button>
		</>
	);
};

export default ChooseAndPlay;

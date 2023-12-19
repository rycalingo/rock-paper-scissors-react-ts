import { useEffect, useState } from "react";
import { useOptions } from "../context/optionsContext";
import styles from "./ScoreAndResults.module.css";
import { OptionActionKind } from "../reducers/scoreReducerTypes";
import { checkWinner } from "../utils/checkWinner";

const ScoreAndResults = () => {
	const [timer, setTimer] = useState<number>(3);
	const optionContext = useOptions();
	const { runTimer } = optionContext.state;
	const { dispatch } = optionContext;

	const playerHandIndex = optionContext.state.playerHand;
	const playerHandName = optionContext.options[playerHandIndex].name;
	const playerHandIcon = optionContext.options[playerHandIndex].icon;
	const playerScore = optionContext.state.score.player;

	const computerHandIndex = optionContext.state.computerHand;
	const computerHandName = optionContext.options[computerHandIndex].name;
	const computerHandIcon = optionContext.options[computerHandIndex].icon;
	const computerScore = optionContext.state.score.computer;

	useEffect(() => {
		if (runTimer) {
			const newInterValId = setInterval(() => {
				setTimer((prevState) => {
					if (prevState === 1) clearInterval(newInterValId);
					return prevState - 1;
				});
			}, 1000);
		}
	}, [runTimer]);

	useEffect(() => {
		if (timer === 0) {
			setTimer(3);
			dispatch({ type: OptionActionKind.RUN_TIMER, payload: false });
			checkWinner(dispatch, playerHandName, computerHandName);
		}
	}, [timer]);

	return (
		<>
			<div className={styles.scoreCtn}>
				<div className={styles.score}>
					<h3>Score</h3>
					<p>Player: {playerScore}</p>
				</div>
				<div className={styles.score}>
					<h3>Score</h3>
					<p>Computer: {computerScore}</p>
				</div>
			</div>
			<div className={styles.results}>
				<div className={styles.playerHand}>{playerHandIcon}</div>
				<div className={styles.midCol}>
					{runTimer && (
						<p data-testid="timer" className={styles.timer}>
							{timer}
						</p>
					)}
				</div>
				<div className={styles.computerHand}>{computerHandIcon}</div>
			</div>
		</>
	);
};

export default ScoreAndResults;

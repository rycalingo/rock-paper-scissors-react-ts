import { useOptions } from "../context/optionsContext";
import { OptionActionKind } from "../reducers/scoreReducerTypes";
import styles from "./HandSelection.module.css";

interface Props {
	name: string;
	icon: JSX.Element;
	handChoiceIndex: number;
}

const HandSelection = ({ name, icon, handChoiceIndex }: Props) => {
	const optionsContext = useOptions();

	const { dispatch } = optionsContext;

	const selectOption = (index: number) => {
		dispatch({ type: OptionActionKind.UPDATE_PLAYER_CHOICE, payload: index });
	};

	return (
		<>
			<button className={styles.choiceBtn} onClick={() => selectOption(handChoiceIndex)}>
				{`${name} `} {icon}
			</button>
		</>
	);
};

export default HandSelection;

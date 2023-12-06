import styles from "./HandSelection.module.css";

interface Props {
	name: string;
	icon: JSX.Element;
}

const HandSelection = ({ name, icon }: Props) => {
	return (
		<>
			<button className={styles.choiceBtn}>
				{`${name} `} {icon}
			</button>
		</>
	);
};

export default HandSelection;

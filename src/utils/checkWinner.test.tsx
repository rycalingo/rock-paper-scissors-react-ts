import { describe, expect, it, vi } from "vitest";
import { useEffect, useReducer } from "react";
import scoreReducer from "../reducers/scoreReducer";
import { initialState } from "../context/initialContextValues";
import { checkWinner } from "./checkWinner";
import { render, screen } from "@testing-library/react";

vi.mock("../context/initialContextValues", () => {
	return {
		initialState: {
			playerHand: 2,
			computerHand: 0,
			runTimer: false,
			score: {
				player: 2,
				computer: 1,
			},
			results: {
				winner: "Draw",
				message: "xyz",
			},
		},
	};
});

interface Iprops {
	playerHand: string;
	computerHand: string;
}

const TestingComponent = (props: Iprops) => {
	const [state, dispatch] = useReducer(scoreReducer, initialState);

	useEffect(() => {
		checkWinner(dispatch, props.playerHand, props.computerHand);
	}, []);

	return (
		<>
			<p>playerscore: {state.score.player}</p>
			<p>computerscore: {state.score.computer}</p>
			<p>winner: {state.results.winner}</p>
			<p>message: {state.results.message}</p>
		</>
	);
};
describe("checkWinner", () => {
	it("should update the reducer with the Players wins - Rock beats Scissors", () => {
		render(<TestingComponent playerHand="rock" computerHand="scissors" />);

		expect(screen.getByText(/^Player/i)).toBeInTheDocument();
		expect(screen.getByText(/Rock beats Scissors/i)).toBeInTheDocument();
		expect(screen.getByText(/playerscore: 3/i)).toBeInTheDocument();
		expect(screen.getByText(/computerscore: 1/i)).toBeInTheDocument();
	});

	it("should update the reducer with the Players wins - Scissors beats Paper", () => {
		render(<TestingComponent playerHand="scissors" computerHand="paper" />);

		expect(screen.getByText(/^Player/i)).toBeInTheDocument();
		expect(screen.getByText(/Scissors beats Paper/i)).toBeInTheDocument();
		expect(screen.getByText(/playerscore: 3/i)).toBeInTheDocument();
		expect(screen.getByText(/computerscore: 1/i)).toBeInTheDocument();
	});

	it("should update the reducer with the Players wins - Paper beats Rock", () => {
		render(<TestingComponent playerHand="paper" computerHand="rock" />);

		expect(screen.getByText(/^Player/i)).toBeInTheDocument();
		expect(screen.getByText(/Paper beats Rock/i)).toBeInTheDocument();
		expect(screen.getByText(/playerscore: 3/i)).toBeInTheDocument();
		expect(screen.getByText(/computerscore: 1/i)).toBeInTheDocument();
	});

	it("should update the reducer with a Draw case - rock rock", () => {
		render(<TestingComponent playerHand="rock" computerHand="rock" />);

		expect(screen.getByText(/Draw/)).toBeInTheDocument();
		expect(screen.getByText(/We have a draw/)).toBeInTheDocument();
		expect(screen.getByText(/playerscore: 2/i)).toBeInTheDocument();
		expect(screen.getByText(/computerscore: 1/i)).toBeInTheDocument();
	});

	it("should update the reducer with a Draw case - scissors scissors", () => {
		render(<TestingComponent playerHand="scissors" computerHand="scissors" />);

		expect(screen.getByText(/Draw/)).toBeInTheDocument();
		expect(screen.getByText(/We have a draw/)).toBeInTheDocument();
		expect(screen.getByText(/playerscore: 2/i)).toBeInTheDocument();
		expect(screen.getByText(/computerscore: 1/i)).toBeInTheDocument();
	});

	it("should update the reducer with a Draw case - paper paper", () => {
		render(<TestingComponent playerHand="paper" computerHand="paper" />);

		expect(screen.getByText(/Draw/)).toBeInTheDocument();
		expect(screen.getByText(/We have a draw/)).toBeInTheDocument();
		expect(screen.getByText(/playerscore: 2/i)).toBeInTheDocument();
		expect(screen.getByText(/computerscore: 1/i)).toBeInTheDocument();
	});

	it("should update the reducer with the Computer wins - Rock beats Scissors", () => {
		render(<TestingComponent playerHand="scissors" computerHand="rock" />);

		expect(screen.getByText(/^Computer/i)).toBeInTheDocument();
		expect(screen.getByText(/Rock beats Scissors/i)).toBeInTheDocument();
		expect(screen.getByText(/playerscore: 2/i)).toBeInTheDocument();
		expect(screen.getByText(/computerscore: 2/i)).toBeInTheDocument();
	});

	it("should update the reducer with the Computer wins - Scissors beats Paper", () => {
		render(<TestingComponent playerHand="paper" computerHand="scissors" />);

		expect(screen.getByText(/^Computer/i)).toBeInTheDocument();
		expect(screen.getByText(/Scissors beats paper/i)).toBeInTheDocument();
		expect(screen.getByText(/playerscore: 2/i)).toBeInTheDocument();
		expect(screen.getByText(/computerscore: 2/i)).toBeInTheDocument();
	});

	it("should update the reducer with the Computer wins - Paper beats Rock", () => {
		render(<TestingComponent playerHand="rock" computerHand="paper" />);

		expect(screen.getByText(/^Computer/i)).toBeInTheDocument();
		expect(screen.getByText(/Paper beats Rock/i)).toBeInTheDocument();
		expect(screen.getByText(/playerscore: 2/i)).toBeInTheDocument();
		expect(screen.getByText(/computerscore: 2/i)).toBeInTheDocument();
	});
});

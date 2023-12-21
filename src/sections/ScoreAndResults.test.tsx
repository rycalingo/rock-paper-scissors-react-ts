import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OptionsProvider } from "../context/optionsContext";
import ScoreAndResults from "./ScoreAndResults";
import ChooseAndPlay from "./ChooseAndPlay";
import { act } from "react-dom/test-utils";

vi.mock("../utils/randomNumber", () => ({
	randomNumber: () => 0,
}));

vi.mock("./ScoreAndResults.module.css", () => ({
	default: {
		winnerAction: "winnerAction",
	},
}));

describe("ScoreAndResults", () => {
	it("should dispaly 2 seconds on the screen after we wait 1 second", () => {
		vi.useFakeTimers();

		render(
			<OptionsProvider>
				<ScoreAndResults />
				<ChooseAndPlay />
			</OptionsProvider>
		);

		const hand = screen.getByText(/paper/i);
		expect(hand).toBeInTheDocument();

		fireEvent.click(hand);
		fireEvent.click(screen.getByText("Play"));

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		screen.debug();

		expect(screen.getByTestId("timer")).toHaveTextContent("1");
	});

	it("should dispaly a message on the page - Player wins!", () => {
		vi.useFakeTimers();

		render(
			<OptionsProvider>
				<ScoreAndResults />
				<ChooseAndPlay />
			</OptionsProvider>
		);

		const hand = screen.getByText(/paper/i);
		expect(hand).toBeInTheDocument();

		fireEvent.click(hand);
		fireEvent.click(screen.getByText("Play"));

		act(() => {
			vi.advanceTimersByTime(3000);
		});

		screen.debug();

		expect(screen.getByText(/Player wins!/i)).toBeInTheDocument();
		expect(screen.getByText(/Paper beats Rock/i)).toBeInTheDocument();

		expect(screen.getByText(/Player: 1/i)).toBeInTheDocument();
		expect(screen.getByText(/Computer: 0/i)).toBeInTheDocument();

		expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible();
		expect(screen.getAllByTestId(/paper/i)[0]).toBeVisible();

		expect(screen.getAllByTestId(/rock/i)).toHaveLength(2);
		expect(screen.getAllByTestId(/paper/i)).toHaveLength(2);
	});

	it("should dispaly a message on the page - Computer wins!", () => {
		vi.useFakeTimers();

		render(
			<OptionsProvider>
				<ScoreAndResults />
				<ChooseAndPlay />
			</OptionsProvider>
		);

		const hand = screen.getByText(/scissors/i);
		expect(hand).toBeInTheDocument();

		fireEvent.click(hand);
		fireEvent.click(screen.getByText("Play"));

		act(() => {
			vi.advanceTimersByTime(3000);
		});

		screen.debug();

		expect(screen.getByText(/Computer wins!/i)).toBeInTheDocument();
		expect(screen.getByText(/Rock beats Scissors/i)).toBeInTheDocument();

		expect(screen.getByText(/Player: 0/i)).toBeInTheDocument();
		expect(screen.getByText(/Computer: 1/i)).toBeInTheDocument();

		expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible();
		expect(screen.getAllByTestId(/scissors/i)[0]).toBeVisible();

		expect(screen.getAllByTestId(/rock/i)).toHaveLength(2);
		expect(screen.getAllByTestId(/scissors/i)).toHaveLength(2);
	});

	it("should dispaly a message on the page - Draw!", () => {
		vi.useFakeTimers();

		render(
			<OptionsProvider>
				<ScoreAndResults />
				<ChooseAndPlay />
			</OptionsProvider>
		);

		const hand = screen.getByText(/rock/i);
		expect(hand).toBeInTheDocument();

		fireEvent.click(hand);
		fireEvent.click(screen.getByText("Play"));

		act(() => {
			vi.advanceTimersByTime(3000);
		});

		screen.debug();

		expect(screen.getByText(/Draw!/i)).toBeInTheDocument();
		expect(screen.getByText(/We have a draw/i)).toBeInTheDocument();

		expect(screen.getByText(/Player: 0/i)).toBeInTheDocument();
		expect(screen.getByText(/Computer: 0/i)).toBeInTheDocument();

		expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible();
		expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible();

		expect(screen.getAllByTestId(/rock/i)).toHaveLength(3);
	});

	it("should display two hands shaking during the count down", () => {
		vi.useFakeTimers();

		render(
			<OptionsProvider>
				<ScoreAndResults />
				<ChooseAndPlay />
			</OptionsProvider>
		);

		const playerHandShake = screen.queryByTestId("playerShake");
		const computerHandShake = screen.queryByTestId("computerShake");

		expect(playerHandShake).not.toBeInTheDocument();
		expect(computerHandShake).not.toBeInTheDocument();

		const hand = screen.getByText(/rock/i);
		expect(hand).toBeInTheDocument();

		fireEvent.click(hand);
		fireEvent.click(screen.getByText("Play"));

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		screen.debug();

		expect(screen.queryByTestId("playerShake")).toBeInTheDocument();
		expect(screen.queryByTestId("computerShake")).toBeInTheDocument();
	});

	it("should display the Player winner animation", () => {
		vi.useFakeTimers();

		render(
			<OptionsProvider>
				<ScoreAndResults />
				<ChooseAndPlay />
			</OptionsProvider>
		);

		const hand = screen.getByText(/paper/i);

		fireEvent.click(hand);
		fireEvent.click(screen.getByText("Play"));

		act(() => {
			vi.advanceTimersByTime(3000);
		});

		expect(screen.getByTestId("playerResult")).toHaveClass("winnerAction");

		screen.debug();
	});

	it("should display the Computer winner animation", () => {
		vi.useFakeTimers();

		render(
			<OptionsProvider>
				<ScoreAndResults />
				<ChooseAndPlay />
			</OptionsProvider>
		);

		const hand = screen.getByText(/scissors/i);

		fireEvent.click(hand);
		fireEvent.click(screen.getByText("Play"));

		act(() => {
			vi.advanceTimersByTime(3000);
		});

		expect(screen.getByTestId("computerResult")).toHaveClass("winnerAction");

		screen.debug();
	});
});

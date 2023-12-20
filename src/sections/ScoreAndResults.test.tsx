import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OptionsProvider } from "../context/optionsContext";
import ScoreAndResults from "./ScoreAndResults";
import ChooseAndPlay from "./ChooseAndPlay";
import { act } from "react-dom/test-utils";

vi.mock("../utils/randomNumber", () => ({
	randomNumber: () => 0,
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

	it("should dispaly the correct winner message on the page", () => {
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
	});
});

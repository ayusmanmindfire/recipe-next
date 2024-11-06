// React and third-party imports
import { render, screen, fireEvent } from "@testing-library/react";

// Static imports
import Home from "../app/page";
import { landingPageStrings } from "../utils/constantStrings";
import {navRoutes} from '../utils/navigationRoutes'

// Mock useRouter from next navigation
const mockNavigate = jest.fn();
jest.mock("next/navigation", () => ({
    ...jest.requireActual("next/navigation"),
    useRouter: () => ({
        push: mockNavigate,
    }),
}));

describe('LandingPage Component', () => {

    test('renders LandingPage with the correct header and text', () => {
        render(<Home />);

        // Check for header text
        expect(screen.getByText(landingPageStrings.homeHeader)).toBeInTheDocument();

        // Check for main text
        expect(screen.getByText(landingPageStrings.homeText)).toBeInTheDocument();

        // Check for buttons
        expect(screen.getByRole('button', { name: /Sign UP/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Go to recipes/i })).toBeInTheDocument();
    });

    test('navigates to the signup page when Sign UP button is clicked', () => {
        render(<Home />);

        // Click the Sign UP button
        fireEvent.click(screen.getByRole('button', { name: /Sign UP/i }));

        // Ensure navigate function is called with the correct path
        expect(mockNavigate).toHaveBeenCalledWith(navRoutes.signup);
    });

    test('navigates to the recipes page when Go to recipes button is clicked', () => {
        render(<Home />);

        // Click the Go to recipes button
        fireEvent.click(screen.getByRole('button', { name: /Go to recipes/i }));

        // Ensure navigate function is called with the correct path
        expect(mockNavigate).toHaveBeenCalledWith(navRoutes.recipes);
    });

});

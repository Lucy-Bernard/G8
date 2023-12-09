import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Header from "../components/Header/Header";
import React from "react";

// Mock the next/image module
jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />);

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

fetch = jest.fn(() => Promise.resolve());

describe('Header component', () => {
  it('renders as expected', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import ProductCard from "../components/ProductCard/ProductCard";

// Mock the next/image module
jest.mock('next/image', () => ({ src, alt, height, width, loading }) => (
  <img src={src} alt={alt} height={height} width={width} loading={loading} />
));

// Mock the useContext hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

/**
 * Unit tests for the ProductCard component.
 */
describe('ProductCard component', () => {
    /**
   * Test case: Renders the component with sample product data and matches the snapshot.
   */
  it('renders as expected', () => {
    // Sample product data for testing
    const product = {
      productName: 'Test Product',
      unitPrice: 10.99,
      imageLink: 'test-image.jpg',
    };

    // Render the ProductCard component with sample product data
    const { container } = render(<ProductCard product={product} />);
    // Assert that the rendered component matches the snapshot
    expect(container).toMatchSnapshot();
  });
});

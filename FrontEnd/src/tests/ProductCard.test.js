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

describe('ProductCard component', () => {
  it('renders as expected', () => {
    const product = {
      productName: 'Test Product',
      unitPrice: 10.99,
      imageLink: 'test-image.jpg',
    };

    const { container } = render(<ProductCard product={product} />);
    expect(container).toMatchSnapshot();
  });
});

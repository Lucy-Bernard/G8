import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import Search from '../components/AddToCartButton/AddToCartButton'
import AddToCartButton from "../components/AddToCartButton/AddToCartButton"

// Mocking the 'next/navigation' module for testing
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn()
        }
    }
}))

// Mocking the global fetch function
fetch = jest.fn(() => Promise.resolve());
  /**
   * Test case: Renders the component and matches the snapshot.
   */
it('component renders as expected', async () => {
    // Render the AddToCartButton component
    const { container } = render(<AddToCartButton />)
     // Assert that the rendered component matches the snapshot
    expect(container).toMatchSnapshot()
})
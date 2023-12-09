import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import Search from '../components/NavigationBar/NavigationBar'
import NavigationBar from "../components/NavigationBar/NavigationBar"

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
 * Unit tests for the NavigationBar component.
 */
it('component renders as expected', async () => {
    // Render the NavigationBar component
    const { container } = render(<NavigationBar />)
     // Assert that the rendered component matches the snapshot
    expect(container).toMatchSnapshot()
})
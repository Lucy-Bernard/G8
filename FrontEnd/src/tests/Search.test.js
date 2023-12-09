import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import Search from '../components/Search/Search'

// Mocking the 'next/navigation' module for testing
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn()
        }
    }
}))

//Mocking the global fetch function
fetch = jest.fn(() => Promise.resolve());

it('component renders as expected', async () => {
        //Render the Search component
    const { container } = render(<Search />)
        // Assert that the rendered component matches the snapshot
    expect(container).toMatchSnapshot()
})




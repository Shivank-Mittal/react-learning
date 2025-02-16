import { render } from "@testing-library/react"
import { describe, test } from "vitest"
import LoginButton from "../../components/core/LoginButton"

describe('LoginButton', () => {
    test('renders the LoginButton component', () => {
        render(<LoginButton />)
    })
})
import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { vi } from "vitest"
import Resume from "../pages/Resume"

// Mock AuthContext
vi.mock("../contexts/AuthContext", () => ({
useAuth: () => ({ user: null }),
}))

// Mock Supabase client
vi.mock("../lib/supabaseClient", () => ({
supabase: {
    storage: {
    from: () => ({
        upload: vi.fn(),
        createSignedUrl: vi.fn(),
    }),
    },
    from: () => ({
    upsert: vi.fn(),
    }),
},
}))

// Mock react-router-dom hooks used in Resume.tsx
vi.mock("react-router-dom", () => ({
useNavigate: () => vi.fn(),
useLocation: () => ({ pathname: "/resume", state: {} }),
}))

// Helper to render the component
function renderResume() {
return render(<Resume />)
}

describe("Resume Page", () => {
test("renders the hero headline", () => {
    renderResume()
    expect(
    screen.getByText("Polish your resume with AI powered guidance.")
    ).toBeInTheDocument()
})

test("shows the Upload new resume button", () => {
    renderResume()
    expect(screen.getByText("Upload new resume")).toBeInTheDocument()
})

test("shows the View Feedback on your resume link", () => {
    renderResume()
    expect(
screen.getByText("View Feedback on your resume")
    ).toBeInTheDocument()
})

test("shows the Resume upgrades in minutes section heading", () => {
    renderResume()
    expect(
    screen.getByText("Resume upgrades in minutes")
    ).toBeInTheDocument()
})

test("shows the Made for confident submissions section", () => {
    renderResume()
    expect(
    screen.getByText("Made for confident submissions")
    ).toBeInTheDocument()
})

test("shows loading preview text initially", () => {
    renderResume()
    expect(
    screen.getByText("Pulling the latest resume updates…")
    ).toBeInTheDocument()
})
})

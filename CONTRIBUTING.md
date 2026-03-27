# Contribution Guidelines & SCM Practices

This repository follows standard Source Code Management (SCM) practices as required for the project.

## Branching Strategy

- **`main`**: This branch contains stable, production-ready code. Commits to main should ideally only happen via Pull Requests (PRs).
- **`dev`**: The development branch where active development is merged.
- **`feature/*`**: Feature branches for working on specific issues or modules limit disruptions to the main codebase.
  - Example: `feature/login`, `feature/recommendation-engine`

## Workflow

1. Retrieve the latest code on `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   ```
2. Create a new feature branch out of `dev`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them incrementally.

## Commit Message Practices
Small, focused commits with meaningful messages are strictly required.
- **Good**: "Added login functionality in React"
- **Good**: "Implemented TF-IDF recommendation logic in FastAPI"
- **Bad**: "Fixed stuff and updated code"

## Pull Requests
- Once your feature is complete, push the branch to GitHub.
- Open a Pull Request from `feature/your-feature-name` to `dev`.
- Provide a clear description of what the PR accomplishes and link any relevant GitHub Issues.

## issue Tracking
Use GitHub Issues to track bugs, features, and enhancements. Do not start work on a feature unless there is an associated issue.

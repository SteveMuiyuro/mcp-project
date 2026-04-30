Update the backend GitHub Actions workflow to include running tests.

Important:
Do NOT change anything unrelated to tests.
Do NOT modify deployment logic.
Do NOT add new workflows.
Only add the minimal steps required to run linting and tests before deployment.

Context:
Backend is a FastAPI app using:
- uv for dependency management
- ruff for linting
- pytest for tests

Goal:
Ensure tests run in the deploy workflow BEFORE deployment.

Implementation:

Inside the existing deploy job, before the authentication step, add steps to:

1. Set up Python 3.12
2. Install uv
3. Install backend dependencies
4. Run ruff
5. Run pytest

The steps should:
- run inside backend/ directory
- fail the workflow if tests fail

Use this structure:

- name: Set up Python
  uses: actions/setup-python@v5
  with:
    python-version: "3.12"

- name: Install uv
  run: pip install uv

- name: Install backend dependencies
  run: |
    cd backend
    uv sync

- name: Run lint
  run: |
    cd backend
    uv run ruff check .

- name: Run tests
  run: |
    cd backend
    uv run pytest

Do not:
- add matrix builds
- add caching
- modify environment variables
- modify deployment step
- introduce new tools

After making changes:
- Show the updated workflow file
- Explain only what was added
- Suggest a conventional commit message
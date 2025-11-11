# Project 41 — Advanced GitHub Actions: Reusable Workflows

This repo demonstrates:
- **Reusable CI** workflow that runs Node or Python tests with caching
- **Reusable Docker publish** workflow (Docker Hub or GHCR)
- **Caller** workflow that invokes them with a matrix

## Structure
- `.github/workflows/reusable-ci.yml` — CI (language=node|python)
- `.github/workflows/reusable-docker-publish.yml` — build/push container
- `.github/workflows/main.yml` — example caller with matrix (Node + Python)
- `app-node/`, `app-python/` — minimal apps + tests

## How to use these reusable workflows from another repo
```yaml
jobs:
  ci:
    uses: Raghavachari93/GitHub-Actions-Reusable-workflows/.github/workflows/reusable-ci.yml@main
    with:
      language: node
      working-directory: app-node
      node-version: "20"
      run-tests: true
      use-cache: true

  publish:
    needs: ci
    uses: Raghavachari93/GitHub-Actions-Reusable-workflows/.github/workflows/reusable-docker-publish.yml@main
    with:
      context: .
      image: myapp
      tag: v1
      registry: ghcr
      push: true
    permissions:
      packages: write
Secrets needed (when publishing to Docker Hub)

DOCKER_USERNAME — Docker Hub username

DOCKER_PASSWORD — Docker Hub Access Token

For GHCR, grant:

permissions:
  contents: read
  packages: write


and (optionally) you may use secrets.GITHUB_TOKEN for auth.

Run locally (optional)

Node:

cd app-node
npm ci
npm test


Python:

cd app-python
python -m pip install -U pip
pip install pytest
pytest -q

Notes

actions/cache used for pip; setup-node has built-in npm caching.

Matrix shows how one caller can fan out to multiple languages/versions.

Reusables keep your org’s CI consistent across repos.


---

## ⬆️ Initialize & push

```bash
mkdir -p GitHub-Actions-Reusable-workflows/{app-node/__tests__,app-python/.github/workflows}
mkdir -p GitHub-Actions-Reusable-workflows/.github/workflows
cd GitHub-Actions-Reusable-workflows

# (Create all files exactly as above)

git init
git add .
git commit -m "Project41: reusable CI + Docker publish workflows with demo apps"
git branch -M main
git remote add origin https://github.com/Raghavachari93/GitHub-Actions-Reusable-workflows.git
git push -u origin main

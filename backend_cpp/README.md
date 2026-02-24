# C++ Drogon Backend (Angular‑compatible API Skeleton)

This is a **C++ (Drogon)** REST API skeleton that mirrors a typical **contacts/auth** contract so your Angular 17 app can keep using the **same endpoints**.

👉 **Status:** minimal stub (JWT accepts any `Bearer` token; contacts stored in memory). Swap in MongoDB/JWT verification later without changing routes.

## Endpoints
- `POST /api/auth/register` → `{ message }` (stub)
- `POST /api/auth/login` → `{ accessToken, tokenType, expiresIn }` (stub token)
- `GET /api/users/me` (requires `Authorization: Bearer <token>`) → user object
- `GET /api/contacts` (auth) → array of contacts
- `POST /api/contacts` (auth) → creates and returns contact (any JSON shape)
- `GET /api/contacts/{id}` (auth) → contact
- `PUT /api/contacts/{id}` (auth) → updated contact
- `DELETE /api/contacts/{id}` (auth) → `{ message: "Deleted" }`

## Quick Start (Local, no Docker)

**Prereqs:** CMake ≥ 3.16, a C++17 compiler, and Drogon library.

### Install Drogon (via vcpkg or your package manager)
- Using vcpkg:
  ```bash
  vcpkg install drogon
  # then configure CMake with: -DCMAKE_TOOLCHAIN_FILE=<vcpkg-root>/scripts/buildsystems/vcpkg.cmake
  ```
- Or your OS package manager (Mac: `brew install drogon`, Linux: check distro).

### Build & Run
```bash
cmake -B build -S .
cmake --build build -j
./build/backend
```

Server listens on **http://localhost:8080** (see `config.json`).

### CORS
Global CORS headers are added in `main.cpp` (you can move that into a filter if needed).

## Run with Docker
```bash
docker build -t cpp-backend .
docker run -p 8080:8080 cpp-backend
```
Or:
```bash
docker compose up --build
```

> The Dockerfile uses a **Drogon base image** for convenience. Adjust the tag if needed.

## VS Code
- Includes `.vscode/tasks.json` and `launch.json` for configure/build/run/debug.
  - Run Tasks: **cmake-configure**, **cmake-build**, **run-backend**.

## Upgrade plan (to production‑grade)
1. **JWT verification**: Replace `JwtAuthFilter` with `jwt-cpp` verifying HS256 tokens; set `userId` from `sub`.
2. **MongoDB**: Replace the in‑memory store with `mongocxx` (official C++ driver). Keep route shapes the same.
3. **Validation**: Enforce payload schemas; return 400 with `{ message }` like the current Java API.
4. **Errors**: Mirror status codes and error shapes your Angular app expects.
5. **Logging & metrics**: Drogon has good logging—wire structured logs and health checks.

## Notes
- This stub is intentionally minimal so you can **drop it in** and point your Angular services to the same URLs right away.
- When you’re ready, I can swap in **MongoDB** and **real JWT** while keeping the API contract unchanged.

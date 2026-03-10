## How to Run Aegis Locally (Windows)

This guide shows how to run the full Aegis stack (backend API, frontend dashboard, and CLI) on your Windows machine.

---

### 1. Prerequisites

- Rust (latest stable)
- Python 3.9+
- Node.js 18+
- PostgreSQL 12+ (installed and running locally)

Create a PostgreSQL database:

1. Start PostgreSQL (via Services or pgAdmin).
2. Create a database named `aegis`.
3. Ensure you have a user `postgres` with a password you know (e.g. `postgres`).

You will use that in the `DATABASE_URL` environment variable.

---

### 2. Start the Backend (FastAPI)

From the project root:

```powershell
cd backend

python -m venv venv
.\venv\Scripts\activate

pip install -r requirements.txt
```

Set the `DATABASE_URL` environment variable or create a `.env` file in `backend` with your own PostgreSQL connection string (user, password, host, port, and database name that you configured).

Run the backend (with `DATABASE_URL` configured):

```powershell
uvicorn main:app --reload
```

The API will be available at:

- `http://127.0.0.1:8000`
- Health check: `http://127.0.0.1:8000/health`

Leave this terminal running.

---

### 3. Start the Frontend (Next.js Dashboard)

Open a **new** terminal from the project root:

```powershell
cd frontend

npm install

'NEXT_PUBLIC_API_URL=http://localhost:8000' > .env.local

npm run dev
```

The dashboard will be available at:

- `http://localhost:3000`

---

### 4. Build and Use the CLI

Open another terminal from the project root:

```powershell
cd cli
cargo build --release
```

On Windows, the CLI binary will be:

```powershell
.\target\release\aegis-cli.exe
```

To scan staged files in a git repository (for example, the `aegis` repo itself):

```powershell
cd C:\Users\sudin\Desktop\projects\aegis

$env:AEGIS_API_URL = "http://localhost:8000"
.\cli\target\release\aegis-cli.exe scan
```

If secrets are found:

- The CLI prints findings in the terminal.
- Events are reported to the backend and will appear on the dashboard.

---

### 5. Optional: Install the Pre-commit Hook

From any git repository where you want Aegis to run on each commit:

```powershell
cd path\to\your\repo

path\to\aegis\cli\target\release\aegis-cli.exe install
```

Now every `git commit` will trigger a scan, and secrets will block the commit and show up in your Aegis dashboard (if `AEGIS_API_URL` is configured).


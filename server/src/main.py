from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import config
import src.auth.router as _auth_module

# Fastapi instance
app = FastAPI()

# CORS middleware config (configured for http://localhost:5173 React app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[config.CLIENT_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(_auth_module.router)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import config
import src.auth.router as _auth_module

from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis import asyncio as aioredis


# Fastapi instance
app = FastAPI()

# CORS middleware config (configured for http://localhost:5173 React app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[config.CLIENT_ORIGIN, 'http://192.168.0.15:5173'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(_auth_module.router)


@app.on_event("startup")
async def startup():
    redis = aioredis.from_url("redis://localhost:5432")
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")

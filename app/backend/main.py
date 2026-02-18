from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from . import models
from .routers import marcas, notas
from .routers import login


app = FastAPI()

# 🔹 CONFIGURACIÓN CORS (IMPORTANTE)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Para entrevista/demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear tablas
Base.metadata.create_all(bind=engine)


# Incluir routers
app.include_router(marcas.router)
app.include_router(notas.router)
app.include_router(login.router)


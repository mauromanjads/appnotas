from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from . import models
from .routers import marcas, notas, login

app = FastAPI()

# 🔹 CONFIGURACIÓN CORS
# Solo permitimos los dominios que usarán tu frontend
origins = [
    "https://appnotas-5ai7uxful-mauricio-manjarres-projects.vercel.app",  # Frontend Vercel
    "http://localhost:5173",  # Frontend local para desarrollo
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # dominios permitidos
    allow_credentials=True,      # cookies, headers de autenticación
    allow_methods=["*"],         # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],         # cabeceras personalizadas
)

# 🔹 Crear tablas en la base de datos
Base.metadata.create_all(bind=engine)

# 🔹 Incluir routers
app.include_router(marcas.router)
app.include_router(notas.router)
app.include_router(login.router)

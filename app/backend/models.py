from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

# ---------- Usuario ----------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    password = Column(String)


# ---------- Marca ----------
class Marca(Base):
    __tablename__ = "marcas"

    id = Column(Integer, primary_key=True)
    nombre = Column(String, unique=True)

    notas = relationship("Nota", back_populates="marca" ,passive_deletes=True)


# ---------- Nota ----------
class Nota(Base):
    __tablename__ = "notas"

    id = Column(Integer, primary_key=True)
    titulo = Column(String)
    cuerpo = Column(String)

    marca_id = Column(Integer, ForeignKey("marcas.id"))

    marca = relationship("Marca", back_populates="notas")

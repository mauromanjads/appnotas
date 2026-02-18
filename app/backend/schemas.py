from pydantic import BaseModel

# -------- Marca --------
class MarcaBase(BaseModel):
    nombre: str

class MarcaOut(MarcaBase):
    id: int
    class Config:
        orm_mode = True


# -------- Nota --------
class NotaBase(BaseModel):
    titulo: str
    cuerpo: str
    marca_id: int

class NotaOut(NotaBase):
    id: int
    class Config:
        orm_mode = True


# -------- Login --------
class Login(BaseModel):
    username: str
    password: str

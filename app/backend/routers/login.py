
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from ..database import get_db
from .. import models, schemas, auth

router = APIRouter(
    prefix="/login",
    tags=["Auth"]
)

# =====================================================
# LOGIN
# =====================================================
@router.post("/")
def login(data: schemas.Login, db: Session = Depends(get_db)):

    user = db.query(models.User)\
        .filter(models.User.username == data.username)\
        .first()

    if not user or not auth.verify_pass(data.password, user.password):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    token = auth.crear_token(user.username)

    return {"access_token": token, "token_type": "bearer"}


# =====================================================
# DEPENDENCIA PARA PROTEGER ENDPOINTS
# =====================================================
def get_current_user(token: str):

    try:
        payload = jwt.decode(token, auth.SECRET, algorithms=[auth.ALGO])
        return payload["sub"]

    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

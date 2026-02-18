from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import get_db

router = APIRouter(
    prefix="/notas",
    tags=["Notas"]
)

@router.post("/", response_model=schemas.NotaOut)
def create_nota(data: schemas.NotaBase, db: Session = Depends(get_db)):
    nota = crud.create_nota(db, data.titulo, data.cuerpo, data.marca_id)
    if not nota:
        raise HTTPException(400, "Marca no existe")
    return nota

@router.get("/", response_model=list[schemas.NotaOut])
def get_notas(db: Session = Depends(get_db)):
    return crud.get_notas(db)

@router.get("/{id}", response_model=schemas.NotaOut)
def get_nota(id: int, db: Session = Depends(get_db)):
    nota = crud.get_nota(db, id)
    if not nota:
        raise HTTPException(404, "Nota no encontrada")
    return nota

@router.put("/{id}", response_model=schemas.NotaOut)
def update_nota(id: int, data: schemas.NotaBase, db: Session = Depends(get_db)):
    nota = crud.update_nota(db, id, data.titulo, data.cuerpo, data.marca_id)
    if not nota:
        raise HTTPException(404, "Nota no encontrada")
    return nota

@router.delete("/{id}")
def delete_nota(id: int, db: Session = Depends(get_db)):
    ok = crud.delete_nota(db, id)
    if not ok:
        raise HTTPException(404, "Nota no encontrada")
    return {"mensaje": "Nota eliminada"}

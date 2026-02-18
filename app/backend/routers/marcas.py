from unittest import result
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import get_db

router = APIRouter(
    prefix="/marcas",
    tags=["Marcas"]
)

@router.post("/", response_model=schemas.MarcaOut)
def create_marca(data: schemas.MarcaBase, db: Session = Depends(get_db)):
    marca = crud.create_marca(db, data.nombre)
    if not marca:
        raise HTTPException(400, "Marca ya existe")
    return marca

@router.get("/", response_model=list[schemas.MarcaOut])
def get_marcas(db: Session = Depends(get_db)):
    return crud.get_marcas(db)

@router.get("/{id}", response_model=schemas.MarcaOut)
def get_marca(id: int, db: Session = Depends(get_db)):
    marca = crud.get_marca(db, id)
    if not marca:
        raise HTTPException(404, "Marca no encontrada")
    return marca

@router.put("/{id}", response_model=schemas.MarcaOut)
def update_marca(id: int, data: schemas.MarcaBase, db: Session = Depends(get_db)):
    marca = crud.update_marca(db, id, data.nombre)
    if not marca:
        raise HTTPException(404, "Marca no encontrada")
    return marca

@router.delete("/{id}")
def delete_marca(id: int, db: Session = Depends(get_db)):
    ok = crud.delete_marca(db, id)

    if ok is None:
        raise HTTPException(
            status_code=400,
            detail="No se puede eliminar la marca porque tiene notas asociadas"
        )

    if result is False:
        raise HTTPException(status_code=404, detail="Marca no encontrada")


    if not ok:
        raise HTTPException(404, "Marca no encontrada")
    return {"mensaje": "Marca eliminada"}

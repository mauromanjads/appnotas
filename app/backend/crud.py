from sqlalchemy.orm import Session
from . import models


# =========================================================
# MARCAS
# =========================================================

def create_marca(db: Session, nombre: str):
    existe = db.query(models.Marca)\
        .filter(models.Marca.nombre == nombre)\
        .first()

    if existe:
        return None

    marca = models.Marca(nombre=nombre)
    db.add(marca)
    db.commit()
    db.refresh(marca)
    return marca


def get_marcas(db: Session):
    return db.query(models.Marca).all()


def get_marca(db: Session, marca_id: int):
    return db.query(models.Marca).get(marca_id)


def update_marca(db: Session, marca_id: int, nombre: str):
    marca = db.query(models.Marca).get(marca_id)
    if not marca:
        return None

    marca.nombre = nombre
    db.commit()
    db.refresh(marca)
    return marca


def delete_marca(db: Session, marca_id: int):
    marca = db.query(models.Marca).get(marca_id)
    if not marca:
        return False

    # 🔥 Validar si hay notas asociadas
    tiene_notas = db.query(models.Nota)\
        .filter(models.Nota.marca_id == marca_id)\
        .first()

    if tiene_notas:
        return None

    db.delete(marca)
    db.commit()
    return True


# =========================================================
# NOTAS
# =========================================================

def create_nota(db: Session, titulo: str, cuerpo: str, marca_id: int):

    # Validar FK
    marca = db.query(models.Marca).get(marca_id)
    if not marca:
        return None

    nota = models.Nota(
        titulo=titulo,
        cuerpo=cuerpo,
        marca_id=marca_id
    )

    db.add(nota)
    db.commit()
    db.refresh(nota)
    return nota


def get_notas(db: Session):
    return db.query(models.Nota).all()


def get_nota(db: Session, nota_id: int):
    return db.query(models.Nota).get(nota_id)


def update_nota(db: Session,
                nota_id: int,
                titulo: str,
                cuerpo: str,
                marca_id: int):

    nota = db.query(models.Nota).get(nota_id)
    if not nota:
        return None

    nota.titulo = titulo
    nota.cuerpo = cuerpo
    nota.marca_id = marca_id

    db.commit()
    db.refresh(nota)
    return nota


def delete_nota(db: Session, nota_id: int):
    nota = db.query(models.Nota).get(nota_id)
    if not nota:
        return False

    db.delete(nota)
    db.commit()
    return True



from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

SECRET="secreto123"
ALGO="HS256"

pwd = CryptContext(schemes=["bcrypt"])

def hash_pass(p):
    return pwd.hash(p)

def verify_pass(p, h):
    return pwd.verify(p, h)

def crear_token(user):
    payload={
        "sub": user,
        "exp": datetime.utcnow()+timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET, algorithm=ALGO)

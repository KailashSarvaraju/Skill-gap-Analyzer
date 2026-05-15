from jose import jwt
from datetime import datetime, timedelta
import hashlib

SECRET_KEY = "skillgapsecret"
ALGORITHM = "HS256"

# HASH PASSWORD
def hash_password(password: str):

    return hashlib.sha256(
        password.encode()
    ).hexdigest()

# VERIFY PASSWORD
def verify_password(
    plain_password,
    hashed_password
):

    return (
        hashlib.sha256(
            plain_password.encode()
        ).hexdigest()
        == hashed_password
    )

# CREATE JWT TOKEN
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        hours=1
    )

    to_encode.update({
        "exp": expire
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

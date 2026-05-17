from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://skill_gap_analyzer_user:tHYZQRB4mTrRegXNergGlILVKuVCBtOl@dpg-d84ltn3eo5us73eem580-a.virginia-postgres.render.com/skill_gap_analyzer"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
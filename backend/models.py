from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey
)

from sqlalchemy.orm import relationship

from database import Base

# =========================================
# USER MODEL
# =========================================
class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    password = Column(
        String,
        nullable=False
    )

# =========================================
# SKILL ANALYSIS MODEL
# =========================================
class SkillAnalysis(Base):

    __tablename__ = "skill_analysis"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    domain = Column(String)

    strong_skills = Column(String)

    missing_skills = Column(String)

    progress = Column(String)

    level = Column(String)

    # RELATIONSHIP
    user = relationship("User")

# =========================================
# PROFILE MODEL
# =========================================
class Profile(Base):

    __tablename__ = "profiles"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    email = Column(String)

    role = Column(String)

    experience = Column(String)

    bio = Column(String)

    github = Column(String)

    linkedin = Column(String)

    skills = Column(String)

    # RELATIONSHIP
    user = relationship("User")

# =========================================
# SETTINGS MODEL
# =========================================
class Settings(Base):

    __tablename__ = "settings"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    dark_mode = Column(Boolean)

    notifications = Column(Boolean)

    # RELATIONSHIP
    user = relationship("User")

# =========================================
# RESUME MODEL
# =========================================
class Resume(Base):

    __tablename__ = "resumes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    full_name = Column(String)

    email = Column(String)

    phone = Column(String)

    education = Column(String)

    skills = Column(String)

    projects = Column(String)

    summary = Column(String)

    # RELATIONSHIP
    user = relationship("User")
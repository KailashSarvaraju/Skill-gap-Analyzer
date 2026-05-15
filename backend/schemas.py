from pydantic import BaseModel

class UserCreate(BaseModel):

    username: str
    email: str
    password: str

class UserLogin(BaseModel):

    email: str
    password: str
from pydantic import BaseModel


class SkillAnalysisCreate(BaseModel):

    user_id: int

    domain: str

    strong_skills: list[str]

    missing_skills: list[str]

    progress: float

    level: str

# =========================================
# PROFILE SCHEMA
# =========================================
class ProfileCreate(BaseModel):

    user_id: int

    email: str

    role: str

    experience: str

    bio: str

    github: str

    linkedin: str

    skills: str

class ProfileCreate(BaseModel):

    username: str

    email: str

    role: str

    experience: str

    skills: str

class SettingsCreate(BaseModel):

    dark_mode: bool

    notifications: bool

class ResumeCreate(BaseModel):

    full_name: str

    email: str

    phone: str

    education: str

    skills: str

    projects: str

    summary: str
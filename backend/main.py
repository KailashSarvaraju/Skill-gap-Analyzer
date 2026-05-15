from fastapi import (
    FastAPI,
    Depends,
    UploadFile,
    File,
    HTTPException
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from sqlalchemy.orm import Session

from pydantic import BaseModel

from database import (
    engine,
    SessionLocal
)

from PyPDF2 import PdfReader

import models

from schemas import (
    UserCreate,
    UserLogin,
    SkillAnalysisCreate,
    ProfileCreate,
    SettingsCreate,
    ResumeCreate
)

from auth import (
    hash_password,
    verify_password,
    create_access_token
)

# =========================================
# CREATE DATABASE TABLES
# =========================================
models.Base.metadata.create_all(bind=engine)

# =========================================
# FASTAPI APP
# =========================================
app = FastAPI()

# =========================================
# CORS
# =========================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================
# DATABASE CONNECTION
# =========================================
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

# =========================================
# HOME ROUTE
# =========================================
@app.get("/")
def home():

    return {
        "message":
        "Backend Running Successfully"
    }

# =========================================
# DOMAIN DATA
# =========================================
domains = {

    "Web Development": [
        "html",
        "css",
        "javascript",
        "react",
        "node",
        "git"
    ],

    "Data Science": [
        "python",
        "pandas",
        "numpy",
        "machine learning",
        "sql"
    ],

    "AI/ML": [
        "python",
        "deep learning",
        "nlp",
        "tensorflow"
    ],

    "Cyber Security": [
        "networking",
        "linux",
        "python",
        "ethical hacking"
    ]
}

# =========================================
# REQUEST MODEL
# =========================================
class SkillRequest(BaseModel):

    domain: str

    skills: list[str]

# =========================================
# SKILL ANALYSIS
# =========================================
@app.post("/analyze-skills")
def analyze_skills(data: SkillRequest):

    required_skills = domains.get(
        data.domain,
        []
    )

    user_skills = [
        skill.lower()
        for skill in data.skills
    ]

    strong_skills = [
        skill
        for skill in required_skills
        if skill.lower() in user_skills
    ]

    missing_skills = [
        skill
        for skill in required_skills
        if skill.lower() not in user_skills
    ]

    progress = (
        len(strong_skills)
        / len(required_skills)
    ) * 100 if required_skills else 0

    if progress < 40:

        level = "Beginner"

    elif progress < 70:

        level = "Intermediate"

    else:

        level = "Advanced"

    return {

        "domain": data.domain,

        "your_skills": data.skills,

        "strong_skills": strong_skills,

        "missing_skills": missing_skills,

        "progress": round(progress, 2),

        "level": level
    }

# =========================================
# SAVE ANALYSIS
# =========================================
@app.post("/save-analysis")
def save_analysis(
    analysis: SkillAnalysisCreate,
    db: Session = Depends(get_db)
):

    new_analysis = models.SkillAnalysis(

        user_id=analysis.user_id,

        domain=analysis.domain,

        strong_skills=",".join(
            analysis.strong_skills
        ),

        missing_skills=",".join(
            analysis.missing_skills
        ),

        progress=str(
            analysis.progress
        ),

        level=analysis.level
    )

    db.add(new_analysis)

    db.commit()

    return {
        "message":
        "Analysis saved successfully"
    }

# =========================================
# DASHBOARD
# =========================================
@app.get("/dashboard/{user_id}")
def get_dashboard_data(
    user_id: int,
    db: Session = Depends(get_db)
):

    latest_analysis = db.query(
        models.SkillAnalysis
    ).filter(
        models.SkillAnalysis.user_id == user_id
    ).order_by(
        models.SkillAnalysis.id.desc()
    ).first()

    if not latest_analysis:

        return {
            "message":
            "No analysis found"
        }

    return {

        "domain":
        latest_analysis.domain,

        "strong_skills":
        latest_analysis.strong_skills.split(","),

        "missing_skills":
        latest_analysis.missing_skills.split(","),

        "progress":
        latest_analysis.progress,

        "level":
        latest_analysis.level
    }

# =========================================
# RESUME UPLOAD
# =========================================
@app.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...)
):

    pdf_reader = PdfReader(file.file)

    text = ""

    for page in pdf_reader.pages:

        text += page.extract_text() or ""

    text = text.lower()

    all_skills = [

        "html",
        "css",
        "javascript",
        "react",
        "node",
        "git",
        "python",
        "pandas",
        "numpy",
        "machine learning",
        "sql",
        "deep learning",
        "nlp",
        "tensorflow",
        "networking",
        "linux",
        "ethical hacking",
        "fastapi",
        "postgresql",
        "docker",
        "aws",
        "typescript"
    ]

    detected_skills = []

    for skill in all_skills:

        if skill in text:

            detected_skills.append(skill)

    best_domain = ""

    best_score = 0

    missing_skills = []

    for domain, skills in domains.items():

        matched = len([
            skill
            for skill in skills
            if skill in detected_skills
        ])

        if matched > best_score:

            best_score = matched

            best_domain = domain

            missing_skills = [
                skill
                for skill in skills
                if skill not in detected_skills
            ]

    ats_score = int(
        (
            len(detected_skills)
            / len(all_skills)
        ) * 100
    )

    if ats_score < 35:

        skill_level = "Beginner"

    elif ats_score < 70:

        skill_level = "Intermediate"

    else:

        skill_level = "Advanced"

    career_tips = [

        f"Improve skills for {best_domain}",

        "Build real-world projects",

        "Optimize resume for ATS systems",

        "Add certifications",

        "Keep LinkedIn updated"
    ]

    return {

        "best_domain":
        best_domain,

        "skill_level":
        skill_level,

        "resume_score":
        ats_score,

        "detected_skills":
        detected_skills,

        "missing_skills":
        missing_skills,

        "career_tips":
        career_tips
    }

# =========================================
# SIGNUP
# =========================================
@app.post("/signup")
def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(
        models.User
    ).filter(
        models.User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = hash_password(
        user.password
    )

    new_user = models.User(

        username=user.username,

        email=user.email,

        password=hashed_password
    )

    db.add(new_user)

    db.commit()

    return {
        "message":
        "User created successfully"
    }

# =========================================
# LOGIN
# =========================================
@app.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    existing_user = db.query(
        models.User
    ).filter(
        models.User.email == user.email
    ).first()

    if not existing_user:

        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )

    valid_password = verify_password(
        user.password,
        existing_user.password
    )

    if not valid_password:

        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    access_token = create_access_token(

        data={
            "sub":
            existing_user.email
        }
    )

    return {

        "message":
        "Login successful",

        "access_token":
        access_token,

        "token_type":
        "bearer"
    }

# =========================================
# CREATE OR UPDATE PROFILE
# =========================================
@app.post("/create-profile")
def create_profile(
    profile: ProfileCreate,
    db: Session = Depends(get_db)
):

    existing_profile = db.query(
        models.Profile
    ).filter(
        models.Profile.user_id == profile.user_id
    ).first()

    if existing_profile:

        existing_profile.email = profile.email
        existing_profile.role = profile.role
        existing_profile.experience = profile.experience
        existing_profile.bio = profile.bio
        existing_profile.github = profile.github
        existing_profile.linkedin = profile.linkedin
        existing_profile.skills = profile.skills

        db.commit()

        return {
            "message":
            "Profile updated successfully"
        }

    new_profile = models.Profile(

        user_id=profile.user_id,

        email=profile.email,

        role=profile.role,

        experience=profile.experience,

        bio=profile.bio,

        github=profile.github,

        linkedin=profile.linkedin,

        skills=profile.skills
    )

    db.add(new_profile)

    db.commit()

    return {
        "message":
        "Profile created successfully"
    }

# =========================================
# GET PROFILE
# =========================================
@app.get("/profile/{user_id}")
def get_profile(
    user_id: int,
    db: Session = Depends(get_db)
):

    profile = db.query(
        models.Profile
    ).filter(
        models.Profile.user_id == user_id
    ).first()

    if not profile:

        return {
            "message":
            "Profile not found"
        }

    return profile
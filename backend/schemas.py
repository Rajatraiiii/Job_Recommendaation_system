from pydantic import BaseModel
from typing import Optional, List

class UserCreate(BaseModel):
    username: str
    password: str

class UserProfileUpdate(BaseModel):
    skills: str
    experience: str

class UserResponse(BaseModel):
    id: int
    username: str
    skills: Optional[str] = None
    experience: Optional[str] = None

    class Config:
        from_attributes = True

class JobCreate(BaseModel):
    title: str
    company: str
    description: str
    requirements: str

class JobResponse(BaseModel):
    id: int
    title: str
    company: str
    description: str
    requirements: str

    class Config:
        from_attributes = True

class RecommendedJob(BaseModel):
    job: JobResponse
    match_score: float

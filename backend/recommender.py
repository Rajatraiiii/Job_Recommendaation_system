from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List
import models

def get_job_recommendations(user: models.User, jobs: List[models.Job]) -> List[dict]:
    """
    Computes TF-IDF vectors for the user profile, matched against all jobs.
    Returns a sorted list of dictionaries with job and match_score.
    """
    if not user.skills and not user.experience:
        return []
    
    if not jobs:
        return []

    # Prepare user profile document
    user_doc = f"{user.skills or ''} {user.experience or ''}"
    
    # Prepare job documents
    job_docs = [f"{job.title} {job.description} {job.requirements}" for job in jobs]
    
    # Combine user doc with job docs to fit vectorizer on entire vocabulary
    all_docs = [user_doc] + job_docs
    
    # Using TF-IDF
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(all_docs)
    
    # Calculate cosine similarity of user_doc (index 0) against all job docs (index 1 to N)
    cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
    
    recommended_jobs = []
    for idx, job in enumerate(jobs):
        score = float(cosine_sim[idx])
        if score > 0.05: # Minimum threshold to weed out completely unrelated jobs
            recommended_jobs.append({
                "job": job,
                "match_score": round(score * 100, 2) # percentage matching
            })
            
    # Sort by descending score
    recommended_jobs.sort(key=lambda x: x["match_score"], reverse=True)
    
    return recommended_jobs

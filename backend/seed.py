from database import SessionLocal, engine
import models

# Re-create tables
models.Base.metadata.create_all(bind=engine)

def seed_db():
    db = SessionLocal()
    
    if db.query(models.Job).count() > 0:
        print("Database already seeded!")
        return
        
    jobs = [
        models.Job(
            title="Frontend React Developer",
            company="Google",
            description="We are looking for a skilled React Developer. You will be responsible for building highly responsive user interface components using react concepts.",
            requirements="React.js, Tailwind CSS, Javascript, TypeScript, Git"
        ),
        models.Job(
            title="Backend Data Engineer",
            company="Amazon",
            description="Build scalable data pipelines. Experience with Python, AWS, and SQL is required.",
            requirements="Python, SQL, AWS, ETL, Spark"
        ),
        models.Job(
            title="Machine Learning Engineer Intern",
            company="OpenAI",
            description="Join our team as an ML intern. Help improve our models using deep learning, NLP, and scikit-learn.",
            requirements="Python, Machine Learning, Scikit-learn, TensorFlow, NLP"
        ),
        models.Job(
            title="Full Stack Software Engineer",
            company="Microsoft",
            description="Full stack engineer to work on enterprise web apps. Experience in React frontend and FastAPI or Node.js backend.",
            requirements="React, Node.js, FastAPI, Python, SQL, REST APIs"
        )
    ]
    
    db.add_all(jobs)
    db.commit()
    print("Database seeded with mock jobs!")
    db.close()

if __name__ == "__main__":
    seed_db()

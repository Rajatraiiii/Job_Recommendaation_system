"""Run this script to add 25+ diverse jobs to the database."""
from database import SessionLocal
import models

extra_jobs = [
    models.Job(
        title="Senior Frontend Engineer",
        company="Stripe",
        description="Build beautiful, fast payment UIs used by millions worldwide. Own end-to-end features from design review to production rollout.",
        requirements="React, TypeScript, CSS, Web Performance, REST APIs, Git"
    ),
    models.Job(
        title="Backend Software Engineer",
        company="Razorpay",
        description="Design and scale backend microservices powering India's largest payment gateway. Work on high-throughput systems handling 2M+ transactions per day.",
        requirements="Java, Spring Boot, PostgreSQL, Kafka, Docker, Microservices"
    ),
    models.Job(
        title="Data Scientist",
        company="Swiggy",
        description="Use data to optimise delivery routes, forecast demand, and improve customer satisfaction. Partner with product to build ML-powered features.",
        requirements="Python, Pandas, Scikit-learn, SQL, Statistics, A/B Testing"
    ),
    models.Job(
        title="DevOps Engineer",
        company="Zepto",
        description="Own the infrastructure for our 10-minute delivery platform. Drive reliability, observability, and deployment velocity across the org.",
        requirements="Kubernetes, Terraform, AWS, CI/CD, Prometheus, Linux, Docker"
    ),
    models.Job(
        title="Product Manager",
        company="Meesho",
        description="Define the roadmap for our seller tools. Work cross-functionally with engineering, design, and ops to ship products millions of small sellers rely on.",
        requirements="Product Strategy, SQL, Roadmapping, User Research, Wireframing, Analytics"
    ),
    models.Job(
        title="iOS Developer",
        company="PhonePe",
        description="Build and maintain our iOS app with 350M+ users. Write performant Swift code and collaborate closely with design to create delightful experiences.",
        requirements="Swift, SwiftUI, Xcode, UIKit, REST APIs, CoreData, Git"
    ),
    models.Job(
        title="Android Developer",
        company="CRED",
        description="Work on the Android app for India's most design-forward fintech brand. You'll ship features that are polished, performant, and pixel-perfect.",
        requirements="Kotlin, Jetpack Compose, Android SDK, MVVM, Retrofit, Room"
    ),
    models.Job(
        title="Machine Learning Engineer",
        company="Ola",
        description="Build ML systems that predict surge pricing, match drivers to riders, and detect fraud. Your models run in production and affect millions of trips daily.",
        requirements="Python, TensorFlow, MLflow, SQL, Feature Engineering, Model Deployment"
    ),
    models.Job(
        title="UI/UX Designer",
        company="Figma",
        description="Design intuitive collaboration features for a product used by 4M+ designers. Run user research, build prototypes, and own the design system.",
        requirements="Figma, User Research, Prototyping, Interaction Design, Design Systems"
    ),
    models.Job(
        title="Cloud Infrastructure Engineer",
        company="Infosys",
        description="Architect and manage cloud environments for enterprise clients on AWS and Azure. Lead migrations and implement best practices for security and cost.",
        requirements="AWS, Azure, Terraform, Python, Bash, Networking, Security"
    ),
    models.Job(
        title="Full Stack Developer",
        company="Freshworks",
        description="Build customer service tools used by 60,000 businesses. Own features across the stack — from database queries to the React frontend.",
        requirements="React, Node.js, PostgreSQL, REST APIs, Redis, TypeScript, Docker"
    ),
    models.Job(
        title="Data Engineer",
        company="Flipkart",
        description="Build the data pipelines that power Flipkart's analytics platform. Ingest terabytes of event data daily and make it accessible to analysts and ML teams.",
        requirements="Apache Spark, Python, Hive, Kafka, SQL, Airflow, AWS S3"
    ),
    models.Job(
        title="Security Engineer",
        company="Zscaler",
        description="Protect cloud security infrastructure used by Fortune 500 companies. Hunt vulnerabilities, review code, and shape security architecture across products.",
        requirements="Network Security, Python, Penetration Testing, OWASP, Cloud Security, Linux"
    ),
    models.Job(
        title="Site Reliability Engineer",
        company="Nykaa",
        description="Ensure our e-commerce platform stays fast and available during high-traffic sale events. Define SLOs, build runbooks, and reduce MTTR.",
        requirements="Kubernetes, AWS, Python, Grafana, Prometheus, On-call, Incident Management"
    ),
    models.Job(
        title="NLP Engineer",
        company="Sarvam AI",
        description="Build language models and NLP pipelines for Indic languages. Work on ASR, translation, and conversational AI for Bharat-first AI products.",
        requirements="Python, HuggingFace, PyTorch, NLP, Transformers, CUDA, Linux"
    ),
    models.Job(
        title="Embedded Systems Engineer",
        company="Ather Energy",
        description="Develop firmware for our electric scooters. Write real-time software for motor controllers, battery management systems, and vehicle ECUs.",
        requirements="C, C++, RTOS, CAN Bus, Embedded Linux, Python, Hardware Debugging"
    ),
    models.Job(
        title="QA Engineer",
        company="BrowserStack",
        description="Test and improve the platform that helps 50,000+ companies test their software. Write automation frameworks and improve test coverage across web and mobile.",
        requirements="Selenium, Python, TestNG, API Testing, CI/CD, JIRA, Agile"
    ),
    models.Job(
        title="Blockchain Developer",
        company="Polygon",
        description="Build smart contracts and Web3 infrastructure for the scaling layer of Ethereum. Deploy and audit Solidity contracts used by leading DeFi protocols.",
        requirements="Solidity, Ethereum, Hardhat, Web3.js, JavaScript, DeFi, Security Auditing"
    ),
    models.Job(
        title="Growth Analyst",
        company="Dream11",
        description="Use data to drive user acquisition, retention, and monetisation for India's largest fantasy sports platform. Own experiments end-to-end.",
        requirements="SQL, Python, Google Analytics, A/B Testing, Excel, Tableau, Product Analytics"
    ),
    models.Job(
        title="Technical Writer",
        company="Postman",
        description="Write world-class API documentation for a product used by 25M+ developers. Make complex concepts simple with clear prose and great examples.",
        requirements="Technical Writing, API Documentation, Markdown, REST APIs, Git, Communication"
    ),
    models.Job(
        title="Computer Vision Engineer",
        company="Grey Orange",
        description="Build vision systems for warehouse automation robots. Train and deploy real-time object detection and segmentation models at the edge.",
        requirements="Python, OpenCV, PyTorch, YOLO, CUDA, C++, ROS, Edge Deployment"
    ),
    models.Job(
        title="Database Administrator",
        company="Zoho",
        description="Manage and tune PostgreSQL and MySQL clusters for Zoho's suite of 50+ SaaS products. Own backups, replication, performance, and DR planning.",
        requirements="PostgreSQL, MySQL, SQL Tuning, Replication, Backup & Recovery, Linux, Python"
    ),
    models.Job(
        title="Software Development Engineer Intern",
        company="Adobe",
        description="Join Adobe's creative cloud team for a 6-month internship. Build features used by millions of creatives worldwide under the guidance of senior engineers.",
        requirements="Java, Python, Data Structures, Algorithms, REST APIs, Git, Problem Solving"
    ),
    models.Job(
        title="Platform Engineer",
        company="Juspay",
        description="Build internal developer platforms that help 300+ engineers ship faster. Own golden paths, internal tooling, and the CI/CD ecosystem.",
        requirements="Go, Kubernetes, Helm, Terraform, Backstage, Python, Platform Engineering"
    ),
    models.Job(
        title="Research Scientist",
        company="TCS Research",
        description="Conduct applied ML research that translates into real products. Publish papers, prototype ideas, and collaborate with engineering teams to productionize work.",
        requirements="Python, Deep Learning, PyTorch, Mathematics, Research Writing, Computer Vision or NLP"
    ),
    models.Job(
        title="Solutions Architect",
        company="AWS",
        description="Work with enterprise customers to design cloud architectures that are secure, scalable, and cost-effective. Prototype solutions and lead technical workshops.",
        requirements="AWS, Solution Design, Networking, Security, Communication, Python, Customer Engagement"
    ),
]


def run():
    db = SessionLocal()
    try:
        db.add_all(extra_jobs)
        db.commit()
        total = db.query(models.Job).count()
        print(f"Added {len(extra_jobs)} jobs. Total jobs in DB: {total}")
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    run()

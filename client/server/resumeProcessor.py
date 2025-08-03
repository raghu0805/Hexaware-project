import sys
import json
import pdfplumber
from sentence_transformers import SentenceTransformer
from transformers import pipeline

def extract_text_from_pdf(file_path):
    with pdfplumber.open(file_path) as pdf:
        return "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])


def extract_skills(text):
    ner = pipeline("ner", model="dslim/bert-base-NER", grouped_entities=True)
    result = ner(text)
    skills = [ent['word'] for ent in result if ent['entity_group'] in ['MISC', 'ORG', 'PER']]
    return list(set(skills))

def generate_embedding(text):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    return model.encode(text).tolist()

if __name__ == "__main__":
    resume_path = sys.argv[1]
    resume_text = extract_text_from_pdf(resume_path)
    skills = extract_skills(resume_text)
    embedding = generate_embedding(resume_text)
    
    result = {
        "skills": skills,
        "embedding": embedding
    }
    print(json.dumps(result))

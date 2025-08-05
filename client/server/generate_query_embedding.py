from transformers import pipeline
import json
import sys

# Use better NER model
ner = pipeline("ner", model="dslim/bert-base-NER", grouped_entities=True)

text = sys.argv[1]
entities = ner(text)

skills = []
for ent in entities:
    if ent['entity_group'] in ['SKILL', 'MISC', 'ORG']:  # skill types can vary
        word = ent['word'].replace("##", "").strip()
        if len(word) > 2 and word.lower() not in ['chennai', 'b.tech']:
            skills.append(word)

skills = sorted(set(skills))
print(json.dumps(skills))

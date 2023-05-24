import spacy

def calculate_similarity(sentence1, sentence2):
    nlp = spacy.load("en_core_web_md")
    doc1 = nlp(sentence1)
    doc2 = nlp(sentence2)
    similarity_score = doc1.similarity(doc2)
    return similarity_score

# Example usage
sentence1 = "Hello, how are you?"
sentence2 = "Hey there, how are you doing?"
similarity_score = calculate_similarity(sentence1, sentence2)
print(f"Similarity score: {similarity_score}")

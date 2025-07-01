from flask import Flask, request, jsonify
from flask_cors import CORS
from collections import defaultdict
import random

app = Flask(__name__)
CORS(app)

# Build a bigram model (word -> list of possible next words)
bigram_tree = defaultdict(list)

def build_bigram_model(corpus_text):
    words = corpus_text.split()
    for i in range(len(words) - 1):
        w1 = words[i].lower().strip('.,!?:;')
        w2 = words[i+1].lower().strip('.,!?:;')
        if w1 and w2:
            bigram_tree[w1].append(w2)

# Load sample corpus
sample_corpus = """
Artificial intelligence and machine learning are transforming industries across the globe. Deep learning, a subset of machine learning, enables computers to process large volumes of data and recognize patterns. Natural language processing helps machines understand and respond to human language in real time. Big data analytics, powered by advanced algorithms and cloud computing, drive actionable insights in finance, healthcare, and education. Neural networks, reinforcement learning, and generative models are pushing the boundaries of what machines can do, from creating art to diagnosing diseases. As technology evolves, ethical considerations and data privacy remain critical concerns.
"""
build_bigram_model(sample_corpus)

@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.get_json()
    word = data.get('word', '').lower()
    if not word or word not in bigram_tree:
        return jsonify({'suggestions': []})
    next_words = bigram_tree[word]
    suggestions = random.sample(next_words, min(len(next_words), 5))
    return jsonify({'suggestions': suggestions})

if __name__ == '__main__':
    app.run(debug=True)

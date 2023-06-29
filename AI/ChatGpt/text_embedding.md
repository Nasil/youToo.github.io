## embedding
```python
import matplotlib.pyplot as plt
import matplotlib
import numpy as np
import pandas as pd
from sklearn.manifold import TSNE
import numpy as np
import json
import openai
from sklearn.decomposition import PCA
from openai.embeddings_utils import get_embeddings

openai.api_key = "OPEN API KEY"
FILE_NAME = 'embeddings.jsonl'


def embedding():
    wors = ["빨강", "빨간색", "파랑", "흰색"]
    resp = openai.Embedding.create(
        input=wors,
        engine="text-similarity-davinci-001"
    )
    embeddings = {}
    embeddings[wors[0]] = resp['data'][0]['embedding']
    embeddings[wors[1]] = resp['data'][1]['embedding']
    embeddings[wors[2]] = resp['data'][2]['embedding']
    embeddings[wors[3]] = resp['data'][3]['embedding']

    save_embeddings_to_jsonl(embeddings, FILE_NAME)

def save_embeddings_to_jsonl(embeddings, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        for word, embed in embeddings.items():
            embed = embed.tolist() if isinstance(embed, np.ndarray) else embed
            line = json.dumps({"word": word, "embedding": embed})
            f.write(line + "\n")

def show():
    samples = pd.read_json(FILE_NAME, lines=True)
    categories = sorted(samples["category"].unique())
    print("Categories of DBpedia samples:", samples["category"].value_counts())
    samples.head()

    # NOTE: The following code will send a query of batch size 200 to /embeddings
    matrix = get_embeddings(samples["text"].to_list(), engine="text-embedding-ada-002")

    pca = PCA(n_components=3)
    vis_dims = pca.fit_transform(matrix)
    samples["embed_vis"] = vis_dims.tolist()

    fig = plt.figure(figsize=(10, 5))
    ax = fig.add_subplot(projection='3d')
    cmap = plt.get_cmap("tab20")

    # Plot each sample category individually such that we can set label name.
    for i, cat in enumerate(categories):
        sub_matrix = np.array(samples[samples["category"] == cat]["embed_vis"].to_list())
        x=sub_matrix[:, 0]
        y=sub_matrix[:, 1]
        z=sub_matrix[:, 2]
        colors = [cmap(i/len(categories))] * len(sub_matrix)
        ax.scatter(x, y, zs=z, zdir='z', c=colors, label=cat)

    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_zlabel('z')
    ax.legend(bbox_to_anchor=(1.1, 1))


# embedding()
show()
```

## sample
```json
{"text":"빨강", "category":"red"}
{"text":"파랑", "category":"blue"}
{"text":"빨간", "category":"red"}
{"text":"빨강/L", "category":"red"}
{"text":"파란색/L", "category":"blue"}
{"text":"블루", "category":"blue"}
{"text":"블랙", "category":"black"}
{"text":"검정", "category":"black"}
{"text":"L", "category":"size"}
{"text":"M", "category":"size"}
{"text":"S", "category":"size"}
```

# healthier-demo
![Image](/Image.png)

# Demo
https://drive.google.com/file/d/1QNyNy5Gv36adVFl43B6VRF6AaTAyzRia/view?usp=sharing

# How to Run Locally
```
git clone https://github.com/elainejiangg/healthier-demo.git
cd interface/client && npm install && npm start
cd interface/server && npm install && npm start
```

# Basic Workflow
- Process unstructured data into structured jsons using OpenAI's ChatCompletions and Structure Outputs 
    - Reasoning: Easier understanding of information for Assistants API when fed into assistant instructins/contextual window
- Upload structured jsons to MongoDB database
    - Reasoning: MongoDB for its document-based structure and flexible schema/unstructureness for future scalability/changes 
- Feed user prompt as a message in thread and structured data as assistant instructions into OpenAI Assistants API
    - Reasoning: I have the most experience with OpenAI APIs and particularly with the Assistants API. It takes care of most of the RAG system and does a decent job at it (accuracy and speed wise).
- Build interface using React, NodeJS, and TailwindCSS
    - Reasoning: I have the most experience with React, NodeJS, and TailwindCSS for web development

# Improvements
- Faster, more accurate, cost-efficient querying.
    - Possible using vector store search/embeddings to handle more specific data and perform cosine similarity searches to retrieve relevan data (i.e., LangChain)
    - Have two assistants. The first preprocesses the user prompts to generate NoSQL queries if additional specific data is needed. It retrieves the information and passes it to the second main assistant which uses this information to respond to the user. The second main assistant will always have a brief summary of all benefits programs in its contextual window for answering broad questions. (I did this with my project at the Media Lab with a good degree of success but did not have enough time to implement this with this project)
    - Use keyword and embeddings of those for alignments between benefit programs and user prompts
- Better way of storing charts in MongoDB
- Persevere specificity of data. Due to time constraints and time/cost issues with keeping such a large context window with the OpenAI Assistants API, when converting from unstructured to structured data, I specified for Chat Completions to summarize the data where it sees fit.

# Future Integrations
- Languages (e.g., Spanish, Mandarin, etc.) using Google Cloud Translate API
- Accessibility (e.g., speech-to-text, text-to-speech; screen-reader accessible)
- Mobile app or SMS-based chatbot
- Deploy app (I ran into issues with deploy. Hence, the vercel link does not actually work, unfortunately)
- Build adminstrator interface to simply upload benefit documents and automated structuring and uploading to MongoDB

# Similar Past Projects
- Amika at MIT Media Lab Fluid Interfaces: https://drive.google.com/file/d/1qPKe5Ok0HKYoR-RVM7ctCEQR-lKeflHB/view?usp=sharing Used OpenAI Assistants API to dynamically build profiles of user and their relationships through consistent conversation, storing information as structured data in MongoDB. Also manages email reminder notifications to help user keep in touch with loved ones.

# Federal & State Benefits Chatbot
![Image](/Image.png)

# Demo
[https://drive.google.com/file/d/1QNyNy5Gv36adVFl43B6VRF6AaTAyzRia/view?usp=sharing](https://drive.google.com/file/d/1d-yX5pxdd2J9w7l99BnciMejrOsnSyOB/view?usp=drive_link)

# How to Run Locally

1.
```
git clone https://github.com/elainejiangg/healthier-demo.git

```
2. Fill in .env in interface/server (i.e., OpenAI key and MongoDB connection string)


3.
```
cd interface/client && npm install && npm start
cd interface/server && npm install && npm start
```

# Files:
- interface
    - client: Frontend
    - server: Backend
- parser
    - parse.py: Convert unstructured data from database.txt to structured databaseSummary.json using OpenAI ChatCompletions
    - insertDB.py: Insert databaseSummary.json into MongoDB database
    - database.txt: Raw training data 
    - databaseSummary.json: Structured and summarized training data
  

# Basic Workflow
1. Process unstructured data into structured jsons using OpenAI's ChatCompletions and Structure Outputs 
    - Reasoning: Easier understanding of information for Assistants API when fed into assistant's instructions/contextual window
2. Upload structured jsons to MongoDB database
    - Reasoning: MongoDB for its document-based structure and flexible schema/unstructureness for future scalability/changes
3. Feed user prompt as a message in thread and structured data as assistant instructions into OpenAI Assistants API
    - Reasoning: I have the most experience with OpenAI APIs and particularly with the Assistants API. It takes care of most of the RAG system and does a decent job at it (accuracy and speed wise).
4. Build interface using React, NodeJS, and TailwindCSS
    - Reasoning: I have the most experience with React, NodeJS, and TailwindCSS for web development

# Improvements
- Faster, more accurate, cost-efficient querying.
    - Possibly use vector store search/embeddings to handle more specific data and perform cosine similarity searches to retrieve relevant data (i.e., LangChain)
    - Have two assistants. The first preprocesses the user prompts to generate NoSQL queries if additional specific data is needed. It retrieves the information from the MongoDB database and passes it to the second main assistant which uses this information to respond to the user. The second main assistant will always have a brief summary of all benefits programs in its contextual window for answering broad questions. (I did this with my project at the Media Lab with a good degree of success but did not have enough time to implement this with this project)
    - Use keyword and embeddings of those for alignments between benefit programs and user prompts
- Better way of storing charts in MongoDB
- Persevere specificity of data. Due to time constraints and time/cost issues with keeping such a large context window with the OpenAI Assistants API, when converting from unstructured to structured data, I specified for Chat Completions to summarize the data where it sees fit.
- More concise, targeted, conversational responses. The Assistants API has a habit of outputting conversation in noncasual tones, often info-dumping whatever was provided in its context window. This can be fixed with finetuning the prompting of the assistant's instructions.

# Future Integrations
- Languages (e.g., Spanish, Mandarin, etc.) using Google Cloud Translate API
- Accessibility (e.g., speech-to-text, text-to-speech; screen-reader accessible)
- Mobile app or SMS-based chatbot
- Deploy app (I ran into issues with deployment. Hence, the vercel link does not actually work, unfortunately)
- Build adminstrator interface such that the team at Healthier Democracy, hospitals, and other organizations can simply upload benefit documents to the app, updating the chatbot's knowledge base.

# Similar Past Projects
- Amika chatbot webapp at MIT Media Lab Fluid Interfaces: https://drive.google.com/file/d/1qPKe5Ok0HKYoR-RVM7ctCEQR-lKeflHB/view?usp=sharing Used OpenAI Assistants API to dynamically build profiles of user and their relationships through consistent conversation, extracting and converting information from conversations into structured data stored in MongoDB. Also, manages email reminder notifications to help user keep in touch with loved ones.

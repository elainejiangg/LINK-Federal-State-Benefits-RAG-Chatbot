# healthier-demo
![Image](/Image.png)


# Basic Workflow & Reasoning
- Process unstructured data into structured jsons using OpenAI's ChatCompletions and Structure Outputs
    - Easier processing of information for Assistants API when fed into assistant instructins/contextual window
- Upload structured jsons to MongoDB database
    - MongoDB for its document-based structure and flexible schema/unstructure
- Feed user prompt and structured data into OpenAI Assistants API t
- Build interface using React, Express, and TailwindCSS
  
  
# Improvements
- Faster, more accurate, cost-efficient querying.
    - Possible using vector store search/embeddings to handle more specific data and perform cosine similarity searches to retrieve relevan data (i.e., LangChain)
    - Have two assistants. The first preprocesses the user prompts to generate NoSQL queries if additional specific data is needed. It retrieves the information and passes it to the second main assistant which uses this information to respond to the user. The second main assistant will always have a brief summary of all benefits programs in its contextual window for answering broad questions. (I did this with my project at the Media Lab with a good degree of success but did not have enough time to implement this with this project)
    - Discrete keyword alignment between programs and user prompts
  - Better way of storing Charts


# Future Integrations
- Languages
- Accessibility (e.g., speech-to-text, text-to-speech)
- 

# Similar Past Projects
- Amika at MIT Media Lab Fluid Interfaces: https://drive.google.com/file/d/1qPKe5Ok0HKYoR-RVM7ctCEQR-lKeflHB/view?usp=sharing Used OpenAI Assistant API to dynamically build profile of user and their relationships in MongoDB while managing reminder notifications via email.

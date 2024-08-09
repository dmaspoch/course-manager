const OpenAI = require("openai");
const openai = new OpenAI();
const fs = require('fs');

module.exports = 
{
    summarize: async function summarize(assistant_id) {
        const thread = await openai.beta.threads.create();
        const message = await openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: "Please summarize the file provided in the vector store"
            }
        );
        let run = await openai.beta.threads.runs.createAndPoll(
            thread.id,
            {
                assistant_id: assistant_id,
            }
        );
        if (run.status === 'completed') {
            const messages = await openai.beta.threads.messages.list(
                run.thread_id
            );
            const result = messages.data.filter((message) => message.role === "assistant");
            return result[0].content[0].text.value;
        } else {
            throw new Error("Error with status: " + run.status);
        }
    },
    
    createAssistant: async function createAssistant() {
        // Step 1: Create a new Assistant with File Search Enabled
        const assistant = await openai.beta.assistants.create({
            name: "Lecture Summarizer Assistant",
            instructions: `You are an expert content summarizer. You use your knowledge base to output a summary using the format below. 
          Take a deep breath and think step by step about how to best accomplish this goal using the following steps.
          Combine all of your understanding of the content into a single, 20-word sentence in a section called ONE SENTENCE SUMMARY:.
      Output the 3 most important points of the content as a list with no more than 12 words per point into a section called MAIN POINTS:.
      Output a list of the 3 best takeaways from the content in 12 words or less each in a section called TAKEAWAYS:.`,
            model: "gpt-4o",
            tools: [{ type: "file_search" }],
        });
        console.log("Assistant created:", assistant);
        return assistant;
    },
    
    createVectorStore: async function createVectorStore() {
        let vectorStore = await openai.beta.vectorStores.create({
            name: "Lectures",
        });
        console.log("Vector Store created:", vectorStore);
    
        return vectorStore;
    },
    
    uploadFileToVectorStore: async function uploadFileToVectorStore(assistantId, vectorStoreId, filePath) {
        try {
            // Upload the file
            const file = await openai.files.create({
                file: fs.createReadStream(filePath),
                purpose: "assistants",
            });
    
            // Attach the file to the vector store
            const vectorStoreFile = await openai.beta.vectorStores.files.create(
                vectorStoreId,
                {
                    file_id: file.id,
                },
            );
    
            // Associate vector store with assistant
            const assistant = await openai.beta.assistants.update(assistantId, {
                tool_resources: {
                    file_search: {
                        vector_store_ids: [vectorStoreId],
                    },
                },
            });

            return file.id;

        } catch (error) {
            console.error("Error:", error);
        }
    },
    
    deleteFileFromVectorStore: async function deleteFileFromVectorStore(vectorStoreId, fileId) {
        const deletedVectorStoreFile = await openai.beta.vectorStores.files.del(
            vectorStoreId, fileId
        );
        console.log(deletedVectorStoreFile);
        const file = await openai.files.del(fileId);
        console.log(file);
    }
    
}
// async function main() {

//     // const assistant = await createAssistant();
//     // const vectorStore = await createVectorStore();
//     const filePath = 'lectures/Week02-Fall_2024.pdf';
//     const assistantId = 'asst_CUrTjgEIFNuBHbQBiB3s7Jbx';
//     const vectorStoreId = 'vs_aYbmBxcgXEi12rXYCqavM8Pl';
//     await uploadFileToVectorStore(assistantId, vectorStoreId, filePath);
//     const fileId = 'file-OSspzBT3tB25CrAdnwdJ6VEd';
//     await summarize(assistantId);
//     // await deleteFileFromVectorStore(vectorStoreId, fileId);
// }

// main();

import app from "./app.ts";
import connectDB from "./config/database.config.ts";
import { initializeKnowledgeBase } from "./services/rag.service.ts";

const PORT = process.env.PORT || 5000;

const start = async (): Promise<void> => {
  try {
    // 1. Connect Mongoose (for users collection)
    await connectDB();

    // Warm the knowledge base in the background so auth routes are available quickly.
    const warmKnowledgeBase = initializeKnowledgeBase().catch((error) => {
      console.warn("Knowledge base initialization skipped:", error);
    });
    void warmKnowledgeBase;

    // Start Express
    app.listen(PORT, () => {
      console.log(` EduReach Server is running!`);
      console.log(` URL: http://localhost:${PORT}`);
      console.log(` Node: ${process.version}`);
      console.log(` Press Ctrl+C to stop`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();

import Article from "../models/alrticle.js";

export async function getAllArticles(_, res) {
  try {
    const articles = await Article.find().sort({ createdAt: -1 }); // -1 will sort in desc. order (newest first)
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error in getAllArticles controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getArticleById(req, res) {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found!" });
    res.json(article);
  } catch (error) {
    console.error("Error in getArticleById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createArticle(req, res) {
  try {
    const { title, content } = req.body;
    const article = new Article({ title, content });

    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error("Error in createArticle controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateArticle(req, res) {
  try {
    const { title, content } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );

    if (!updatedArticle) return res.status(404).json({ message: "Article not found" });

    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error("Error in updateArticle controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteArticle(req, res) {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) return res.status(404).json({ message: "Article not found" });
    res.status(200).json({ message: "Article deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteArticle controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
import React from "react";
import { Button } from "zmp-ui";

interface NewsArticle {
    id: number | string;
    title: string;
    excerpt: string;
    image?: string;
    date: string;
    tag: string;
    category?: string;
}

interface NewsSectionProps {
    title?: string;
    articles: NewsArticle[];
    onViewAllNews?: () => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ 
    title = "Tin tức & Hoạt động",
    articles,
    onViewAllNews
}) => {
    if (!articles || articles.length === 0) return null;

    return (
        <div className="school-info-card">
            <div className="info-header">
                <div className="info-icon">📰</div>
                <h3 className="section-title">{title}</h3>
            </div>

            <div className="news-grid">
                {articles.map((article) => (
                    <div key={article.id} className="article-card">
                        {article.image && (
                            <div className="article-image">
                                {article.image}
                            </div>
                        )}

                        <h4 className="article-title">{article.title}</h4>
                        <p className="article-excerpt">{article.excerpt}</p>

                        <div className="article-meta">
                            <div className="flex items-center gap-2">
                                <span className="article-tag">{article.tag}</span>
                                <span className="article-date">{article.date}</span>
                            </div>
                            <span className="read-more">Đọc thêm →</span>
                        </div>
                    </div>
                ))}
            </div>

            {onViewAllNews && (
                <div className="text-center mt-4">
                    <Button
                        variant="secondary"
                        size="medium"
                        className="px-6 py-2 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg"
                        onClick={onViewAllNews}
                    >
                        📖 Xem tất cả tin tức
                    </Button>
                </div>
            )}
        </div>
    );
};

export default NewsSection;
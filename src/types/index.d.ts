export type CommentFormProps = {
    articleId: string
}

export type SearchPageProps = {
    searchParams: Promise<{ search?: string; page?: string }>;
}

export type LikeButtonProps = {
    articleId: string,
    likes: Like[],
    isLiked: boolean
}
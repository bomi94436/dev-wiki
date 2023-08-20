import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import { Article } from '@/article/api/entity'
import { useNavigate } from 'react-router-dom'

interface ArticleProps {
  article: Article
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  const navigate = useNavigate()

  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => navigate(`/article/${article.id}`)}>
        <div className="w-full h-[300px]">
          {article.thumbnail ? (
            <>
              <CardMedia
                component="img"
                className="w-full h-1/2 object-cover"
                src={article.thumbnail}
                alt="green iguana"
              />

              <CardContent className="h-1/2 w-full">
                <Typography gutterBottom variant="h5" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.short_description}
                </Typography>
                {article.series?.name && (
                  <Chip label={`시리즈: ${article.series.name}`} size="small" />
                )}
              </CardContent>
            </>
          ) : (
            <CardContent className="h-full w-full">
              <Typography gutterBottom variant="h5" component="div">
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.short_description}
              </Typography>
            </CardContent>
          )}
        </div>
      </CardActionArea>
    </Card>
  )
}

export default Article

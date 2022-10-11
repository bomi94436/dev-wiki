import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { Article } from '@/global/entity'

interface ArticleProps {
  thumbnailUrl?: string
  article: Article
}

const Article: React.FC<ArticleProps> = ({ thumbnailUrl, article }) => (
  <Card variant="outlined">
    <CardActionArea>
      <div className="w-full h-[300px]">
        {thumbnailUrl ? (
          <>
            <CardMedia
              component="img"
              className="w-full h-1/2 object-cover"
              src={thumbnailUrl}
              alt="green iguana"
            />

            <CardContent className="h-1/2 w-full">
              <Typography gutterBottom variant="h5" component="div">
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.content}
              </Typography>
            </CardContent>
          </>
        ) : (
          <CardContent className="h-full w-full">
            <Typography gutterBottom variant="h5" component="div">
              {article.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {article.content}
            </Typography>
          </CardContent>
        )}
      </div>
    </CardActionArea>
  </Card>
)

export default Article

import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'

interface ArticleProps {
  thumbnailUrl?: string
}

const Article: React.FC<ArticleProps> = ({ thumbnailUrl }) => (
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
                title
              </Typography>
              <Typography variant="body2" color="text.secondary">
                contents
              </Typography>
            </CardContent>
          </>
        ) : (
          <CardContent className="h-full w-full">
            <Typography gutterBottom variant="h5" component="div">
              title
            </Typography>
            <Typography variant="body2" color="text.secondary">
              contents
            </Typography>
          </CardContent>
        )}
      </div>
    </CardActionArea>
  </Card>
)

export default Article

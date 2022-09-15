import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function MarkdownListItem(props) {
  return <Box component="li" sx={{ mt: 1, typography: 'body1'}} {...props} />;
}

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h2',
      },
    },
    h2: {
      component: Typography,
      props: { 
        gutterBottom: true,
        variant: 'h3'
      },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h4'},
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h5',
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    a: {
      component: Link,
      props: {
        rel: "noopener noreferrer",
        target:"_blank"
      }
    },
    li: {
      component: MarkdownListItem,
    },
  },
};

const Markdown = (props) => {
  return <Box sx={{paddingBottom: "2vh"}}>
      <ReactMarkdown options={options} {...props} />
    </Box>
}

export default Markdown
import react from 'react'
import Paper from '@mui/material/Paper'

const ThemedPaper = react.forwardRef((props, ref) => {
  const {children, restProps} = props
  return <Paper ref={ref} sx={{paddingX: "5vw", paddingTop: "5vh", marginTop:"1vh"}} {...restProps}>
    {children}
  </Paper>
})
export default ThemedPaper
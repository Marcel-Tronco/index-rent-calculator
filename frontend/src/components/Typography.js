import Typography from '@mui/material/Typography'


const CustomTypography = (props) => {
  const {children, ...otherProps} = props
  return <Typography sx={{hyphen:"auto", MozHyphens:"auto"}} {...otherProps}>
        {children}
    </Typography>
}

export default CustomTypography
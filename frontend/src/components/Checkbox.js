import React from "react";
import Box from "@mui/material/Box"
import { Typography } from "@mui/material";
import MuiCheckbox from "@mui/material/Checkbox"


const Checkbox = ({ el, checked, onChange, inputProps}) => {
  if (! el) {
    return <></>
  }
  return <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
    <Typography sx={{alignSelf: "center"}} variant="body1" gutterBottom component="div" >
      {el.description}
    </Typography>
    <MuiCheckbox sx={{alignSelf:"center"}} checked={checked} onChange={onChange} inputProps={inputProps}/>
  </Box>
}

export default Checkbox
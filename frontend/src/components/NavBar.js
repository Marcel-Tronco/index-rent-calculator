import react from "react"
import { AppBar, Button, Toolbar, IconButton, Menu, MenuItem, Typography, Box} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const NavBar = react.forwardRef((props, ref) => {
  const  {refList, size, ...rest } = props
  const [anchorEl, setAnchorEl] = react.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuBottonClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  }


  return(
      <AppBar sx={{maxWidth: "100vw"}} {...rest} ref={ref} position="sticky">
        <Box sx={{display: "flex", flexDirection:"column", alignItems: "center" }}>
          <Typography sx={{marginBottom: 0, paddingBottom:0, color: "white", textDecoration: "none" }} variant="h3" gutterBottom component="div" >
              Halles neuer Mietspiegel
          </Typography>

          { size > 700 
              ? <Toolbar sx={{alignSelf: "flex-center"}}>
                  { 
                    refList.map(
                      (el) => {
                        return <Button sx={{fontSize: "x-large", fontFamily:"Teko"}} key={el[0]} color="inherit" onClick={el[1]}>
                        {el[0]}
                      </Button>
                      }
                    )
                  }
                </Toolbar>
              : <Toolbar sx={{alignSelf: "flex-start"}}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuBottonClick}
                    
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                  >
                    {
                      refList.map((el) => <MenuItem key={el[0]} onClick={() => {
                        el[1]()
                        handleClose()
                      }}>{el[0]}</MenuItem>)
                    }
                  </Menu>
              </Toolbar>
            }
        </Box>
      </AppBar> 
  )
})

export default NavBar

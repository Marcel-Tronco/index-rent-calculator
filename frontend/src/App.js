import React from 'react';

import introtextPath from './markdown_texts/intro.md'
import othertextPath from './markdown_texts/other.md'
import imprinttextPath from './markdown_texts/impressum.md'
import contactTextPath from './markdown_texts/contact.md'
import dataProtectiontextPath from './markdown_texts/datenschutz.md'

// MUI Components
import { Box, Button, Link} from '@mui/material'
import Paper from './components/ThemedPaper'

// Customized Components
import Typography from './components/Typography'

// Custom Styling

// Customized Components
import NavBar from './components/NavBar'
import MsForm from './components/MietspiegelForm'
import ReactMarkdown from './components/Markdown'

import useWindowSize from './hooks/useWindowsize'
import createReferer from './utils/createReferer'

const App = () => {
  const [imprintView, setImprint] = React.useState(false)
  const [contactView, setContact] = React.useState(false)

  const [introText, setIntroText] = React.useState("")
  const [otherText, setOtherText] = React.useState("")
  const [dataProtText, setDataProtText] = React.useState("")
  const [imprintText, setImprintText] = React.useState("")
  const [contactText, setContactText] = React.useState("")

  const [introObj, setIntroObj] = React.useState(["Zum Mietspiegel", null])
  const [otherObj, setOtherObj] = React.useState(["Hilfe", null])
  const [dataProtObj, setDataProtObj] = React.useState(["Datenschutz", null])
  const [formObj, setFormObj] = React.useState(["Rechner", null])

  const intro_ref = React.useRef(null)
  const other_ref = React.useRef(null)
  const dataProt_ref = React.useRef(null)
  const navbar_ref = React.useRef(null)
  const form_ref = React.useRef(null)
 
  const windowSize = useWindowSize()

  /**
   * This effect fetches the markdown texts
   */
  React.useEffect(
    () => {
      fetch(introtextPath).then((response) => response.text()).then((text) => {
        setIntroText(text)
      })
      fetch(othertextPath).then((response) => response.text()).then((text) => {
        setOtherText(text)
      })
      fetch(imprinttextPath).then((response) => response.text()).then((text) => {
        setImprintText(text)
      })
      fetch(dataProtectiontextPath).then((response) => response.text()).then((text) => {
        setDataProtText(text)
      })
      fetch(contactTextPath).then((response) => response.text()).then((text) => {
        setContactText(text)
      })
    }
    ,[])

  /**
   * This effect creates/sets the objects used for the ref based navigation
   */
  React.useEffect(() => {
    if (intro_ref.current) {
      setIntroObj(createReferer(introObj[0], intro_ref, navbar_ref.current))
    }
    if (other_ref.current) {
      setOtherObj(createReferer(otherObj[0], other_ref, navbar_ref.current))
    }
    if (dataProt_ref.current) {
      setDataProtObj(createReferer(dataProtObj[0], dataProt_ref, navbar_ref.current))
    }
    if (form_ref.current) {
      setFormObj(createReferer(formObj[0], form_ref, navbar_ref.current))
    }
  }, [intro_ref.current, other_ref.current, dataProt_ref, navbar_ref.current, form_ref.current ])

  return <Box sx={{display:'flex', justifyContent: 'center', backgroundColor: "#E8E8E8"}}>
      <Box sx={{display: 'flex', maxWidth: 900, flexDirection: 'column'}}>
        { 
          ! ( imprintView || contactView )
          ? <>
            <NavBar size={windowSize} ref={navbar_ref} refList={[introObj, formObj,  otherObj, ['Pressekontakt', () => setContact(true)], dataProtObj]}/>
            <Paper ref={intro_ref}>
              
              <ReactMarkdown children={introText}/>
            </Paper>
            <Paper ref={form_ref}>
              <MsForm/>
            </Paper>
            <Paper ref={other_ref}>
              <ReactMarkdown children={otherText}/>
            </Paper>
            <Paper ref={dataProt_ref}>
              <ReactMarkdown children={dataProtText}/>
            </Paper>
            <Box sx={{display:"flex", flexDirection: "row", justifyContent: "space-evenly", padding: "2vh"}}>
            <Typography variant="h4" gutterBottom component="div" >
              Gefördert durch:
            </Typography>
            <img src={sturaLogoPath} height="50" alt="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. "/>
          </Box>
            <Link onClick={() => {setImprint(true)}} >Impressum</Link>
          </>
          : <>
            <Button onClick={() => { setImprint(false); setContact(false)}}>Zurück</Button>
            <div>
            </div>
            <ReactMarkdown children={imprintView ? imprintText : contactText}/>
          </>
        }

      </Box>
    </Box>
}

export default App;
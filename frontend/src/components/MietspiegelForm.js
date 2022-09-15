import React from "react"
import TextField from "@mui/material/TextField"
import Typography from './Typography'
import {useField, fieldToProps} from "../hooks/tfHook"
import { MenuItem, Box, Button, Link, Stack } from "@mui/material"
import calculator from "../utils/calculator";
import unorderedStadtteilList from "../data/viertel"
import qualitiesList from "../data/punkte"
import Checkbox from "./Checkbox"
import { useCheckBoxes } from "../hooks/checkBoxes"
import { ADD_ENTRY_API_URL } from "../utils/config"
import { getQualities, getNotes } from "../utils"
import notes_dict from "../data/mietberechnungsanmerkungen.json"


const stadtteilList = unorderedStadtteilList.sort((el1,el2) =>  {
    let a = el1.label.toLowerCase() 
    let b = el2.label.toLowerCase()
    if ( a < b ) {
      return -1
    }
    else if ( a === b ) {
      return 0
    }
    else {
      return 1
    }
}).map((el, index) => {
  return {
    ...el,
    id: index
  }
})

const MsForm = () => {
  /**
   * Form states
   */
  const [result, setResult] = React.useState()
  const [error, setError] = React.useState(null)
  const [formSent, setSent] = React.useState(false)
  const aktuelleMiete = useField("aktuelle_miete", "Aktuelle Netto-Kalt-Miete", "number")
  const wohnungsGroesse = useField("wohnungsgroeße", "Wohnungsgröße in m²", "number", true)
  const stadtteil = useField("Stadtteil", "Stadtteil", null, true, true)
  const baujahr = useField("Baujahr", "Baujahr des Hauses", null, true, true)
  const [checkBoxes, setCheckBoxes, resetCheckboxes] = useCheckBoxes()
  const [userDissent, setDissent] = React.useState(false)
  /**
   * Form specific utils
   */
  const clearFormData = () => {
    setError(null)
    setDissent(false)
    aktuelleMiete.reset()
    wohnungsGroesse.reset()
    stadtteil.reset()
    baujahr.reset()
    resetCheckboxes()
    setResult(false)
  }


  const errorMessageDict = {
    aktuelleMiete: "Feld muss eine Zahl sein.",
    wohnungsGroesse: "Feld ist notwendig und muss eine Zahl sein.",
    stadtteil: "Feld ist notwendig.",
    baujahr: "Feld ist notwendig."
  }

  const dataValid = () => {
    const conditionsList = {
      aktuelleMiete: () => {
          if (
            isNaN(parseFloat(aktuelleMiete.value))
            && aktuelleMiete.value !== ""
          ) {
            return {"Aktuelle Miete": errorMessageDict.aktuelleMiete }
          }
          else {
            return {}
          }
      },
      stadtteil: () => {
        if (
          stadtteil.value === ""
        ) {
          return {"Stadtteil": errorMessageDict.stadtteil}
        }
        else {
          return {}
        }
      },
      wohnungsGroesse: () => {
        if (
          isNaN(parseFloat(wohnungsGroesse.value))
          && ! wohnungsGroesse !== ""
        ) {
          return {"Wohnungsgröße": errorMessageDict.wohnungsGroesse}
        }
        else {
          return {}
        }
      },
      baujahr: () => {
        if (
          baujahr.value === ""
        ) {
          return {"Baujahr": errorMessageDict.baujahr}
        }
        else {
          return {}
        }
      }
    }
    let errorMessages = {}
    
    for (let condition of Object.values(conditionsList)) {
      errorMessages = {...errorMessages, ...condition()}
    }
    return Object.keys(errorMessages).length ? errorMessages : null
  }

  const sendingData = async (neu) => {
    const data = 
    neu === null
    ? { neu: 0, alt: 0, mvalt: 0, wgroesse: 0, baujahr: 0, viertel: 0}
    : {
        neu,
        alt: parseInt(aktuelleMiete.value) || 0,
        viertel: stadtteil.value.id,
        mvalt: checkBoxes[41].checked ? 1 : 0,
        wgroesse: parseInt(wohnungsGroesse.value),
        baujahr: baujahr.value
        
      }

    fetch(ADD_ENTRY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }
  const formClicker = async () => {
    const errorObj = dataValid()
    if ( errorObj ) {
      setError(errorObj)
      return
    }
    const qualitiesList = getQualities(checkBoxes, baujahr)
    const res1 = parseInt(calculator(getQualities(checkBoxes, baujahr), parseInt(wohnungsGroesse.value), stadtteil.value.wlz))
    const notes = getNotes(qualitiesList, stadtteil.value.wlz)
    setResult({
      value: res1,
      notes
    })
    await sendingData(
      userDissent
      ? null
      : res1
      )

    setSent(true)
  }

  const formResetHandler = () => { 
    setSent(false)
    clearFormData() 
  }

  return <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <Stack spacing={0} sx={{marginBottom:"1vh"}}>
        <Typography variant="h2" gutterBottom component="div" >
          Mietspiegel-Rechner
        </Typography>
        <Typography variant="body1" gutterBottom component="div" >
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
        </Typography>
        <Typography variant="h5" gutterBottom component="div">
          {notes_dict["pretext"].title}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          {notes_dict["pretext"].text}
        </Typography>
        {
          error 
            ? Object.entries(error).map((tuple) => {
              return <Typography color="red" key={tuple[0]} variant="body1" gutterBottom component="div" >
                {tuple[0]}: {tuple[1]}
              </Typography>
            }) 
            : <></>
        }      
        <TextField {...fieldToProps(aktuelleMiete)}/>
        <Typography variant="h6" gutterBottom component="div">
          Hinweis:
        </Typography>
        <Typography variant="body1" gutterBottom component="div" >
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
        <TextField {...fieldToProps(wohnungsGroesse)}/>
        <TextField select {...fieldToProps(stadtteil)}>
          {stadtteilList.map((el) => <MenuItem value={el} key={el.label}>{el.label}</MenuItem>)}
        </TextField>
        <TextField select {...fieldToProps(baujahr)}>
          {Object.values(qualitiesList).map((el, index) => {
            return el.type === "Baujahr"
              ? <MenuItem value={index} key={el.description}>{el.description} </MenuItem>
              : null
          })}
        </TextField>
        {
          Object.values(qualitiesList).map((el, index) => {
            return el.type === "Allgemeines"
              ? <Checkbox inputProps={{ 'aria-label': el.description }} key={el.description} el={el} index={index} checked={checkBoxes[index].checked} onChange={(event) => checkBoxes[index].onChange(event,checkBoxes)} />
              : null
          })
        }
        <Typography variant="h4" gutterBottom component="div" >
          Modernisierung
        </Typography>
          {Object.values(qualitiesList).map((el, index) => {

            return el.type === "ElSanMod"
              ? <Checkbox inputProps={{ 'aria-label': el.description }} key={el.description} el={el} index={index} checked={checkBoxes[index].checked} onChange={(event) => checkBoxes[index].onChange(event,checkBoxes)} />
              : null
          })}
          <Checkbox inputProps={{ 'aria-label': qualitiesList[8].description }} key={qualitiesList[8].description} el={qualitiesList[8]} index={8} checked={checkBoxes[8].checked} onChange={(event) => checkBoxes[8].onChange(event,checkBoxes)} />

        <Typography variant="h4" gutterBottom component="div" >
          Sanitärausstattung
        </Typography>
        {
          Object.values(qualitiesList).map((el,index) => {
            return el.type === "Sanitärausstattung"
              ? <Checkbox inputProps={{ 'aria-label': el.description }} key={el.description} el={el} index={index} checked={checkBoxes[index].checked} onChange={(event) => checkBoxes[index].onChange(event,checkBoxes)} />
              : null
          })
        }
        <Typography variant="h4" gutterBottom component="div" >
          Sonstige Ausstattung
        </Typography>
        {
          Object.values(qualitiesList).map((el, index) => {
            return el.type === "Ausstattung" && el.displayType == "checkBox"
            ? <Checkbox inputProps={{ 'aria-label': el.description }} key={el.description} el={el} index={index} checked={checkBoxes[index].checked} onChange={(event) => checkBoxes[index].onChange(event,checkBoxes)} />
            : null
          })
        }
      {/*Dissent Button*/}
      <Typography variant={"h4"}  gutterBottom component="div" >
        Datennutzung
      </Typography>
      <Checkbox 
        inputProps={{'aria-label': qualitiesList["42"].description}}
        key={qualitiesList["42"].description}
        el={qualitiesList["42"]}
        checked={userDissent} 
        onChange={(event) => setDissent(event.target.checked)}
      />
      
      {
      /*    Form Submission and Reset Buttons   */
        ! formSent
        ? <Button sx={{fontSize: "x-large"}} variant="contained" onClick={formClicker}>Berechnen</Button>
        : <>
          <Button sx={{fontSize: "x-large"}} variant="contained"  disabled onClick={formClicker}>Berechnen</Button>
          <Button sx={{fontSize: "x-large"}} variant="contained" onClick={formResetHandler}>
              Zurücksetzen
          </Button>
        </>
      }

      {/* The results, if present */}
      {
        result
          ? <>
            <Typography variant={"h4"}  gutterBottom component="div" >
              Errechneter Mietspiegel: {result.value} € <br/>
            </Typography>
            {
              aktuelleMiete.value !== ""
                ? <Typography variant={'h6'} gutterBottom component="div">
                    Damit zahlen Sie <strong>{Math.abs(result.value - aktuelleMiete.value)} EUR {result.value > aktuelleMiete.value ? "weniger" : "mehr"} </strong> als der Mietpreis gemäß Mietspiegel.
                </Typography>
                : <></>
            }
            {
              result.notes
                ? result.notes.map((note) => {
                  return <div key={note.title}>
                    <Typography variant={"h5"} gutterBottom component="div">
                      {note.title}
                    </Typography>
                    <Typography variant={"body1"} gutterBottom component="div">
                      {note.text}
                    </Typography>
                  </div>
                })
                : <></>
            }
          </>
          : <></>
      }
      </Stack>
  </Box>
}

export default MsForm
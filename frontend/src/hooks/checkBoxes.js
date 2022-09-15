import qualitiesList from "../data/punkte"
import React from "react"

export const useCheckBoxes = () => {
  const [checkBoxes, setCheckBoxes] = React.useState(Object.values(qualitiesList).reduce((prevVal, currVal, index) => {
    if ( currVal.displayType !== "checkBox") {
      return prevVal
    }
    prevVal[index] = {
      ...currVal,
      checked: false,
      onChange: (event, checkBoxes) => {
        let tmp = { ...checkBoxes}
  
        tmp[index] = {
          ...checkBoxes[index],
          checked: event.target.checked
        }
        setCheckBoxes(tmp)
      }
    }
    return prevVal
  }, {}))

  const resetCheckboxes = () => {
    ((qualitiesList) => {
    setCheckBoxes(Object.values(qualitiesList).reduce((prevVal, currVal, index) => {
      if ( currVal.displayType !== "checkBox") {
        return prevVal
      }
      prevVal[index] = {
        ...currVal,
        checked: false,
        onChange: (event, checkBoxes) => {
          let tmp = { ...checkBoxes}
          tmp[index] = {
            ...checkBoxes[index],
            checked: event.target.checked
          }
          setCheckBoxes(tmp)
        }
      }
      return prevVal
    }, {}))
    })(qualitiesList)
  }
  return [checkBoxes, setCheckBoxes, resetCheckboxes]
}

import notes_dict from "../data/mietberechnungsanmerkungen.json"

export const getQualities = (checkBoxes, baujahr) => {
  var qualities = []
  for (const [key, value] of Object.entries(checkBoxes)) {
    if (value.checked) {
      qualities = qualities.concat([parseInt(key)])
    }
  }
  qualities = qualities.concat([parseInt(baujahr.value)])
  return qualities
}
export const getNotes = (qualitiesList, wlz) => {
  let notes = [notes_dict.general, notes_dict.wlz]
  /* note if some lives in an unmarked area */
  if (wlz === 4 ) {
    notes = notes.concat([notes_dict["stadtteil"]])
  }
  /* other notes based on qualities */
  for (let quality of qualitiesList) {
    if (notes_dict[quality]) {
      notes.concat([notes_dict[quality]])
    }
  }
  return notes
}

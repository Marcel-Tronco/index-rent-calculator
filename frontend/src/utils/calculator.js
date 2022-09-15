import qualitiesToPoints from "../data/punkte"
import sqm_to_basis_nkm from "../data/basis_nkm.json"
import wlz_dict from "../data/wlzToPoints"

const calculator = (qualities_list, size, wlz) => {
  const basisNkmPerSqrm = size < 20
    ? sqm_to_basis_nkm[20]
    : size > 160
      ? sqm_to_basis_nkm[160]
      : sqm_to_basis_nkm[size]
  var points = 0
  var sanitär_subpoints = 0
  var sanitElektMod = 0
  const categories_done = {
    Baujahr: false,
    Sanitärausstattung: false,
    wlz: false
  }
  for (let i = 0 ; i < qualities_list.length; i++) {
    let num = qualities_list[i]
    // Baujahr
    if (num <= 5 && !categories_done.Baujahr) {
      categories_done.Baujahr = true
      points += qualitiesToPoints[num].value
    }
    // Sanitär Zu- und Abschlagsmerkmalspunkte
    else if ( num >= 19 && num <= 29) {
      sanitär_subpoints += qualitiesToPoints[num].value
    }
    else if ( num === 39 || num === 40) {
      sanitElektMod += qualitiesToPoints[num].value
    }
    else {
      points += qualitiesToPoints[num].value
    }
  }
  // Wohnlagezone
  points += wlz_dict[wlz]

  // calculating Sanitärpoints
  if ( sanitär_subpoints <= -2 ) {
    points += qualitiesToPoints[30].value
  }
  else if ( sanitär_subpoints === -1) {
    points += qualitiesToPoints[31].value
  }
  else if ( sanitär_subpoints === 0 || sanitär_subpoints === 1) {
    points += qualitiesToPoints[32].value
  }
  else if ( sanitär_subpoints === 2 || sanitär_subpoints === 3) {
    points += qualitiesToPoints[33].value
  }
  else if ( sanitär_subpoints >= 4) {
    points += qualitiesToPoints[34].value
  }
  // Sanierung seit 2010
  if (sanitElektMod === 1) {
    points += qualitiesToPoints[6].value
  }
  else if (sanitElektMod === 2) {
    points += qualitiesToPoints[7].value
  }

  const changePerSqrm = basisNkmPerSqrm * points / 100
  const vergleichsmiete = (basisNkmPerSqrm + changePerSqrm) * size

  return vergleichsmiete
}

export default calculator
const toCSV = (objectsArray) => {
  if (objectsArray.length === 0) {
    return ''
  }
  const csv_text = objectsArray.reduce(
    (agg, obj) => agg + Object.values(obj).join() + '\n',
    Object.keys(objectsArray[0]).join() + '\n'
  )
  return csv_text
}

module.exports = toCSV
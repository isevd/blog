export const formattedDate = (date) => {
  const createdDate = new Date(date)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return createdDate.toLocaleDateString('en-US', options)
}

const Ingame_weekNumber = () => {
	const currentdate = new Date()
	var oneJan = new Date(currentdate.getFullYear(), 0, 1)
	var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000))
	var ingame_weeknumber = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);

	return {currentdate, ingame_weeknumber}
}

export default Ingame_weekNumber
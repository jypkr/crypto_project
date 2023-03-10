import Dropdown from 'react-bootstrap/Dropdown'

const DropdownWeeknumForm = ({
	weekNum,
	getfunction,
	getfunction2
}) => {
	
	return (
		<Dropdown.Item onClick={() => {
			getfunction(weekNum)
			if (getfunction2 !== undefined) { getfunction2(weekNum) }
		}}>
			{weekNum}
			</Dropdown.Item>
	)
}

export default DropdownWeeknumForm

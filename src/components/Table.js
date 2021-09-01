import React from 'react'


const TableBody = (props) => {
    const removePerson = props.removePerson
    const rows = props.person.map((detail, index) => {
        return (
            <tr key={index}>
                <td>{detail.name.first + ' ' + detail.name.last}</td>
                <td>{detail.gender}</td>
                <td>{detail.location.street_number + ' ' + detail.location.street_name}</td>
                <td>{detail.location.city}</td>
                <td>{detail.location.state}</td>
                <td>{detail.location.country}</td>
                <td>
                    <img src={detail.picture.thumbnail}></img>
                </td>
                <td>
                    <button onClick={() => removePerson(detail.phone)}>Remove</button>
                </td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

function Table(props) {
    return (
        <div>
           <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Location Street No</th>
                    <th onClick={props.sortPeople}>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Image</th>
                </tr>
               
            </thead>
            <TableBody person={props.person} sortPeople={props.sortPeople} removePerson={props.removePerson} />
            
            </table> 
        </div>
    )
}

export default Table
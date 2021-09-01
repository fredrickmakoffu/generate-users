import './App.css';
import React, {useState, useEffect } from 'react';
import Table from './components/Table'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0);
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchFirstUser()
  }, [])

  const fetchFirstUser = () =>  {
    const getPerson = async () => {
      const person = await fetchPerson(page)
      const new_person = flattenLocations(person)

      console.log(new_person);
      setPerson(new_person)
    }

    getPerson()
  }

  const flattenLocations = (person) => {
    person[0].location.street_number = person[0].location.street.number
    person[0].location.street_name = person[0].location.street.name
    person[0].location.latitude = person[0].location.coordinates.latitude
    person[0].location.longitude = person[0].location.coordinates.longitude
    person[0].location.description = person[0].location.timezone.description
    person[0].location.offset = person[0].location.timezone.offset   
    
    delete person[0].location.street
    delete person[0].location.timezone
    delete person[0].location.coordinates

    return person
  } 

  const fetchPerson = (page) => {
    return axios.get('https://randomuser.me/api?page=' + page).then((res) => {
      return res.data.results
    })
  }

  const addPerson = () => {
    // increment page
    setPage(page+1)

    // Get new person
    const getPerson = async () => {
      const a_person = await fetchPerson(page)
      const new_person = flattenLocations(a_person)
      const people = [...person, ...new_person]

      setPerson(people)
      console.log(person);
    }

    getPerson()
  }

  const sortPeople = () => {
    // get all cities
    const cities = []
    const new_person = []
    
    // get all cities
    person.map((a_person) => {
      cities.push(a_person.location.city)
    })
    
    cities.sort()

    person.forEach(element => {
      const index = cities.indexOf(element.location.city)
      new_person[index] = element
    });

    setPerson(new_person)
  } 

  const removePerson = (phone) => {
    const new_person = person.filter((element) => {return element.phone !== phone})
    setPerson(new_person)
  }

  return (
    <div>
      <button onClick={sortPeople}></button>
        
      <Table person={person} sortPeople={sortPeople} removePerson={removePerson} />    

      <button onClick={addPerson}>Add</button>
    
    </div>
  );
}

export default App;

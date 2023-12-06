import { useState } from 'react';
import contactData from './contacts.json';

function App() {
  const [contacts, setContacts] = useState(contactData.slice(0, 5));

  const addRandomContact = () => {
    const contactsCopy = [...contacts];

    const filteredContacts = contactData.filter(
      element => !contactsCopy.includes(element)
    );

    const randomElement =
      filteredContacts[Math.floor(Math.random() * filteredContacts.length)];

    if (contactsCopy.length !== contactData.length) {
      contactsCopy.unshift(randomElement);
      setContacts(contactsCopy);
    } else {
      console.log('No more contacts to add!');
    }
  };

  const sortByPopularity = () => {
    const contactsCopy = [...contacts];
    const sortedContacts = contactsCopy.sort(
      (a, b) => b.popularity - a.popularity
    );
    setContacts(sortedContacts);
  };

  const sortByName = () => {
    const contactsCopy = [...contacts];
    const sortedContacts = contactsCopy.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContacts(sortedContacts);
  };

  const deleteContact = contactId => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );

    setContacts(updatedContacts);
  };

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>

      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>
                <img
                  className="contactPicture"
                  src={contact.pictureUrl}
                  alt="contact image"
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar === true && <>🏆</>}</td>
              <td>{contact.wonEmmy === true && <>🌟</>}</td>
              <td>
                <button onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

import { useState } from 'react'
import { Container, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { Modal } from 'react-bootstrap';

const initialForm = {
  name: '',
  email: '',
  city: 'HCM',
  gender: ''
}

function App() {
  const [forms, setForms] = useState(initialForm)
  const [errors, setErrors] = useState({}); // use to validate input field
  const [users, setUsers] = useState([]);

  function submit(e) {
    e.preventDefault();
    const { name, email, city, gender } = forms;

    if(name === '') {
      setErrors(prevState => {
        return {
          ...prevState,
          name: name === '' ? true : false
        }
      })      
      return
    }

    if(email === '') {
      setErrors(prevState => {
        return {
          ...prevState,
          email: email === '' ? true : false
        }
      })      
      return
    }

    if(gender === '') {
      setErrors(prevState => {
        return {
          ...prevState,
          gender: gender === '' ? true : false
        }
      })      
      return
    }

    if(city === '') {
      setErrors(prevState => {
        return {
          ...prevState,
          city: city === '' ? true : false
        }
      })      
      return
    }

    // add user to list
    const user = {
      id: Date.now(),
      name: name,
      email: email,
      city: city,
      gender: gender,
    }
    setUsers(prevState => {
      return [user, ...prevState]
    })

    // reset default
    setForms(initialForm);
    setErrors({});
  }

  function onChangeForm(e) {
    // const name = e.target.name;
    // const value = e.target.value;
    const { name, value } = e.target;
    console.log('onChangeForm', name, value);

    setForms(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
    setErrors(prevState => {
      return {
        ...prevState,
        [name]: value === '' ? true : false
      }
    });
  }

  const [updatingUser, setUpdatingUser] = useState(null);
  const [updatingIndex, setUpdatingIndex] = useState(null);

  function updateUser(user) {
    setUpdatingUser(user);
    setUpdatingIndex(index);
    setForms({
      name: user.name,
      email: user.email,
      city: user.city,
      gender: user.gender,
    });
  }

  function handleUpdate(e) {
    e.preventDefault();
  
    const { name, email, city, gender } = forms;
  
    if (name === '' || email === '' || gender === '' || city === '') {
      console.error('Please fill in all required fields');
      return;
    }
  
    // Sau khi cập nhật, đặt lại trạng thái
    setUpdatingUser(null);
    setForms(initialForm);
  }
  
  function deleteUser(id) {
    // Lọc danh sách người dùng để loại bỏ người dùng được xóa
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  }

  return (

    <Container fluid="md">
      <h2>Register Form</h2>
      
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={forms.name} placeholder="Enter Name" onChange={onChangeForm} />
          {errors.name && (
            <Form.Text className="text-error">
              Please enter name
            </Form.Text>
          )}
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email"  value={forms.email}  placeholder="Enter email" onChange={onChangeForm} />
          {errors.email && (
            <Form.Text className="text-error">
              Please enter email
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Select aria-label="Select City" name="city" onChange={onChangeForm}>
            <option value="HCM">TP HCM</option>
            <option value="HN">HN</option>
            <option value="HP">HaiPhong</option>
          </Form.Select>
          {errors.city && (
            <Form.Text className="text-error">
              Please choose city
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Gender</Form.Label>
          <Form.Check type="radio" name='gender' value="male" checked={forms.gender === 'male'} label="Male" onChange={onChangeForm} />
          <Form.Check type="radio" name='gender' value="female" checked={forms.gender === 'female'}  label="Female" onChange={onChangeForm} />
          {errors.gender && (
            <Form.Text className="text-error">
              Please choose gender
            </Form.Text>
          )}
        </Form.Group>

        <div style={{ textAlign: 'right' }}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>

      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>City</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" align='center'>No data</td>
            </tr>
          ) : (
            <>
              {users.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.city}</td>
                    <td>{user.gender}</td>
                    <td>
                    <Button variant="primary" onClick={() => updateUser(user)}>
                      Update
                    </Button>{' '}
                    <Button variant="danger" onClick={() => deleteUser(user.id)}>
                      Delete
                    </Button>
                    </td>
                  </tr>
                )
              })}
            </> 
          )}
         
        </tbody>
      </Table>

      {updatingUser !== null && (
        <Modal show={true} onHide={() => setUpdatingUser(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdate}>

            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>City</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" align='center'>No data</td>
                  </tr>
                ) : (
                  <>
                    {users.map((user, index) => {
                      return (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.city}</td>
                          <td>{user.gender}</td>
                          <td>
                          <Button variant="primary" type="submit">
                            Update User
                          </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </> 
                )}
              
              </tbody>
            </Table>

              
            
            </Form>
          </Modal.Body>
        </Modal>
      )}

    </Container>
  )
}

export default App

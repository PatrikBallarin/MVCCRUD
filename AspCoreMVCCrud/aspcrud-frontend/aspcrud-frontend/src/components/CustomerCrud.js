import axios from "axios";
import { useEffect, useState } from "react";

function CustomerCrud() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [emailAddress, setemailAddress] = useState("");
    const [Customers, setUsers] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {
        const result = await axios.get("https://localhost:7041/api/Customer/GetCustomer");
        setUsers(result.data);
        console.log(result.data);
    }

    async function save(event) {

        event.preventDefault();
        try {
            await axios.post("https://localhost:7041/api/Customer/AddCustomer", {

                name: name,
                emailAddress: emailAddress,

            });
            alert("Customer Registation Successfully");
            setId("");
            setName("");
            setemailAddress("");


            Load();
        } catch (err) {
            alert(err);
        }
    }
    async function editCustomer(Customers) {
        setName(Customers.name);
        setemailAddress(Customers.emailAddress);


        setId(Customers.id);
    }

    async function DeleteCustomer(id) {
        await axios.delete("https://localhost:7041/api/Customer/DeleteCustomer/" + id);
        alert("Employee deleted Successfully");
        setId("");
        setName("");
        setemailAddress("");
        Load();
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch("https://localhost:7041/api/Customer/UpdateCustomer/" + Customers.find((u) => u.id === id).id || id,
                {
                    id: id,
                    name: name,
                    emailAddress: emailAddress,
                }
            );
            alert("Registation Updated");
            setId("");
            setName("");
            setemailAddress("");

            Load();
        } catch (err) {
            alert(err);
        }
    }
    return (
        <div>
            <h1>Customer Details</h1>
            <div className="container mt-4">
                <form>
                    <div className="form-group">

                        <input
                            type="text"
                            className="form-control"
                            id="id"
                            hidden
                            value={id}
                            onChange={(event) => {
                                setId(event.target.value);
                            }}
                        />
                        <label>Customer Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>emailAddress</label>
                        <input
                            type="text"
                            className="form-control"
                            id="emailAddress"
                            value={emailAddress}
                            onChange={(event) => {
                                setemailAddress(event.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary mt-4" onClick={save}>
                            Register
                        </button>
                        <button className="btn btn-warning mt-4" onClick={update}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
            <br></br>
            <table className="table table-dark" align="center">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">emailAddress</th>


                        <th scope="col">Option</th>
                    </tr>
                </thead>
                {Customers.map(function fn(Customer) {
                    return (
                        <tbody>
                            <tr>
                                <th scope="row">{Customer.id} </th>
                                <td>{Customer.name}</td>
                                <td>{Customer.emailAddress}</td>

                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={() => editCustomer(Customer)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => DeleteCustomer(Customer.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>






        </div>
    );
}

export default CustomerCrud;

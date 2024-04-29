import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

function QRCodeForm() {
    const [entityId, setEntityId] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [entityType, setEntityType] = useState('');
    const [elements, setElements] = useState('');
    const [amount, setAmount] = useState('');
    const [submittedData, setSubmittedData] = useState(null);
    const [responseKeys, setResponseKeys] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const elementsArray = elements.split(',').map(item => item.trim());

        let data = {
            "entity_id": entityId,
            "transaction_id": transactionId,
            "entity_type": entityType,
            "elements": elementsArray,
            "amount": parseFloat(amount),
            "DateTime": new Date().toISOString()
        };

        setSubmittedData(data);

        try {
            const response = await axios.post('http://localhost:8082/api/Generate-QR-Code', data);
            console.log(response.data);

            // Set the response keys
            setResponseKeys(Object.keys(response.data));

            // Add the rating elements to the data object
            data = {
                ...data,
                "Rating_elements": Object.keys(response.data)
            };

            setSubmittedData(data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
    <>
        <form onSubmit={handleSubmit}>
            <label>
                Entity ID:
                <input type="text" value={entityId} onChange={e => setEntityId(e.target.value)} />
            </label><br/>
            <label><br/>
                Transaction ID:
            <br/>    <input type="text" value={transactionId} onChange={e => setTransactionId(e.target.value)} />
            </label><br/>
            <label><br/>
                Entity Type:
            <br/>    <input type="text" value={entityType} onChange={e => setEntityType(e.target.value)} />
            </label><br/>
            <label><br/>
                Elements (comma separated):
            <br/>    <input type="text" value={elements} onChange={e => setElements(e.target.value)} />
            </label><br/>
            <label><br/>
                Amount:
            <br/>    <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
            </label><br/>
            <input type="submit" value="Submit" />
        </form>
        {submittedData && (
            <div>
                <h2>Receipt</h2>
                <p>Entity ID: {submittedData.entity_id}</p>
                <p>Transaction ID: {submittedData.transaction_id}</p>
                <p>Entity Type: {submittedData.entity_type}</p>
                <p>Elements: {submittedData.elements.join(', ')}</p>
                <p>Amount: {submittedData.amount}</p>
            </div>
        )}
        {responseKeys.length > 0 && (
            <div>
                <h2>Elements to be rated are:</h2>
                <ul>
                    {responseKeys.map((key, index) => (
                        <li key={index}>{key}</li>
                    ))}
                </ul>
            </div>
        )}
        {submittedData && (
            <div>
                <h2>QR Code</h2>
                <QRCode value={`http://your-url.com?data=${encodeURIComponent(JSON.stringify(submittedData))}`} />
            </div>
        )}

    </>
    );
}

export default QRCodeForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const URL = "../leaderboard.json";

function App() {
	const [board, setBoard] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {

        const response =  axios.get(URL)
		.then((response) => {
			setBoard(response.data);
		})
		.catch(error => {console.log('Error: ', error.response.status)});
        
    }

    const renderHeader = () => {
        let headerElement = ['id', 'name', 'score', 'pic', 'rank'];

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    const renderBody = () => {
        return board.entries && board.entries.map(({ id, name, score, pic, rank }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{score}</td>
                    <td><img src={pic} width="200" height="200" /></td>
                    <td>{rank}</td>
                </tr>
            )
        })
    }

    return (
        <>
            <h1 id='title'>Heru Assessment</h1>
			
			<label htmlFor="events">
				<input id="events" name="event_name" type="text" />
			</label>
			<label htmlFor="range">
				<select name="view" id="range">
				  <option value="hundred">Top 100</option>
				  <option value="global">Global Leaderboard</option>
				</select>
			</label>
			
            <table id='leaderboard'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
				<tfoot>
					<tr>
						<td colSpan="5">
							<button className='button'>Refresh Leaderboard</button>
						</td>
					</tr>
				</tfoot>
            </table>
        </>
    )
}
export default App;

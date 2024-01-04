
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdDataObject, MdEdit } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import Papa from "papaparse";

import "../CSS/details.css";
import "../CSS/modal.css"
import "../CSS/edit-modal.css"

import TeamTable from "../components/team_table";

const TeamDetails = (props)=>{

    const allowedExtensions = ["csv"];
    const [roster,setRoster] = useState([]);
    const [data,setData] = useState([]);
    const [summary,setSummary] = useState({});
    const [edit,setEdit] = useState({edit: false,index: undefined});
    const [Delete,setDelete] = useState({delete: false,index: undefined});
    const [editData,setEditData] = useState({});
    // const [countries,setCountries] = useState();
    // const [positions,setPositions] = useState([]);

    function handleImportClick(event)
    {
        if(event.target.id == "btn-1" || event.target.id == "btn-2")
        {
            document.getElementById("modal-container").style.display = "grid";
        }

        if(event.target.id == "btn-3"){
            document.getElementById("modal-container").style.display = "none";
            document.getElementById('input-details').style.display = "none";
        }

        if(event.target.id == "import-complete")
        {
            props.RosterFun(data.slice(0,13));
            document.getElementById('message').style.display = 'none';
            document.getElementById("modal-container").style.display = "none";
            document.getElementById('input-details').style.display = "none";

            document.getElementById('btn-2').innerText = 'Re-Import Team';
            document.getElementById('btn-2').style.background = 'transparent';
            document.getElementById('btn-2').style.border = '1px solid grey';
        }
    }

    function handleFileInputChange(e)
    {
        const inputFile = e.target.files[0];
        const fileExt = inputFile.type.split('/')[1];
        if(allowedExtensions.includes(fileExt))
        {
            Papa.parse(inputFile,{
                header: true,
                complete: function(results){
                    // console.log(results.data);
                    setData(results.data);
                    props.Overview(results.data);

                    let summary = {
                        total: results.data.length,
                        Defender:0,
                        Midfielder:0,
                        Forward:0,
                        Goalkeeper:0
                    };

                    setSummary(summary);
                    // console.log(results.data[0])

                    document.getElementById('input-details').style.display = "block";

                },
            })
        }else{
            document.querySelector('.err-message').innerText = 'Roster file must be in .csv format';
        }
    }

    function handleEditChange(e)
    {
        let id = e.target.id;
        if(id == 'edit-player-name')
        {
            setEditData({...editData,'Player Name': e.target.value});
        }   

        if(id == 'edit-player-number')
            setEditData({...editData,'Jersey Number': e.target.value});

        if(id == 'edit-height')
            setEditData({...editData,Height: e.target.value})

        if(id == 'edit-weight')
            setEditData({...editData,Weight: e.target.value})

        if(id == 'edit-nation')
            setEditData({...editData,Nationality: e.target.value})

        if(id == 'edit-position')
            setEditData({...editData,Position: e.target.value})
    }

    function handleEditSubmit(e)
    {
        let newEdit = props.Roster;
        console.log(editData)
        let feed = {
            ...editData,
            'Flag Image': props.Roster[edit.index]['Flag Image'],
            'Appearances': props.Roster[edit.index]['Appearances'],
            'Minutes Played': props.Roster[edit.index]['Minutes Played'],
        }
        if(!feed['Player Name'])
            feed['Player Name'] = props.Roster[edit.index]['Player Name'];
        if(!feed['Jersey Number'])
            feed['Jersey Number'] = props.Roster[edit.index]['Jersey Number'];
        if(!feed['Height'])
            feed['Height'] = props.Roster[edit.index]['Height']
        if(!feed['Weight'])
            feed['Weight'] = props.Roster[edit.index]['Weight']
        if(!feed['Nationality'])
            feed['Nationality'] = props.Roster[edit.index]['Nationality'];
        if(!feed['Position'])
            feed['Position'] = props.Roster[edit.index]['Position'];
        if(!feed['Starter'])
            feed['Starter'] = props.Roster[edit.index]['Starter'];
        
        // console.log("Feed is ",feed);
        newEdit[edit.index] = feed;

        let newData = data;
        newData[edit.index] = feed;
        console.log(data == newData)
        props.Overview(newData);
        props.RosterFun(newEdit);
        setData(newData);
        setEdit({edit:false,index: undefined});
    }

    function handleDeleteClick(e)
    {
        let deleteUpdate = props.Roster;
        deleteUpdate.splice(Delete.index,1);
        props.RosterFun(deleteUpdate);
        setData(deleteUpdate);
        setDelete({delete: false,index: undefined});
    }

    function handleRadioChange(e)
    {
        console.log(e.target.value);
        setEditData({...editData,Starter: e.target.value})
    }

    return(
        <>
            <main className="details-container">
                <div className="details-nav">
                        <div>
                            <h6>Roster Details</h6>
                            <h2>My Team <MdEdit/></h2>
                        </div>
                        <div className="details-action">
                            <div>
                                <input type="text" placeholder="Find Players"/>
                                <IoSearchSharp className="search-icon"/>
                            </div>
                            <button id="btn-2" onClick={handleImportClick}>Import Team</button>
                        </div>  
                </div>
                <div className="player-details">
                        <TeamTable Roster={props.Roster} Edit={setEdit} Delete={setDelete}/>
                        {
                            props.Roster.length === 0 ? <div className="message" id="message">
                                                            <h4>You do not have any players on the roster.</h4>
                                                            <button id="btn-1" onClick={handleImportClick}>Import Team</button>
                                                        </div> : <p></p>
                        }
                </div>
            </main>
            <div className="modal-container" id="modal-container">
                <main className="modal">
                    <div className="modal-head">
                        <h3>Importer</h3>
                        <RxCross2 id="btn-3" onClick={handleImportClick}/>
                    </div>
                    <div className="modal-body">
                        <div className="input-select">
                            <h5>Roaster File</h5>
                            <input type="file" onChange={handleFileInputChange} placeholder="select file" id="roaster-file"/>
                            <p className="ok-msg">File Must be .csv format</p>
                            <div className="err-msg">
                                <p>Error</p>
                                <p className="err-message"></p>
                            </div>
                        </div>
                        <div className="input-details" id="input-details">
                            <h4>File Summary</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Total Players</th>
                                        <th>Goalkeepers</th>
                                        <th>Defenders</th>
                                        <th>Midfielders</th>
                                        <th>Forwards</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{summary.total}</td>
                                        <td>{summary.Goalkeeper}</td>
                                        <td>{summary.Defender}</td>
                                        <td>{summary.Midfielder}</td>
                                        <td>{summary.Forward}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleImportClick} id="import-complete">Import</button>
                    </div>
                </main>
            </div>
            {
                    edit.edit ? <div className="edit-modal-container" id="edit-modal-container">
                                    <main className="edit-modal">
                                        <div className="edit-modal-head">
                                            <h4>Edit Player</h4>
                                            <RxCross2 onClick={()=> setEdit({edit: false,index: undefined})} className="cross-btn" />
                                        </div>
                                        <div className="edit-modal-body">
                                            <div className="field-one">
                                                <div className="field-name">
                                                    <p>Player Name</p>
                                                    <input onChange={handleEditChange} id="edit-player-name" type="text" defaultValue={props.Roster[edit.index]['Player Name']} value={editData['Player Name']}/>
                                                </div>
                                                <div className="jersey-field">
                                                    <p>Jersey Number</p>
                                                    <input onChange={handleEditChange} id="edit-player-number" type="text" defaultValue={props.Roster[edit.index]['Jersey Number']} value={editData['Jersey Number']}/>
                                                </div>
                                            </div>
                                            <div className="field-two">
                                                <div>
                                                    <p>Height</p>
                                                    <input onChange={handleEditChange} id="edit-height" type="text" defaultValue={props.Roster[edit.index]['Height']} value={editData.Height}/>
                                                </div>
                                                <div>
                                                    <p>Weight</p>
                                                    <input onChange={handleEditChange} id="edit-weight" type="text" defaultValue={props.Roster[edit.index]['Weight']} value={editData.Weight} />
                                                </div>
                                            </div>
                                            <div className="field-three">
                                                <p>Nationality</p>
                                                <select id="edit-nation" onChange={handleEditChange}>
                                                   {
                                                        props.Country.map((item,index)=>{
                                                            return(
                                                                item === props.Roster[edit.index]['Nationality'] ? <option key={index} value={item} selected>{item}</option> : <option key={index} value={item}>{item}</option>
                                                            )
                                                        })
                                                   }
                                                </select>
                                            </div>
                                            <div className="field-four">
                                                <p>Position</p>
                                                <select id="edit-position" onChange={handleEditChange}>
                                                    {
                                                        props.Position.map((item,index)=>{
                                                            return(
                                                                item === props.Roster[edit.index]['Position'] ? <option key={index} value={item} selected>{item}</option> : <option key={index} value={item}>{item}</option>
                                                            )
                                                        })
                                                   }
                                                </select>
                                            </div>
                                            <div className="field-five">
                                                <p>Starter</p>
                                                <div>
                                                    <input type="radio" id="Yes" onClick={handleRadioChange} value="Yes" name="Starter"/><label htmlFor="Yes">Yes</label>
                                                    <input type="radio" id="No" onClick={handleRadioChange} value="No" name="Starter"/><label htmlFor="No">No</label>
                                                </div>
                                                {/* <div>
                                                    {
                                                        roster[edit.index]['Starter'] == 'Yes'? <input onClick={handleRadioChange} type="radio" value="Yes" name="starter" id="yes" checked/> : <input onClick={handleRadioChange} type="radio"  value="Yes" name="starter" id="yes"/>
                                                    }
                                                    <label htmlFor="yes">Yes</label>
                                                </div>
                                                <div>
                                                    {
                                                        roster[edit.index]['Starter'] == 'No'? <input onClick={handleRadioChange} type="radio" value="No" name="starter" id="No"checked /> : <input onClick={handleRadioChange} type="radio" value="No" name="starter" id="No"/>
                                                    }
                                                    <label htmlFor="No">No</label>
                                                </div> */}
                                            </div>
                                            <div className="edit-btn-container">
                                                <button onClick={handleEditSubmit}>Edit Player</button>
                                            </div>
                                        </div>
                                    </main>
                                </div> : <p></p>
            }

            {
                Delete.delete ? <div className="delete-modal-container" id="delete-modal-container">
                                    <div className="delete-modal">
                                        <div className="delete-modal-header">
                                            <h4>Are you sure ?</h4>
                                            <RxCross2 className="cross-btn" onClick={()=> setDelete({delete: false,index: undefined})}/>
                                        </div>
                                        <div className="delete-modal-body">
                                            <p>This action cannot be undone.</p>
                                            <div>
                                                <button onClick={()=> setDelete({delete: false,index: undefined})}>Cancel</button>
                                                <button onClick={handleDeleteClick}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> : <p></p>
            }
        </>
    )
};


export default TeamDetails;

import { useState } from "react";

import { MdEdit } from "react-icons/md";
import { IoWarningSharp } from "react-icons/io5";


import "../CSS/formation.css";
import "../CSS/formation-modal.css";


const Overview = (props)=>{    
    
    return(
        <>
            <div className="formation-container">
                <div className="formation">
                    <div>
                        <h3>Formation Overview</h3>
                        <div className="formation-team-name">
                            <h4>My Team</h4>
                            <MdEdit className="formation-edit-btn"/>
                        </div>
                    </div>
                    <div className="formation-field-container">
                        <div className="formation-field">
                            <img src={require("../assets/Field.png")} alt="field image" />
                        </div>
                        <div className="formation-demo"></div>
                    </div>
                </div>
                {
                    props.Alert.display ? <div className="formation-modal-container">
                                        <div className="formation-modal">
                                            <div className="formation-modal-head">
                                                <div>
                                                    <IoWarningSharp className="warning"/>
                                                    <h4>{props.Alert.heading}</h4>
                                                </div>
                                                <p>{props.Alert.message}</p>
                                            </div>
                                        </div>
                                    </div> : <p></p>
                }
            </div>
        </>
    )
};

export default Overview;
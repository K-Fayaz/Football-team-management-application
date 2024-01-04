
// import { IoIosMore } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { ImBin } from "react-icons/im";
import { eventWrapper } from "@testing-library/user-event/dist/utils";




const TeamTable = (props)=>{

    function handleActionClick(e)
    {
        let action = e.target.id.split('-');
        if(action[0] == 'open')
        {
            document.getElementById(`card-${action[1]}`).style.display = 'block';
        }

        if(action[0] == 'close')
        {
            document.getElementById(`card-${action[1]}`).style.display = 'none';
        }
    }

    function handleEdit(e)
    {
        props.Edit({edit: true,index: e.target.id.split('-')[1]})
    }

    function handleDelete(e)
    {
        props.Delete({delete: true,index: e.target.id.split('-')[1]})
    }

    return(
        <>
            {
                props.Roster.length == 0 ? <table>
                                                <thead>
                                                    <tr>
                                                        <th>Player Name</th>
                                                        <th>Jersey Number</th>
                                                        <th>Position</th>
                                                        <th>Height</th>
                                                        <th>Weight</th>
                                                        <th>Nationality</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        
                                                    </tr>
                                                </tbody>
                                           </table> : <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Player Name</th>
                                                                <th>Jersey Number</th>
                                                                <th>Starter</th>
                                                                <th>Position</th>
                                                                <th>Height</th>
                                                                <th>Weight</th>
                                                                <th>Nationality</th>
                                                                <th>Appearance</th>
                                                                <th>Minutes Played</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                                {
                                                                    props.Roster.map((item,index)=>{

                                                                            return(
                                                                                <tr key={index}>
                                                                                    <td><img src={`${item['Flag Image']}`} alt="HI"/>{item['Player Name']}</td>
                                                                                    <td>{item['Jersey Number']}</td>
                                                                                    <td>{item['Starter']}</td>
                                                                                    <td>{item['Position']}</td>
                                                                                    <td>{item['Height']/100} m</td>
                                                                                    <td>{item['Weight']} kg</td>
                                                                                    <td>{item['Nationality']}</td>
                                                                                    <td>{item['Appearances']}</td>
                                                                                    <td>{item['Minutes Played']}</td>
                                                                                    <td><MdMoreHoriz id={`open-${index}`} onClick={handleActionClick} className="more-btn"/></td>
                                                                                    <td className="action-card" id={`card-${index}`}>
                                                                                        <div className="action-header">
                                                                                            <h3>Actions</h3>
                                                                                            <RxCross2 onClick={handleActionClick} className="action-btn" id={`close-${index}`}/>
                                                                                        </div>
                                                                                        <div className="action-body">
                                                                                            <div className="edit-action">
                                                                                                <MdEdit id={`edit-${index}`} onClick={handleEdit} className="action-btn"/>
                                                                                                <h4 id={`edit-${index}-#`} onClick={handleEdit}>Edit</h4>
                                                                                            </div>
                                                                                            <div className="delete-action">
                                                                                                <ImBin id={`delete-${index}`} onClick={handleDelete} className="action-btn"/>
                                                                                                <h4 id={`delete-${index}-#`} onClick={handleDelete} >Delete</h4>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                    })
                                                                }
                                                        </tbody>
                                                     </table>
            }
        </>
    )
};

export default TeamTable;
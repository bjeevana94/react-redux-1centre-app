import _ from 'lodash';

export const Directors = (props) => {
    const {directors, remove, update, addNew, handelNext, error} = props

    return (
       <> 
       {
            _.map(directors, (obj, index) => {
                return (
                    <div className="row" key={index}>
                        <div className="column" />
                        <div className="column" >
                            <label className='label-text' htmlFor="director_name">Director Name:</label> 
                            <input className="Simple-input" value={obj.director_name} key={`Director Name${index}`}
                            placeholder="Director Name" onChange={({target}) => update(index, {'director_name': _.get(target, 'value')})}/>
                        </div>
                        <div className="column" >
                            <label className='label-text' htmlFor="director_email">Director Email:</label> 
                            <input className="Simple-input" value={obj.director_email} key={`Director Email${index}`}
                            placeholder="Director Email" onChange={({target}) => update(index, {'director_email': _.get(target, 'value')})}/>
                        </div>
                        <div className="column">
                            {
                                directors.length > 1 ?
                                <button style={{marginTop:'10px'}} onClick={() => remove(index)} className="Btn-danger">Remove</button>
                                : null
                            }
                        </div>
                    </div>
                )
            })
        }
        <div className="row">
            <div className="column"/><div className="column"/>
            <div className="column"> 
                {error ? <div className="Error-message">{error}</div> : null}
                <button onClick={addNew} className={'Btn-danger'} style={{float: 'right'}} disable={directors.length}>Add</button> <br/> <br/>
            </div>
            <div className="column"/>
        </div>
        <div className="row">
            <div className="column"/><div className="column"/><div className="column"/>
            <div className="column">
                <button className={'Btn-primary'} style={{floar:'right'}} onClick={handelNext}> Next</button>
            </div>
        </div>
        </>
    )
}

// className="Simple-input"


import React from 'react';
import cn from "classnames";

function Filters({
    className,
    filters = [],
    values,
    onChange,
    ...props
}) {

    const classNames = cn({
        'filters': true
    });

    return (
        <div className={classNames}>
            <div className="row row-cols-auto">

                {filters.map((filter, index) =>
                    <Filter key={index} filter={filter} values={values} onChange={onChange}></Filter>
                )}
                
            </div>
        </div>
    );
}

function Filter({filter, values, onChange}) {
    if (filter.type == 'dropdown') {
        return <DropdownFilter filter={filter} values={values} onChange={onChange}></DropdownFilter>
    }
}

function DropdownFilter({filter, values, onChange}) {
    
    let value = values && values[filter.key] ? values[filter.key] : '';
   // console.log(value);

    return (
        <div className="col">
            <div className="row row-cols-auto g-0 align-items-center">
                {filter.label && filter.label != '' &&
                    <div className="col">
                        <label className="col-form-label" htmlFor={filter.key}>{filter.label}</label>
                    </div>
                }
                
                <div className="col">
                    <select
                        className="form-select"
                        id={filter.key}
                       
                        onChange={(e) => onChange(filter.key, e.target.value)}
                    >
                        {filter.options && filter.options.map(
                            (option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            )
                        )}
                    </select>
                </div>

            </div>
        </div>
    )
}

export default Filters;

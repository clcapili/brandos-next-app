import React from 'react';

function Welcome({account}) {
    return  (
                <div className="widget-welcome mb-3">
                    <div className="widget-header">
                        <h1 className="title">Welcome to BrandOS!</h1>
                    </div>
                    <div className="widget-body">
                        <div className="row g-4">
                            <div className="col-lg">
                                <div className="card card-borderless">

                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z"/></svg>
                                    </div>
                                    <div className="card-body">
                                        <h4>Author rich content</h4>
                                        <p>Patterns are pre-configured block layouts. Use them to get inspired or create new pages in a flash.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg">
                                <div className="card card-borderless">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>
                                    </div>
                                    <div className="card-body">
                                        <h4>Customizing</h4>
                                        <p>Configure your site's logo, header, menus, and more.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg">
                                <div className="card card-borderless">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M680-280q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q31 0 57-14.5t42-38.5q-22-13-47-20t-52-7q-27 0-52 7t-47 20q16 24 42 38.5t57 14.5ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v227q-19-8-39-14.5t-41-9.5v-147l-240-90-240 90v188q0 47 12.5 94t35 89.5Q310-290 342-254t71 60q11 32 29 61t41 52q-1 0-1.5.5t-1.5.5Zm200 0q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM480-494Z"/></svg>
                                    </div>
                                    <div className="card-body">
                                        <h4>Access Managment</h4>
                                        <p>Setup and assign user groups. Then apply those groups to pages or sections, giving you complete control over who has access to what.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>
    )     
            
}

export default Welcome;
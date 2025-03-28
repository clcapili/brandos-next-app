import React from 'react';
import { useOutletContext } from "react-router-dom";
import { PageHeader } from '../../components';

function Settings() {

    const [account] = useOutletContext();
   
    return (
        <div className="main-content">

            <div className="container">
                <PageHeader title="Settings"></PageHeader>

                <div className="row">
                    <div className="col-lg-12">
                        

                        <h2>Sample Table</h2>
                        
                        <div className="list-table mb-5">
                            
                            <div className="list-table-row list-table-header">
                                <div className="col col-title">Name</div>
                                <div className="col-3">Second</div>
                                <div className="col-3">Third</div>
                                <div className="col-action"></div>
                            </div>

                            <div className="list-table-row">
                                <div className="col col-title">
                                    <span className="title">Title</span>
                                </div>
                                <div className="col-3">
                                    Second Column Data
                                </div>
                                <div className="col-3">
                                    Third Column Data
                                </div>
                                <div className="col-action">
                                    <i className="glyph glyph-lock"></i>
                                </div>
                            </div>
                            <div className="list-table-row">
                                <div className="col col-title">
                                    <span className="title">Title</span>
                                </div>
                                <div className="col-3">
                                    Second Column Data
                                </div>
                                <div className="col-3">
                                    Third Column Data
                                </div>
                                <div className="col-action">
                                    <div className="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="glyph glyph-more-vert"></i></a><ul className="dropdown-menu"><li><a className="dropdown-item" href="/1/security/groups/update/2">Edit</a><a className="dropdown-item" href="#">Remove</a></li></ul></div>
                                </div>
                            </div>
                            <div className="list-table-row">
                                <div className="col col-title">
                                    <span className="title">Long Long Long Long Long Long Long Long Long Title</span>
                                </div>
                                <div className="col-3">
                                    Second Column Data
                                </div>
                                <div className="col-3">
                                    Third Column Data
                                </div>
                                <div className="col-action">
                                    <div className="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="glyph glyph-more-vert"></i></a><ul className="dropdown-menu"><li><a className="dropdown-item" href="/1/security/groups/update/3">Edit</a><a className="dropdown-item" href="#">Remove</a></li></ul></div>
                                </div>
                            </div>
                            <div className="list-table-row">
                                <div className="col col-title">
                                    <span className="title">Title</span>
                                </div>
                                <div className="col-3">
                                    Second Column Data
                                </div>
                                <div className="col-3">
                                    Third Column Data
                                </div>
                                <div className="col-action">
                                    <div className="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="glyph glyph-more-vert"></i></a><ul className="dropdown-menu"><li><a className="dropdown-item" href="/1/security/groups/update/4">Edit</a><a className="dropdown-item" href="#">Remove</a></li></ul></div>
                                </div>
                            </div>
                        </div>

                        <h2>Sample Table With drag Handle</h2>
                        <div className="list-table mb-5">
                            
                            <div className="list-table-row list-table-header">
                                <div className="col-control"></div>
                                <div className="col col-title">Name</div>
                                <div className="col-action"></div>
                            </div>

                            <div className="list-table-row">
                                <div className="col-control">
                                    <i className="glyph glyph-move"></i>
                                </div>
                                <div className="col col-title">
                                    <span className="title">Title</span>
                                </div>
                                <div className="col-action">
                                    <i className="glyph glyph-lock"></i>
                                </div>
                            </div>
                            <div className="list-table-row">
                                <div className="col-control"><i className="glyph glyph-move"></i></div>
                                <div className="col">
                                    <span className="title">Title</span>
                                </div>
                                <div className="col-action">
                                    <div className="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="glyph glyph-more-vert"></i></a><ul className="dropdown-menu"><li><a className="dropdown-item" href="/1/security/groups/update/2">Edit</a><a className="dropdown-item" href="#">Remove</a></li></ul></div>
                                </div>
                            </div>
                            <div className="list-table-row">
                                <div className="col-control"><i className="glyph glyph-move"></i></div>
                                <div className="col">
                                    <span className="title">Title</span>
                                </div>
                                <div className="col-action">
                                    <div className="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="glyph glyph-more-vert"></i></a><ul className="dropdown-menu"><li><a className="dropdown-item" href="/1/security/groups/update/3">Edit</a><a className="dropdown-item" href="#">Remove</a></li></ul></div>
                                </div>
                            </div>
                            <div className="list-table-row">
                                <div className="col-control"><i className="glyph glyph-move"></i></div>
                                <div className="col">
                                    <span className="title">Title</span>
                                </div>
                                <div className="col-action">
                                    <div className="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="glyph glyph-more-vert"></i></a><ul className="dropdown-menu"><li><a className="dropdown-item" href="/1/security/groups/update/4">Edit</a><a className="dropdown-item" href="#">Remove</a></li></ul></div>
                                </div>
                            </div>
                        </div>

                        <h2>Sample Table with image</h2>
                        <div className="list-table mb-5">
                            
                            <div className="list-table-row list-table-header">
                                <div className="col col-title"><div className="thumbnail"></div>Name</div>
                                <div className="col-action"></div>
                            </div>

                            <div className="list-table-row">
                                <div className="col col-title">
                                    <div className="thumbnail ">
                                        <img className="rounded-pill img-fluid" src="https://ui-avatars.com/api/?background=00B4ED&amp;color=fff&amp;name=Demetri Mihalakakos" />
                                    </div>
                                    <div>
                                        <span className="title">Title</span>
                                        <div className="subtitle">Subtitle</div>
                                    </div>
                                </div>
                                <div className="col-action">
                                    <i className="glyph glyph-lock"></i>
                                </div>
                            </div>
                            <div className="list-table-row">
                                <div className="col col-title">
                                    <div className="thumbnail ">
                                        <img className="rounded-pill img-fluid" src="https://ui-avatars.com/api/?background=00B4ED&amp;color=fff&amp;name=Demetri Mihalakakos" />
                                    </div>
                                    <div>
                                        <span className="title">Title</span>
                                        <div className="subtitle">Subtitle</div>
                                    </div>
                                </div>
                                <div className="col-action">
                                    <div className="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="glyph glyph-more-vert"></i></a><ul className="dropdown-menu"><li><a className="dropdown-item" href="/1/security/groups/update/2">Edit</a><a className="dropdown-item" href="#">Remove</a></li></ul></div>
                                </div>
                            </div>
                            <div className="list-table-row">
                                <div className="col col-title">
                                    <div className="thumbnail ">
                                        <img className="rounded-pill img-fluid" src="https://ui-avatars.com/api/?background=00B4ED&amp;color=fff&amp;name=Demetri Mihalakakos" />
                                    </div>
                                    <div>
                                        <span className="title">Title</span>
                                        <div className="subtitle">Subtitle</div>
                                    </div>
                                </div>
                                <div className="col-action">
                                    <div className="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="glyph glyph-more-vert"></i></a><ul className="dropdown-menu"><li><a className="dropdown-item" href="/1/security/groups/update/3">Edit</a><a className="dropdown-item" href="#">Remove</a></li></ul></div>
                                </div>
                            </div>
                            <div className="list-table-row">
                                <div className="col col-title">
                                    <div className="thumbnail ">
                                        <img className="rounded-pill img-fluid" src="https://ui-avatars.com/api/?background=00B4ED&amp;color=fff&amp;name=Demetri Mihalakakos" />
                                    </div>
                                    <div>
                                        <span className="title">Title</span>
                                        <div className="subtitle">Subtitle</div>
                                    </div>
                                </div>
                                <div className="col-action">
                                    <div className="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="glyph glyph-more-vert"></i></a><ul className="dropdown-menu"><li><a className="dropdown-item" href="/1/security/groups/update/4">Edit</a><a className="dropdown-item" href="#">Remove</a></li></ul></div>
                                </div>
                            </div>
                        </div>

                        <h2>Sample Table with control item</h2>
                        <div className="list-table mb-5">
                            
                            <div className="list-table-row list-table-header">
                                <div className="col-control"></div>
                                <div className="col col-title"><div className="thumbnail"></div>Name</div>
                                <div className="col-action"></div>
                                <div className="col-action"></div>
                            </div>

                            <div className="list-table-row">
                                <div className="col-control">
                                    <label>
                                        <input type="checkbox" name="nodes[]" value="158" />
                                    </label>
                                </div>
                                <div className="col col-title">
                                    <div className="thumbnail">
                                        <img className="rounded-pill img-fluid" src="https://ui-avatars.com/api/?background=00B4ED&amp;color=fff&amp;name=Demetri Mihalakakos" />
                                    </div>
                                    <div>
                                        <span className="title">Title</span>
                                        <div className="subtitle">Subtitle</div>
                                    </div>
                                </div>
                                <div className="col-action">
                                    <i className="glyph glyph-visibility"></i>
                                </div>
                                <div className="col-action">
                                    <i className="glyph glyph-lock"></i>
                                </div>
                            </div>
                            <div className="list-table-row">
                                <div className="col-control">
                                    <label>
                                        <input type="checkbox" name="nodes[]" value="158" />
                                    </label>
                                </div>
                                <div className="col col-title">
                                    <div className="thumbnail ">
                                        <img className="rounded-pill img-fluid" src="https://ui-avatars.com/api/?background=00B4ED&amp;color=fff&amp;name=Demetri Mihalakakos" />
                                    </div>
                                    <div>
                                        <span className="title">Title</span>
                                        <div className="subtitle">Subtitle</div>
                                    </div>
                                </div>
                                <div className="col-action">
                                    <i className="glyph glyph-visibility"></i>
                                </div>
                                <div className="col-action">
                                    <div className="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="glyph glyph-more-vert"></i></a><ul className="dropdown-menu"><li><a className="dropdown-item" href="/1/security/groups/update/2">Edit</a><a className="dropdown-item" href="#">Remove</a></li></ul></div>
                                </div>
                            </div>
                            <div className="list-table-row">
                                <div className="col-control">
                                    <label>
                                        <input type="checkbox" name="nodes[]" value="158" />
                                    </label>
                                </div>
                                <div className="col col-title">
                                    <div className="thumbnail ">
                                        <img className="rounded-pill img-fluid" src="https://ui-avatars.com/api/?background=00B4ED&amp;color=fff&amp;name=Demetri Mihalakakos" />
                                    </div>
                                    <div>
                                        <span className="title">Title</span>
                                        <div className="subtitle">Subtitle</div>
                                    </div>
                                </div>
                                <div className="col-action">
                                    <i className="glyph glyph-visibility"></i>
                                </div>
                                <div className="col-action">
                                    <div className="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="glyph glyph-more-vert"></i></a><ul className="dropdown-menu"><li><a className="dropdown-item" href="/1/security/groups/update/3">Edit</a><a className="dropdown-item" href="#">Remove</a></li></ul></div>
                                </div>
                            </div>
                            <div className="list-table-row">
                                <div className="col-control">
                                    <label>
                                        <input type="checkbox" name="nodes[]" value="158" />
                                    </label>
                                </div>
                                <div className="col col-title">
                                    <div className="thumbnail ">
                                        <img className="rounded-pill img-fluid" src="https://ui-avatars.com/api/?background=00B4ED&amp;color=fff&amp;name=Demetri Mihalakakos" />
                                    </div>
                                    <div>
                                        <span className="title">Title</span>
                                        <div className="subtitle">Subtitle</div>
                                    </div>
                                </div>
                                <div className="col-action">
                                    <i className="glyph glyph-visibility"></i>
                                </div>
                                <div className="col-action">
                                    <div className="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="glyph glyph-more-vert"></i></a><ul className="dropdown-menu"><li><a className="dropdown-item" href="/1/security/groups/update/4">Edit</a><a className="dropdown-item" href="#">Remove</a></li></ul></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
       
    )
}

export default Settings;